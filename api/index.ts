const express = require("express");
const axios = require("axios")
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/get-dirctions", async (req, res) => {
    const {start, goal, option} = req.query;

    console.log("Query parameters :", {start, goal, option});

    const url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving";
    const headers = {
        "X-NCP-APIGW-API-KEY-ID" : process.env.NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY" : process.env.NAVER_CLIENT_SERCRET,
    };

    console.log("Reqeust URL: ", url);
    console.log("Reqeust Headers: ", headers);

    try {
        const response = await axios.get(url,{
            params: { start, goal, option },
            headers: headers,
        });

        console.log("Response status:", response.status);
        console.log("Response data: ", response.data);

        res.status(200).json(response.data);
    } catch(error) {
        console.error("Error:", error.message);
        if (error.response) {
        console.error("Error response:", error.response.data);
        }
        res.status(error.response ? error.response.status : 500).json({
        error: error.message,
        details: error.response ? error.response.data : null,
        });
    }
});

// For local development
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 0; // This will choose a random available port
    const server = app.listen(PORT, () =>
      console.log(`Server ready on port ${server.address().port}.`)
    );
  }

module.exports = app;