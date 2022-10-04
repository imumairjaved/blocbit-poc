import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useEffect, useState } from "react";
import OrderBook from "./OrderBook";
import TradeHistory from "./TradeHistory";

export default function Trading() {
  const [value, setValue] = useState("ETHBTC");
  const [exchange, setExchange] = useState("Binance");
  const [pairs, setPairs] = useState([]);

  const exchanges = [
    {
      label: "Binance",
    },
    {
      label: "FTX",
    },
  ];
  const options = ["BTCUSDT", "DOTUSDT", "LTC/BTC"];

  var pairsArray = [];

  const getExchangeData = async (e) => {
    let response;
    switch (e) {
      case "Binance":
        response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        ).then((response) => response.json());
        for (let j = 0; j < response.symbols.length; j++) {
          pairsArray.push(response.symbols[j].symbol);
        }
        setPairs(pairsArray);
        break;
      case "FTX":
        setPairs(options);
        break;
      default:
        setPairs([]);
        break;
    }
  };

  useEffect(() => {
    getExchangeData("Binance");
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Trading</title>
        </Head>
        <div className="row">
          <div className="col col-md-3">
            <h2>Order Books</h2>
            <OrderBook value={value} />
          </div>
          <div className="col col-md-9">
            <div className="row">
              <div className="col col md-12">
                <select
                  id="exchange"
                  onChange={(e) => {
                    setExchange(e.target.value);
                    getExchangeData(e.target.value);
                  }}
                >
                  {exchanges.map((exchange) => (
                    <option value={exchange.label}>{exchange.label}</option>
                  ))}
                </select>
                <select id="pairs" onChange={(e) => setValue(e.target.value)}>
                  {pairs.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col col md-12">
                <h2>Graphs</h2>
                <TradingViewWidget
                  width={'100%'}
                  height={700}
                  symbol={`${exchange}:${value}`}
                  theme={Themes.LIGHT}
                  locale="en"
                  // hide_top_toolbar = {false}
                  // timezone="America/New York"
                  hideSideToolbar={true}
                  hide_side_toolbar={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-12">
            <h2>Trade History</h2>
            <TradeHistory value={value} />
          </div>
        </div>
      </Layout>
    </>
  );
}
