const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Scraper = require("images-scraper");


const NUM_IMAGES = 200;
const PORT = process.env.PORT;
const google = new Scraper({
    puppeteer: {
        headless: true,
    }
});
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
let results;


app.get("/", (req, res) =>
{
    res.send("Please select an endpoint to use instead.");
});


app.get("/getafox", (req, res) =>
{
    if (!results)
    {
        res.json({status: "WAIT", message: "Error: Images not loaded yet. Try again in a few seconds."});
        return;
    }

    const index = Math.floor(Math.random() * NUM_IMAGES);
    res.json({status: "OK", url: results[index]});
});


app.listen(PORT, async () =>
{
    console.log("LISTENING ON PORT " + PORT)

    results = await google.scrape("fox", NUM_IMAGES);
    results = results.map(r => r["url"]);
});