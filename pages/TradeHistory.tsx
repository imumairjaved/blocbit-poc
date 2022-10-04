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
                if (tradeArray.length >= 10) {
                    tradeArray = [];
                }
                else {
                    setTrade(tradeArray)
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
                        <th scope="col"></th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {trade != null ?
                        trade.map((price, index) => (
                            <tr>
                                <td>{price.p}</td>
                                <td className={price.m ? "green" : "red"}>{price.m ? "SELL" : "BUY"}</td>
                                <td>{price.q}</td>
                                <td>{price.T}</td>
                            </tr>
                        )) : ''}
                </tbody>
            </table>
        </>
    );
};

export default TradeHistory;
