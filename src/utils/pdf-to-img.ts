import { getDocumentProxy } from 'unpdf';
import { createCanvas } from '@napi-rs/canvas';

export async function convertPdfToImages(buffer: ArrayBuffer) {
  const images: string[] = [];
  
  // 1. Load the PDF
  const pdf = await getDocumentProxy(new Uint8Array(buffer));

  // 2. Loop through pages (or just get the first one)
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    
    // 3. Set Scale (2.0 = 200% DPI, good for quality)
    const viewport = page.getViewport({ scale: 2.0 });
    
    // 4. Create the Canvas
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    // 5. Render PDF page to Canvas
    // Note: We cast context to any because PDF.js types expect a DOM Context, 
    // but the Node canvas context works fine.
    const renderContext = {
      canvasContext: context as any,
      viewport: viewport,
      canvas: canvas as any,
    };

    await page.render(renderContext).promise;

    // 6. Convert to Buffer (PNG) and then Base64 or just return Buffer
    // Here we return a Base64 string to easily display in frontend
    const imageBuffer = await canvas.encode('png'); 
    const base64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
    images.push(base64);
  }

  return images;
}