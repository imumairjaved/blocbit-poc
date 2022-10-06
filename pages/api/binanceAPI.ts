import { NextApiRequest, NextApiResponse } from "next";
import Binance from "binance-client";
import { MainClient, USDMClient } from "binance";

export default (_: NextApiRequest, res: NextApiResponse) => {
  const API_KEY =
    "";
  const API_SECRET =
    "";

  const client = new MainClient({
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
  const client1 = client.getAccountStatus()
    .then((res) => {
      console.log("RES: ", res);
    })
  res.status(200).json({ text: client1 });
  //   res.status(200).json({ text: "Hello" });
};
