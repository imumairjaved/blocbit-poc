import React, { useState, useEffect, useRef } from "react";

const OrderBook = (props) => {
  const [asksPrice, setAsksPrice] = useState([]);
  const [asksQuantity, setAsksQuantity] = useState([]);
  const [asksTotal, setAsksTotal] = useState([]);
  const [bidsPrice, setBidsPrice] = useState([]);
  const [bidsQuantity, setBidsQuantity] = useState([]);
  const [bidsTotal, setBidsTotal] = useState([]);

  let asksPriceArray = [];
  let asksQuantityArray = [];
  let asksTotalArray = [];
  let bidsPriceArray = [];
  let bidsQuantityArray = [];
  let bidsTotalArray = [];

  let url = `wss://stream.binance.com:9443/ws/${props.value.toLowerCase()}@depth10@100ms`;

  useEffect(() => {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        ws.onmessage = function (event) {
          const data = JSON.parse(event.data);
          if (asksPriceArray.length >= 10 && bidsPriceArray.length >= 10) {
            asksPriceArray = [];
            asksQuantityArray = [];
            asksTotalArray = [];
            bidsPriceArray = [];
            bidsQuantityArray = [];
            bidsTotalArray = [];
          } else {
            for (let i = 0; i < 10; i++) {
              //Getting ASKS
              asksPriceArray.push(Number(data.asks[i][0]).toFixed(5));
              asksQuantityArray.push(Number(data.asks[i][1]).toFixed(5));
              asksTotalArray.push(
                (Number(data.asks[i][0]) * Number(data.asks[i][1])).toFixed(5)
              );
              //Getting BIDS
              bidsPriceArray.push(Number(data.bids[i][0]).toFixed(5));
              bidsQuantityArray.push(Number(data.bids[i][1]).toFixed(5));
              bidsTotalArray.push(
                (Number(data.bids[i][0]) * Number(data.bids[i][1])).toFixed(5)
              );
            }
            //Setting ASKS
            setAsksPrice(asksPriceArray);
            setAsksQuantity(asksQuantityArray);
            setAsksTotal(asksTotalArray);

            //Setting BIDS
            setBidsPrice(bidsPriceArray);
            setBidsQuantity(bidsQuantityArray);
            setBidsTotal(bidsTotalArray);
          }
        };
      };
      return () => {
        ws.close();
      };
  }, [url]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {asksPrice.map((price, index) => (
                <tr>
                  <td className="red">{price}</td>
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
            <td>
              {asksTotal.map((total, index) => (
                <tr>
                  <td>{total}</td>
                </tr>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <div className="row">Last Price</div>
              <div className="row"> 0.00 </div>
            </th>
            <th scope="col">
              <div className="row">USD</div>
              <div className="row"> 0.00 </div>
            </th>
            <th scope="col">
              <div className="row">Change</div>
              <div className="row"> 0.00 %</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {bidsPrice.map((price, index) => (
                <tr>
                  <td className="green">{price}</td>
                </tr>
              ))}
            </td>
            <td>
              {bidsQuantity.map((quantity, index) => (
                <tr>
                  <td>{quantity}</td>
                </tr>
              ))}
            </td>
            <td>
              {bidsTotal.map((total, index) => (
                <tr>
                  <td>{total}</td>
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
