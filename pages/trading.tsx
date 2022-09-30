import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useEffect, useState } from 'react';


export default function Trading() {

    const [value, setValue] = useState("BTCUSDT");
    const [exchange, setExchange] = useState("Binance");
    const [pairs, setPairs] = useState([]);



    const exchanges = [
        {
            label: "Binance"
        },
        {
            label: "FTX"
        }
    ]
    const options = ['BTCUSDT', 'DOTUSDT', 'LTC/BTC'];

    useEffect(() => {
        getExchangeData('Binance');
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/ltcbtc@depth");
        console.log(ws);
        ws.onmessage = (event: WebSocketEventMap['message']) => console.table("event", event.data);
    }, []);



    var pairsArray = [];

    const getExchangeData = async (e) => {
        let response;
        switch (e) {
            case 'Binance':
                response = await fetch(
                    "https://api.binance.com/api/v3/exchangeInfo"
                ).then((response) => response.json());
                for (let j = 0; j < response.symbols.length; j++) {
                    pairsArray.push(
                        response.symbols[j].symbol
                    );
                }
                setPairs(pairsArray);
                break;
            case 'FTX':
                setPairs(options);
                break;
            default:
                setPairs([]);
                break;
        }
    };
    return (
        <Layout>
            <Head>
                <title>Trading</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <select id="exchange" onChange={(e) => { setExchange(e.target.value); getExchangeData(e.target.value) }}>
                    {exchanges.map((exchange) => (
                        <option value={exchange.label}>{exchange.label}</option>
                    ))}
                </select>
                <select id="pairs" onChange={(e) => setValue(e.target.value)}>
                    {pairs.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                    ))}
                </select>
                <br />
                <TradingViewWidget
                    width={`1300px`}
                    height={`850px`}
                    symbol={`${exchange}:${value}`}
                    theme={Themes.LIGHT}
                    locale="en"
                    // hide_top_toolbar = {false}
                    // timezone="America/New York"
                    hideSideToolbar={true}
                    details
                    news={["headlines"]}
                    hide_side_toolbar={false}
                />
            </section>
        </Layout>
    )
}
