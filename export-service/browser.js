import { chromium } from "playwright";

let browser = null;

export async function getBrowser() {

    if (browser) {
        return browser;
    }

    browser = await chromium.launch({

        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],

    });

    console.log("🚀 Chromium launched");

    return browser;

}

export async function closeBrowser() {

    if (!browser) {
        return;
    }

    await browser.close();

    browser = null;

    console.log("👋 Chromium closed");

}