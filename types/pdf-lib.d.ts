/**
 * Minimal type declarations for pdf-lib to fix TypeScript compilation
 */
declare module 'pdf-lib' {
  // PDFDocument class
  class PDFDocument {
    static create(): Promise<PDFDocument>;
    addPage(size: [number, number]): any;
    embedFont(font: any): Promise<any>;
    save(): Promise<Uint8Array>;
  }

  // StandardFonts enum
  enum StandardFonts {
    TimesRoman = 'Times-Roman',
    TimesRomanBold = 'Times-Roman-Bold',
  }

  // rgb function
  function rgb(r: number, g: number, b: number): any;

  export { PDFDocument, StandardFonts, rgb };
}