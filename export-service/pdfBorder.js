import { PDFDocument, rgb } from "pdf-lib";

export async function addPageBorders(pdfBytes) {

    const pdf = await PDFDocument.load(pdfBytes);

    const pages = pdf.getPages();

    for (const page of pages) {

        const { width, height } = page.getSize();

        page.drawRectangle({

            x: 28,
            y: 28,

            width: width - 56,
            height: height - 56,

            borderColor: rgb(0, 0, 0),

            borderWidth: 1.2,

        });

    }

    return await pdf.save();

}