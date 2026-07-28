import express from "express";
import cors from "cors";
import { exportDocument } from "./exporter.js";
import { getBrowser, closeBrowser } from "./browser.js";

const app = express();

app.use(cors());

app.use(express.json({
    limit: "50mb",
}));

app.get("/", (req, res) => {

    res.send(" Submitify Export Service");

});

app.post("/export", async (req, res) => {

    try {

        console.log("Export request received");

        const pdf = await exportDocument(req.body);

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.send(pdf);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            error: err.message,

        });

    }

});

const PORT = process.env.PORT || 3001;

async function start() {

    await getBrowser();

    app.listen(PORT, () => {

        console.log(
            ` Export Service running on ${PORT}`
        );

    });

    app.get("/health", (req, res) => {
        res.status(200).send("OK");
    });

}

start();

process.on("SIGINT", async () => {

    await closeBrowser();

    process.exit();

});