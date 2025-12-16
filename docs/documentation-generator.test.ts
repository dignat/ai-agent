/**
 * Documentation Generator Tests
 *
 * Comprehensive unit tests for the documentation generation system
 */
import { ComprehensiveDocumentationGenerator } from './documentation-generator';
import { ArchitectureAnalysis } from '../types';
import { DocumentationError } from './documentation-error';

describe('ComprehensiveDocumentationGenerator', () => {
  let generator: ComprehensiveDocumentationGenerator;
  let mockAnalysisResult: ArchitectureAnalysis;

  beforeEach(() => {
    generator = new ComprehensiveDocumentationGenerator();

    // Create a mock analysis result
    mockAnalysisResult = {
      components: [
        {
          id: 'comp-1',
          name: 'Lambda Function',
          type: 'AWS Lambda',
          description: 'Serverless compute service',
          isAWSService: true,
        },
        {
          id: 'comp-2',
          name: 'DynamoDB Table',
          type: 'DynamoDB',
          description: 'NoSQL database',
          isAWSService: true,
        },
      ],
      relationships: [
        {
          type: 'Lambda-DynamoDB',
          description: 'Lambda reads/writes to DynamoDB',
          confidence: 0.95,
        },
      ],
      patterns: [
        {
          name: 'Serverless Pattern',
          category: 'Compute',
          services: ['Lambda', 'DynamoDB'],
        },
      ],
      requirements: ['High availability', 'Low latency'],
      constraints: ['Must comply with GDPR'],
      bestPractices: ['Use least privilege IAM roles', 'Implement proper error handling'],
      validation: {
        errors: [],
        warnings: ['Consider adding monitoring'],
        suggestions: ['Implement auto-scaling'],
        confidence: 0.85,
      },
      confidence: 0.85,
      nlpAnalysis: {
        originalText: 'Build a serverless application',
        entities: {
          services: [
            { name: 'Lambda', type: 'Compute' },
            { name: 'DynamoDB', type: 'Database' },
          ],
          components: [{ name: 'API Gateway', type: 'API' }],
        },
        intents: {
          architecturalPatterns: [{ name: 'Serverless', category: 'Modern' }],
          useCases: ['E-commerce backend'],
          constraints: ['GDPR compliance'],
        },
      },
    };
  });

  describe('Markdown Generation', () => {
    it('should generate valid Markdown documentation', async () => {
      const markdown = await generator.generateMarkdown(mockAnalysisResult);

      expect(markdown).toBeDefined();
      expect(markdown).toContain('# AWS Architecture Documentation');
      expect(markdown).toContain('## Components');
      expect(markdown).toContain('Lambda Function');
      expect(markdown).toContain('DynamoDB Table');
      expect(markdown).toContain('## Architecture Patterns');
      expect(markdown).toContain('Serverless Pattern');
    });

    it('should handle empty analysis result', async () => {
      const emptyResult = {
        components: [],
        relationships: [],
        patterns: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      const markdown = await generator.generateMarkdown(emptyResult);
      expect(markdown).toBeDefined();
      expect(markdown).toContain('# AWS Architecture Documentation');
    });

    it('should throw error for invalid input', async () => {
      await expect(generator.generateMarkdown(null as any)).rejects.toThrow(DocumentationError);
    });
  });

  describe('HTML Generation', () => {
    it('should generate valid HTML documentation', async () => {
      const html = await generator.generateHTML(mockAnalysisResult);

      expect(html).toBeDefined();
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<title>AWS Architecture Documentation</title>');
      expect(html).toContain('<h2>Components</h2>');
      expect(html).toContain('Lambda Function');
      expect(html).toContain('DynamoDB Table');
      expect(html).toContain('<h2>Architecture Patterns</h2>');
      expect(html).toContain('Serverless Pattern');
    });

    it('should include proper styling', async () => {
      const html = await generator.generateHTML(mockAnalysisResult);

      expect(html).toContain('<style>');
      expect(html).toContain('body {');
      expect(html).toContain('.section {');
      expect(html).toContain('.aws-service {');
    });

    it('should throw error for invalid input', async () => {
      await expect(generator.generateHTML(null as any)).rejects.toThrow(DocumentationError);
    });
  });

  describe('PDF Generation', () => {
    it('should generate valid PDF documentation', async () => {
      const pdf = await generator.generatePDF(mockAnalysisResult);

      expect(pdf).toBeDefined();
      expect(pdf).toBeInstanceOf(Buffer);
      expect(pdf.length).toBeGreaterThan(0);
    });

    it('should throw error for invalid input', async () => {
      await expect(generator.generatePDF(null as any)).rejects.toThrow(DocumentationError);
    });
  });

  describe('Code Generation', () => {
    it('should generate valid implementation code', async () => {
      const code = await generator.generateCode(mockAnalysisResult);

      expect(code).toBeDefined();
      expect(code).toContain('// AWS Architecture Implementation Code');
      expect(code).toContain('import * as AWS from');
      expect(code).toContain('async function deployArchitecture()');
      expect(code).toContain('async function cleanupArchitecture');
    });

    it('should generate Lambda implementation for AWS services', async () => {
      const code = await generator.generateCode(mockAnalysisResult);

      expect(code).toContain('Lambda Function');
      expect(code).toContain('DynamoDB Table');
      expect(code).toContain('createLambdaFunction');
      expect(code).toContain('createDynamoDBTable');
    });

    it('should throw error for invalid input', async () => {
      await expect(generator.generateCode(null as any)).rejects.toThrow(DocumentationError);
    });
  });

  describe('Template Management', () => {
    it('should return available templates', () => {
      const templates = generator.getAvailableTemplates();
      expect(templates).toBeDefined();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should generate documentation with specific template', async () => {
      const templates = generator.getAvailableTemplates();
      if (templates.length > 0) {
        const templateName = templates[0];
        const result = await generator.generateWithTemplate(
          mockAnalysisResult,
          templateName,
          'markdown',
        );

        expect(result).toBeDefined();
        if (typeof result === 'string') {
          expect(result).toContain('#');
        }
      }
    });

    it('should throw error for non-existent template', async () => {
      await expect(
        generator.generateWithTemplate(mockAnalysisResult, 'non-existent-template'),
      ).rejects.toThrow(DocumentationError);
    });
  });

  describe('All Formats Generation', () => {
    it('should generate all documentation formats', async () => {
      const results = await generator.generateAllFormats(mockAnalysisResult);

      expect(results).toBeDefined();
      expect(results.markdown).toBeDefined();
      expect(results.html).toBeDefined();
      expect(results.pdf).toBeDefined();
      expect(results.code).toBeDefined();

      // Verify content types
      expect(typeof results.markdown).toBe('string');
      expect(typeof results.html).toBe('string');
      expect(results.pdf).toBeInstanceOf(Buffer);
      expect(typeof results.code).toBe('string');
    });

    it('should throw error for invalid input in all formats', async () => {
      await expect(generator.generateAllFormats(null as any)).rejects.toThrow(DocumentationError);
    });
  });

  describe('Error Handling', () => {
    it('should handle DocumentationError properly', () => {
      const error = new DocumentationError('Test error');
      expect(error).toBeInstanceOf(DocumentationError);
      expect(error.name).toBe('DocumentationError');
      expect(error.message).toBe('Test error');
    });

    it('should maintain error context', async () => {
      try {
        await generator.generateMarkdown(null as any);
      } catch (error) {
        expect(error).toBeInstanceOf(DocumentationError);
        expect(error.message).toContain('No analysis result provided');
      }
    });
  });
});
