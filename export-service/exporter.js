import { getBrowser } from "./browser.js";
import { addPageBorders } from "./pdfBorder.js";

const FRONTEND_URL =
    process.env.FRONTEND_URL ||
    "http://localhost:5173";

export async function exportDocument(document) {

    const browser = await getBrowser();

    const page = await browser.newPage({

        viewport: {
            width: 1400,
            height: 1000,
        },

    });

    try {

        console.log("Opening print page...");

        await page.goto(

            `${FRONTEND_URL}/print`,

            {
                waitUntil: "networkidle",
            }

        );
        await page.evaluate(() => {

            window.__SUBMITIFY_READY__ = false;

        });

        console.log("Injecting document...");

        await page.evaluate((doc) => {

            window.__SUBMITIFY_DOCUMENT__ = doc;

            window.dispatchEvent(
                new Event("submitify-document-ready")
            );

        }, document);

        console.log("Waiting for React...");

        await page.waitForFunction(() => {

            return window.__SUBMITIFY_READY__ === true;

        });

        console.log("Generating PDF...");

        const pdf = await page.pdf({

            format: "A4",

            printBackground: true,

            margin: {

                top: "0mm",
                right: "0mm",
                bottom: "0mm",
                left: "0mm",

            },

        });

        const finalPdf = await addPageBorders(pdf);

        return finalPdf;

    }

    finally {

        await page.close();

    }

}