import React, { useState, useEffect, useRef } from "react";

const OrderBook = (props) => {
  const [asksPrice, setAsksPrice] = useState([]);
  const [asksQuantity, setAsksQuantity] = useState([]);
  let asksPriceArray = [];
  let asksQuantityArray = [];
  console.log("PROP: ", props.value)
  let url = `wss://stream.binance.com:9443/ws/${props.value.toLowerCase()}@depth10@1000ms`
  console.log("URL: ", url)

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
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
            <td>
              {asksPrice.map((price, index) => (
                <tr>
                  <td>{price}</td>
                </tr>
              ))}
            </td>
            <td>
              {asksQuantity.map((quantity, index) => (
                <tr>
                  <td>{quantity}</td>
                </tr>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderBook;
