/**
 * End-to-End Integration Tests
 *
 * Comprehensive tests for the complete AWS Architecture Agent workflow
 */
import { ArchitectureAnalyzer } from '../../src/architecture/analyzer';
import { MermaidDiagramGenerator } from '../../diagrams/generator';
import { ValidationEngine } from '../../validation/engine';
import { ComprehensiveDocumentationGenerator } from '../../docs/documentation-generator';
import { mockArchitectureAnalysis, mockLargeArchitecture } from '../__mocks__/fixtures/architecture-fixtures';
import { mockNLPInput } from '../__mocks__/fixtures/nlp-fixtures';

describe('AWS Architecture Agent - End-to-End Integration Tests', () => {
  let analyzer: ArchitectureAnalyzer;
  let diagramGenerator: MermaidDiagramGenerator;
  let validationEngine: ValidationEngine;
  let documentationGenerator: ComprehensiveDocumentationGenerator;

  beforeEach(() => {
    analyzer = new ArchitectureAnalyzer();
    diagramGenerator = new MermaidDiagramGenerator();
    validationEngine = new ValidationEngine();
    documentationGenerator = new ComprehensiveDocumentationGenerator();
  });

  describe('Complete Workflow Integration', () => {
    it('should successfully process complete workflow from NLP to documentation', async () => {
      // Step 1: NLP Analysis
      const nlpResult = await analyzer.analyze(mockNLPInput.complexRequirements);

      expect(nlpResult).toBeDefined();
      expect(nlpResult.components).toBeInstanceOf(Array);
      expect(nlpResult.components.length).toBeGreaterThan(0);
      expect(nlpResult.confidence).toBeGreaterThan(0.5);

      // Step 2: Validation
      const validationResult = await validationEngine.validate(nlpResult);

      expect(validationResult).toBeDefined();
      expect(validationResult.overallScore).toBeGreaterThanOrEqual(0);
      expect(validationResult.overallScore).toBeLessThanOrEqual(100);
      expect(validationResult.pillarScores).toHaveLength(6);

      // Step 3: Diagram Generation
      const diagrams = await diagramGenerator.generateAllDiagrams(nlpResult);

      expect(diagrams).toHaveLength(4);
      expect(diagrams.every((d) => d.type)).toBe(true);
      expect(diagrams.some((d) => d.type === 'component')).toBe(true);
      expect(diagrams.some((d) => d.type === 'data-flow')).toBe(true);

      // Step 4: Documentation Generation
      const documentation = await documentationGenerator.generateAllFormats(nlpResult);

      expect(documentation).toBeDefined();
      expect(documentation.markdown).toBeDefined();
      expect(documentation.html).toBeDefined();
      expect(documentation.pdf).toBeDefined();
      expect(documentation.code).toBeDefined();
    });

    it('should handle error conditions gracefully throughout workflow', async () => {
      // Test with empty requirements
      const emptyResult = await analyzer.analyze('');

      expect(emptyResult).toBeDefined();
      expect(emptyResult.confidence).toBeLessThan(0.5);

      // Validation should still work
      const validationResult = await validationEngine.validate(emptyResult);
      expect(validationResult).toBeDefined();
      expect(validationResult.overallScore).toBeGreaterThanOrEqual(0);

      // Diagram generation should handle empty architecture
      const diagrams = await diagramGenerator.generateAllDiagrams(emptyResult);
      expect(diagrams).toHaveLength(4);
      expect(diagrams.every((d) => !d.success || d.error)).toBe(true);

      // Documentation should handle empty architecture
      const documentation = await documentationGenerator.generateAllFormats(emptyResult);
      expect(documentation).toBeDefined();
    });
  });

  describe('Large Architecture Performance', () => {
    it('should handle large architectures efficiently', async () => {
      // Test with large architecture
      const largeResult = await analyzer.analyzeFromInput(JSON.stringify({
        components: mockLargeArchitecture.components,
        relationships: mockLargeArchitecture.relationships,
        patterns: mockLargeArchitecture.patterns,
        requirements: mockLargeArchitecture.requirements,
        constraints: mockLargeArchitecture.constraints,
      }));

      expect(largeResult).toBeDefined();
      expect(largeResult.components).toHaveLength(50);

      // Validation should complete within reasonable time
      const startTime = Date.now();
      const validationResult = await validationEngine.validate(largeResult);
      const validationTime = Date.now() - startTime;

      expect(validationResult).toBeDefined();
      expect(validationTime).toBeLessThan(5000); // Should complete in under 5 seconds

      // Diagram generation should handle large architecture
      const diagramStart = Date.now();
      const diagrams = await diagramGenerator.generateAllDiagrams(largeResult);
      const diagramTime = Date.now() - diagramStart;

      expect(diagrams).toHaveLength(4);
      expect(diagramTime).toBeLessThan(10000); // Should complete in under 10 seconds
    });
  });

  describe('Component Integration', () => {
    it('should integrate NLP processor with input parser', async () => {
      const jsonInput = JSON.stringify({
        requirements: ['Build a serverless application with Lambda and S3'],
      });

      const result = await analyzer.analyzeFromInput(jsonInput);

      expect(result).toBeDefined();
      expect(result.nlpAnalysis).toBeDefined();
      expect(result.nlpAnalysis?.entities?.services).toBeInstanceOf(Array);
    });

    it('should integrate validation engine with diagram generator', async () => {
      const validationResult = await validationEngine.validate(mockArchitectureAnalysis);

      expect(validationResult).toBeDefined();
      expect(validationResult.overallScore).toBeGreaterThan(0);

      // Use the validated architecture for diagram generation
      const diagrams = await diagramGenerator.generateAllDiagrams(mockArchitectureAnalysis);

      expect(diagrams).toHaveLength(4);
      expect(diagrams.every((d) => d.success)).toBe(true);
    });

    it('should integrate all components for comprehensive analysis', async () => {
      // Full integration test
      const analysis = await analyzer.analyze(mockNLPInput.complexRequirements);
      const validation = await validationEngine.validate(analysis);
      const diagrams = await diagramGenerator.generateAllDiagrams(analysis);
      const documentation = await documentationGenerator.generateAllFormats(analysis);

      // Verify all components produced valid results
      expect(analysis.confidence).toBeGreaterThan(0.5);
      expect(validation.overallScore).toBeGreaterThan(0);
      expect(diagrams.every((d) => d.type)).toBe(true);
      expect(documentation.markdown.length).toBeGreaterThan(100);
      expect(documentation.html.length).toBeGreaterThan(100);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should recover from NLP processing failures', async () => {
      // Test with invalid input that should cause NLP to fail
      const invalidInput = 'This is not valid architecture requirements';

      const result = await analyzer.analyze(invalidInput);

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.5);
      expect(result.components).toBeInstanceOf(Array);

      // Should still be able to validate
      const validationResult = await validationEngine.validate(result);
      expect(validationResult).toBeDefined();
    });

    it('should handle malformed input data gracefully', async () => {
      const malformedInput = '{"invalid": "json"';

      const result = await analyzer.analyzeFromInput(malformedInput);

      expect(result).toBeDefined();
      // Should fall back to basic analysis
      expect(result.confidence).toBeGreaterThanOrEqual(0.3);
    });
  });

  describe('Performance Metrics', () => {
    it('should complete full workflow within acceptable time', async () => {
      const startTime = Date.now();

      // Full workflow
      const analysis = await analyzer.analyze(mockNLPInput.complexRequirements);
      const validation = await validationEngine.validate(analysis);
      const diagrams = await diagramGenerator.generateAllDiagrams(analysis);
      const documentation = await documentationGenerator.generateAllFormats(analysis);

      const totalTime = Date.now() - startTime;

      expect(totalTime).toBeLessThan(15000); // Should complete in under 15 seconds
      expect(analysis).toBeDefined();
      expect(validation).toBeDefined();
      expect(diagrams).toBeDefined();
      expect(documentation).toBeDefined();
    });

    it('should handle concurrent operations efficiently', async () => {
      // Test multiple operations in parallel
      const operations = [
        analyzer.analyze(mockNLPInput.simpleRequirements),
        analyzer.analyze(mockNLPInput.complexRequirements),
        validationEngine.validate(mockArchitectureAnalysis),
        diagramGenerator.generateAllDiagrams(mockArchitectureAnalysis),
      ];

      const startTime = Date.now();
      const results = await Promise.all(operations);
      const parallelTime = Date.now() - startTime;

      expect(results).toHaveLength(4);
      expect(parallelTime).toBeLessThan(10000); // Should complete in under 10 seconds
    });
  });
});