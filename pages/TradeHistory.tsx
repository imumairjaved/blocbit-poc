import React, { useState, useEffect, useRef } from "react";

const TradeHistory = (props) => {

    const [trade, setTrade] = useState([]);
    let tradeArray = [];
    let url = `wss://stream.binance.com:9443/ws/${props.value.toLowerCase()}@aggTrade`;

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            ws.onmessage = function (event) {
                const data = JSON.parse(event.data);
                tradeArray.push(data);

                if (tradeArray.length > 7) {
                    tradeArray.shift();
                    tradeArray.push(data);
                    setTrade(tradeArray.reverse())
                }
            };
        };
        return () => {
            ws.close();
        };
    }, [url, tradeArray]);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {trade != null ? trade.map((price, index) => (
                        <tr key={index}>
                            <td className={price.m ? "red" : "green"}>{Number(price.p).toFixed(6)}</td>
                            <td className={price.m ? "red" : "green"}>{price.m ? "SELL" : "BUY"}</td>
                            <td>{Number(price.q).toFixed(5)}</td>
                            <td>{new Date(price.T).toLocaleTimeString()}</td>
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </>
    );
};

export default TradeHistory;
