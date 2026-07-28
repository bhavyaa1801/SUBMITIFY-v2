import { getBrowser } from "./browser.js";
import { addPageBorders } from "./pdfBorder.js";

const FRONTEND_URL =
    process.env.FRONTEND_URL ||
    "http://localhost:5173";

export async function exportDocument(document) {

    const browser = await getBrowser();
    //remove
    const loaded = await page.evaluate(() => {
        return window.__PRINT_PAGE_LOADED__;
    });

    console.log("Print page loaded:", loaded);

    const page = await browser.newPage({

        viewport: {
            width: 794,
            height: 1123,
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
        await page.waitForTimeout(1000);
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



        await page.emulateMedia({ media: "print" });

        const pdf = await page.pdf({
            preferCSSPageSize: true,
            printBackground: true,
        });

        const finalPdf = await addPageBorders(pdf);

        return finalPdf;

    }

    finally {

        await page.close();

    }

}