import { getDocumentProxy } from 'unpdf';

export async function pdfLoader(buffer: Uint8Array) {
    const pdf = await getDocumentProxy(buffer);
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        let lastY, text = '';
        
        for (const item of textContent.items) {
            if ('str' in item) {
                if (lastY == item.transform[5] || !lastY) {
                text += item.str;
                } else {
                text += '\n' + item.str;
                }
                lastY = item.transform[5];
            }
        }

        const footer = `\n\n-- ${i} of ${pdf.numPages} --\n\n`;
        fullText += text + footer;
    }

    return fullText;
}