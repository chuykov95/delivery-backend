const express = require("express");
const axios = require("axios");
const https = require("https");
const querystring = require("querystring");

const app = express();
const port = 4200;

app.use(express.json());

const clientId = "2b60b384-1c7d-4429-9d7c-cb4c109eedc9";
const clientSecret = "7cf25c26-9975-4335-904a-440cb97be3d3";
const scopes = "orders";
const tokenUrl = "https://auth-delivery.ucs.ru/connect/token";

let accessToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IkMwMDU2OTg1MDA3OTA3OUI2OUFFNTExMjAzOEUxRDEyQUE0RDY1NjkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJ3QVZwaFFCNUI1dHBybEVTQTQ0ZEVxcE5aV2sifQ.eyJuYmYiOjE2NzQ4MTk1MzMsImV4cCI6MTc3NjAyOTEzMywiaXNzIjoiYXV0aHNlcnZlciIsImF1ZCI6Im9yZGVycyIsImNsaWVudF9pZCI6IjkyYzkxMTVkLTUxZjYtNDAwYy1hODAzLTcyMjU0OWE4OWQ0MiIsImFjdGl2ZSI6InRydWUiLCJvcmRlclNvdXJjZVR5cGUiOiJ0aWxkYSIsInJlc3RhdXJhbnRfaWQiOiI2M2ExYjdlYS04NjQwLTQ0NDktYTdlZi03YjM0ZmZmNzg4MmEiLCJjb3Jwb3JhdGlvbl9pZCI6IjlhZDZiOGZlLTUwYmUtNDI5Zi05NTE1LWQwN2RhZTcyYTU1MyIsIm5hbWUiOiIiLCJyb2xlIjoib3JkZXJzb3VyY2UiLCJvcmRlcl9zb3VyY2VfaWQiOiI5MmM5MTE1ZC01MWY2LTQwMGMtYTgwMy03MjI1NDlhODlkNDIiLCJzY29wZSI6WyJvcmRlcnMiXX0.GtgCRMQamfw6qBYtZqQe1RU7Am-IacJW6Pz-x_xWN13wV8wUgHo6uaA2SG8IKO3CG8711UBTObpjaoUPF9IxxzAnTeQwSGSRWvs3LV-9U6HfuZgDkKKKGqFkVUtKT1ZqKa-ZyYztALTTipU8gJv0gkmg-sQARzeA-TmWmZGka8FoFPhcogY6fwzqaWJwV9ovYulkJiwUarL2JpdZbPQnZNbl0O-yh-GbE_9poamntNXnLj6Ab3IInZMZGCO-9bI79tMtSUV2uz5IFEzUPt_YGH2vyc35W7pgUuE53IMe9abs6Zj6etZuvKxtW0m6xi1WcGGMiBg4RMW-hhHdbg8aGnhujB4amNlyzyp4B1RavFwh2L5nFe5tRZOXL-cU4VC_328ZPt46LM2_07KolVz40MZGMKFfukKKWTzDModXF9IKN9VRgBGKfySAj4l5-iYFFc8k1pVnuZK9QW2whUhoC9AWEi_SQ86c_4MwSIlAW4uRc43Izf18Nz-iczEvxA59dCk7KalSnU65ww8jBligrKd4AiSME-NPTpMBoNcD2mw-Pf-fAUCHlrL4MU_7SALDHvRhR2fe1k40sqGQWmeiZutSqrzwXpCMHiT_aBJFIIre1LfAkrJjUse5avIc-UWlCQJ4qXDyumkOl3LN-P_NWapVFxnSSBe4FOgZGSlOCwY";

// let accessToken = "";

async function getAccessToken() {
  const proxyHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scopes: scopes,
      }),
      { headers: proxyHeaders }
    );

    accessToken = response.data.access_token;

    setTimeout(getAccessToken, response.data.expires_in * 1000);
  } catch (error) {
    console.error("Error getting access token:", error.message);
  }
}

let referenceData = [];

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.status(200).send();
});

app.get("/orders/reference", (req, res) => {
  res.json(referenceData);
});

app.post("/orders/reference", (req, res) => {
  const newItem = req.body;
  referenceData = newItem;
  res.json(referenceData);
});

app.use((req, res, next) => {
  const proxyHeaders = {
    Accept: `application/json, text/plain, */*`,
    "Accept-Encoding": `gzip, deflate, br`,
    "Accept-Language": `ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7`,
    "Sec-Fetch-Dest": `empty`,
    "Sec-Fetch-Mode": `cors`,
    "Sec-Fetch-Site": `cross-site`,

    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  axios({
    method: req.method,
    url: `https://delivery.ucs.ru${req.url}`,
    data: req.body,
    headers: proxyHeaders,
    httpsAgent: httpsAgent,
  })
    .then((apiResponse) => {
      res
        .status(apiResponse.status)
        .set("Access-Control-Allow-Origin", "*")
        .json(apiResponse.data);
    })
    .catch((error) => {
      console.error("Proxy error:", error.response.data);
      res.status(500).send(error.response.data);
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// getAccessToken();
