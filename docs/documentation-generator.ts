/**
 * Comprehensive Documentation Generator
 *
 * Generates architecture documentation in multiple formats
 * with proper formatting, structure, and error handling
 */
import { ArchitectureAnalysis } from '../types';
import { DocumentationGenerator } from './generator';
import { MarkdownGenerator } from './markdown-generator';
import { HTMLGenerator } from './html-generator';
import { PDFGenerator } from './pdf-generator';
import { CodeGenerator } from './code-generator';
import { DocumentationTemplateManager } from './template-manager';
import { DocumentationError } from './documentation-error';

export class ComprehensiveDocumentationGenerator {
  private markdownGenerator: MarkdownGenerator;
  private htmlGenerator: HTMLGenerator;
  private pdfGenerator: PDFGenerator;
  private codeGenerator: CodeGenerator;
  private templateManager: DocumentationTemplateManager;

  constructor() {
    this.markdownGenerator = new MarkdownGenerator();
    this.htmlGenerator = new HTMLGenerator();
    this.pdfGenerator = new PDFGenerator();
    this.codeGenerator = new CodeGenerator();
    this.templateManager = new DocumentationTemplateManager();
  }

  /**
   * Generate documentation in all supported formats
   */
  async generateAllFormats(analysisResult: ArchitectureAnalysis): Promise<{
    markdown: string;
    html: string;
    pdf: Buffer;
    code: string;
  }> {
    try {
      // Generate all formats
      const markdown = await this.generateMarkdown(analysisResult);
      const html = await this.generateHTML(analysisResult);
      const pdf = await this.generatePDF(analysisResult);
      const code = await this.generateCode(analysisResult);

      return { markdown, html, pdf, code };
    } catch (error) {
      throw new DocumentationError(
        `Failed to generate all documentation formats: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate Markdown documentation
   */
  async generateMarkdown(analysisResult: ArchitectureAnalysis): Promise<string> {
    try {
      return await this.markdownGenerator.generate(analysisResult);
    } catch (error) {
      throw new DocumentationError(
        `Markdown generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate HTML documentation
   */
  async generateHTML(analysisResult: ArchitectureAnalysis): Promise<string> {
    try {
      return await this.htmlGenerator.generate(analysisResult);
    } catch (error) {
      throw new DocumentationError(
        `HTML generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate PDF documentation
   */
  async generatePDF(analysisResult: ArchitectureAnalysis): Promise<Buffer> {
    try {
      return await this.pdfGenerator.generate(analysisResult);
    } catch (error) {
      throw new DocumentationError(
        `PDF generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate implementation code
   */
  async generateCode(analysisResult: ArchitectureAnalysis): Promise<string> {
    try {
      return await this.codeGenerator.generate(analysisResult);
    } catch (error) {
      throw new DocumentationError(
        `Code generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate documentation using a specific template
   */
  async generateWithTemplate(
    analysisResult: ArchitectureAnalysis,
    templateName: string,
    format: 'markdown' | 'html' | 'pdf' | 'code' = 'markdown',
  ): Promise<string | Buffer> {
    try {
      const template = this.templateManager.getTemplate(templateName);
      if (!template) {
        throw new DocumentationError(`Template '${templateName}' not found`);
      }

      switch (format) {
        case 'html':
          return await this.htmlGenerator.generateWithTemplate(analysisResult, template);
        case 'pdf':
          return await this.pdfGenerator.generateWithTemplate(analysisResult, template);
        case 'code':
          return await this.codeGenerator.generateWithTemplate(analysisResult, template);
        case 'markdown':
        default:
          return await this.markdownGenerator.generateWithTemplate(analysisResult, template);
      }
    } catch (error) {
      throw new DocumentationError(
        `Template-based generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Get available documentation templates
   */
  getAvailableTemplates(): string[] {
    return this.templateManager.getAvailableTemplates();
  }
}
