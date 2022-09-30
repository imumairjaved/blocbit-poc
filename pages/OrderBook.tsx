import React, { useState, useEffect } from "react";

const OrderBook = (props) => {
  const [asksPrice, setAsksPrice] = useState([]);
  const [asksQuantity, setAsksQuantity] = useState([]);
  let asksPriceArray = [];
  let asksQuantityArray = [];
  console.log("PROP: ", props.value)
  let url = `wss://stream.binance.com:9443/ws/${props.value.toLowerCase()}@depth10@100ms`
  console.log("URL: ", url)

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("DATA: ", data);
      if (asksPriceArray.length >= 10) {
        asksPriceArray = [];
        asksQuantityArray = [];
      } else {
        for (let i = 0; i < 10; i++) {
          asksPriceArray.push(data.asks[i][0]);
          asksQuantityArray.push(data.asks[i][1]);
        }
        setAsksPrice(asksPriceArray);
        setAsksQuantity(asksQuantityArray);
      }
    };
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {asksPrice.map((price, index) => (
              <tr>
                <td>{price}</td>
              </tr>
            ))}
          </tr>
          <tr>
            {asksQuantity.map((quantity, index) => (
              <tr>
                <td>{quantity}</td>
              </tr>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderBook;
