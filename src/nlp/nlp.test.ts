/**
 * NLP Module Unit Tests
 *
 * Comprehensive tests for the NLP functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { NLPProcessor } from './index';
import { EntityExtractor } from './entity-extractor';
import { IntentRecognizer } from './intent-recognizer';
import { RequirementsAnalyzer } from './requirements-analyzer';
import { NLPErrorHandler } from './error-handler';
import { AWSServiceCatalog } from './service-catalog';
import { ArchitecturalPatterns } from './patterns-library';

describe('NLP Processor', () => {
  let nlpProcessor: NLPProcessor;

  beforeEach(() => {
    nlpProcessor = new NLPProcessor();
  });

  describe('Service Catalog', () => {
    it('should return comprehensive service catalog', () => {
      const catalog = nlpProcessor.getServiceCatalog();
      expect(catalog).toBeDefined();
      expect(catalog.compute).toBeDefined();
      expect(catalog.storage).toBeDefined();
      expect(catalog.database).toBeDefined();
    });

    it('should find services by name', () => {
      const serviceCatalog = new AWSServiceCatalog();
      const service = serviceCatalog.findService('lambda');
      expect(service).toBeDefined();
      expect(service?.name).toBe('Lambda');
    });
  });

  describe('Patterns Library', () => {
    it('should return architectural patterns', () => {
      const patterns = nlpProcessor.getPatternsLibrary();
      expect(patterns).toBeDefined();
      expect(patterns.serverless).toBeDefined();
      expect(patterns.microservices).toBeDefined();
    });

    it('should find patterns by use case', () => {
      const patternsLibrary = new ArchitecturalPatterns();
      const patterns = patternsLibrary.findPatternsByUseCase('serverless');
      expect(patterns.length).toBeGreaterThan(0);
    });
  });

  describe('Entity Extraction', () => {
    it('should extract AWS services from text', () => {
      const entityExtractor = new EntityExtractor();
      const text = 'We need to use AWS Lambda for serverless computing and S3 for storage';
      const entities = entityExtractor.extractEntities(text);

      expect(entities.services.length).toBeGreaterThan(0);
      expect(entities.services.some((s: { name: string }) => s.name === 'Lambda')).toBe(true);
      expect(entities.services.some((s: { name: string }) => s.name === 'S3')).toBe(true);
    });

    it('should extract components and relationships', () => {
      const entityExtractor = new EntityExtractor();
      const text = 'The web application connects to the database and uses caching';
      const entities = entityExtractor.extractEntities(text);

      expect(entities.components.length).toBeGreaterThan(0);
      expect(entities.relationships.length).toBeGreaterThan(0);
    });
  });

  describe('Intent Recognition', () => {
    it('should recognize architectural patterns', () => {
      const intentRecognizer = new IntentRecognizer();
      const text = 'We want a serverless architecture with Lambda and API Gateway';
      const entities = { services: [{ name: 'Lambda' }, { name: 'API Gateway' }] };
      const intents = intentRecognizer.recognizeIntents(text, entities);

      expect(intents.architecturalPatterns.length).toBeGreaterThan(0);
      expect(
        intents.architecturalPatterns.some((p: { pattern: string }) =>
          p.pattern.toLowerCase().includes('serverless'),
        ),
      ).toBe(true);
    });

    it('should extract use cases and constraints', () => {
      const intentRecognizer = new IntentRecognizer();
      const text = 'We need a web application with low latency and budget of $5000';
      const entities = { services: [] };
      const intents = intentRecognizer.recognizeIntents(text, entities);

      expect(intents.useCases.length).toBeGreaterThan(0);
      expect(intents.constraints.length).toBeGreaterThan(0);
    });
  });

  describe('Requirements Analysis', () => {
    it('should convert natural language to structured data', () => {
      const requirementsAnalyzer = new RequirementsAnalyzer();
      const text = 'Build a serverless web application with Lambda and S3';
      const entities = {
        services: [{ name: 'Lambda', type: 'compute', description: 'Serverless compute' }],
        components: [],
        relationships: [],
        requirements: [],
      };
      const intents = {
        architecturalPatterns: [{ pattern: 'serverless', category: 'Serverless Patterns' }],
        useCases: [],
        constraints: [],
        bestPractices: [],
      };

      const result = requirementsAnalyzer.analyzeRequirements(text, entities, intents);

      expect(result.architecture).toBeDefined();
      expect(result.architecture.type).toBe('Serverless Architecture');
      expect(result.architecture.components.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should validate and handle errors', () => {
      const errorHandler = new NLPErrorHandler();
      const structuredData = {
        architecture: {
          components: [],
          services: [],
          requirements: [],
          constraints: [],
          bestPractices: [],
        },
        confidence: 0.8,
      };

      const result = errorHandler.validateAndHandleErrors(structuredData);

      expect(result.validation.errors.length).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThan(0.8);
    });

    it('should detect ambiguous requirements', () => {
      const errorHandler = new NLPErrorHandler();
      const structuredData = {
        architecture: {
          components: [{ name: 'some component' }],
          services: [{ serviceName: 'Lambda' }],
          requirements: [],
          constraints: [],
          bestPractices: [],
        },
        confidence: 0.7,
      };

      const result = errorHandler.validateAndHandleErrors(structuredData);

      expect(result.validation.warnings.some((w: { type: string }) => w.type === 'vague-requirement')).toBe(
        true,
      );
    });
  });

  describe('End-to-End Processing', () => {
    it('should process complete requirements successfully', async () => {
      const text =
        'We need a serverless web application using AWS Lambda, API Gateway, and DynamoDB. ' +
        'It should be cost-effective but provide low latency for users. ' +
        'The system must be secure and comply with GDPR requirements.';

      const result = await nlpProcessor.processRequirements(text);

      expect(result).toBeDefined();
      expect(result.architecture).toBeDefined();
      expect(result.architecture.services.length).toBeGreaterThan(0);
      expect(result.architecture.requirements.length).toBeGreaterThan(0);
      expect(result.validation).toBeDefined();
    });

    it('should handle incomplete requirements gracefully', async () => {
      const text = 'Build an application';

      const result = await nlpProcessor.processRequirements(text);

      expect(result).toBeDefined();
      expect(result.validation.errors.length).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThan(0.5);
    });
  });
});
