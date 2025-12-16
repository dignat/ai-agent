/**
 * Performance and Stress Tests
 *
 * Tests for large architectures and performance characteristics
 */
import { ArchitectureAnalyzer } from '../../src/architecture/analyzer';
import { MermaidDiagramGenerator } from '../../diagrams/generator';
import { ValidationEngine } from '../../validation/engine';
import { ComprehensiveDocumentationGenerator } from '../../docs/documentation-generator';
import { mockLargeArchitecture } from '../__mocks__/fixtures/architecture-fixtures';
import { mockNLPInput } from '../__mocks__/fixtures/nlp-fixtures';

describe('Performance and Stress Tests', () => {
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

  describe('Large Architecture Performance', () => {
    it('should handle very large architectures efficiently', async () => {
      // Create an extremely large architecture
      const veryLargeArchitecture = {
        components: Array.from({ length: 20 }, (_, i) => ({
          id: `comp-${i + 1}`,
          name: `Service-${i + 1}`,
          type:
            i % 4 === 0
              ? 'compute'
              : i % 4 === 1
                ? 'database'
                : i % 4 === 2
                  ? 'storage'
                  : 'networking',
          description: `Service ${i + 1} for stress testing`,
          isAWSService: true,
        })),
        relationships: Array.from({ length: 40 }, (_, i) => ({
          source: { name: `Service-${Math.floor(i / 2) + 1}` },
          target: { name: `Service-${Math.floor(i / 2) + 2}` },
          type: i % 2 === 0 ? 'connects' : 'depends on',
          description: `Relationship ${i + 1}`,
        })),
        patterns: ['Serverless', 'Microservices', 'Event-Driven', 'Hybrid'],
        requirements: Array.from({ length: 20 }, (_, i) => `Requirement ${i + 1}`),
        constraints: Array.from({ length: 10 }, (_, i) => `Constraint ${i + 1}`),
        bestPractices: Array.from({ length: 10 }, (_, i) => `Best Practice ${i + 1}`),
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.85,
        },
        confidence: 0.85,
        nlpAnalysis: null,
      };

      const startTime = Date.now();
      const result = await analyzer.analyzeFromInput(JSON.stringify(veryLargeArchitecture));
      const analysisTime = Date.now() - startTime;
      expect(result).toBeDefined();
      expect(result.components).toHaveLength(20);
      expect(analysisTime).toBeLessThan(10000); // Should complete in under 10 seconds
    });

    it('should validate large architectures within acceptable time', async () => {
      const startTime = Date.now();
      const result = await validationEngine.validate(mockLargeArchitecture);
      const validationTime = Date.now() - startTime;

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(validationTime).toBeLessThan(5000); // Should complete in under 5 seconds
    });

    it('should generate diagrams for large architectures efficiently', async () => {
      const startTime = Date.now();
      const diagrams = await diagramGenerator.generateAllDiagrams(mockLargeArchitecture);
      const diagramTime = Date.now() - startTime;

      expect(diagrams).toHaveLength(4);
      expect(diagramTime).toBeLessThan(15000); // Should complete in under 15 seconds
    });

    it('should generate documentation for large architectures efficiently', async () => {
      const startTime = Date.now();
      const documentation = await documentationGenerator.generateAllFormats(mockLargeArchitecture);
      const documentationTime = Date.now() - startTime;

      expect(documentation).toBeDefined();
      expect(documentation.markdown).toBeDefined();
      expect(documentationTime).toBeLessThan(10000); // Should complete in under 10 seconds
    });
  });

  describe('Memory Usage Tests', () => {
    it('should handle memory-intensive operations without crashes', async () => {
      // Create multiple large operations to test memory usage
      const operations = Array.from({ length: 5 }, (_, i) => {
        const largeArch = {
          components: Array.from({ length: 50 }, (_, j) => ({
            id: `comp-${i}-${j}`,
            name: `Service-${i}-${j}`,
            type: 'compute',
            description: `Service ${i}-${j}`,
            isAWSService: true,
          })),
          relationships: [],
          patterns: [],
          requirements: [],
          constraints: [],
          bestPractices: [],
          validation: {
            errors: [],
            warnings: [],
            suggestions: [],
            confidence: 0.8,
          },
          confidence: 0.8,
          nlpAnalysis: null,
        };

        return validationEngine.validate(largeArch);
      });

      const startTime = Date.now();
      const results = await Promise.all(operations);
      const totalTime = Date.now() - startTime;

      expect(results).toHaveLength(5);
      expect(totalTime).toBeLessThan(20000); // Should complete in under 20 seconds
      expect(results.every((r) => r.overallScore >= 0)).toBe(true);
    });
  });

  describe('Concurrent Operations Performance', () => {
    it('should handle multiple concurrent operations efficiently', async () => {
      const nlpOperations = Array.from({ length: 10 }, () =>
        analyzer.analyze(mockNLPInput.simpleRequirements),
      );

      const validationOperations = Array.from({ length: 10 }, () =>
        validationEngine.validate(mockLargeArchitecture),
      );

      const diagramOperations = Array.from({ length: 5 }, () =>
        diagramGenerator.generateAllDiagrams(mockLargeArchitecture),
      );

      const allOperations = [...nlpOperations, ...validationOperations, ...diagramOperations];

      const startTime = Date.now();
      const results = await Promise.all(allOperations);
      const concurrentTime = Date.now() - startTime;

      expect(results).toHaveLength(25);
      expect(concurrentTime).toBeLessThan(30000); // Should complete in under 30 seconds
    });

    it('should handle mixed workload efficiently', async () => {
      const mixedOperations = [
        // NLP operations
        analyzer.analyze(mockNLPInput.simpleRequirements),
        analyzer.analyze(mockNLPInput.complexRequirements),

        // Validation operations
        validationEngine.validate(mockLargeArchitecture),
        validationEngine.validate({
          components: [{ name: 'Test', isAWSService: true }],
          patterns: [],
          requirements: [],
        }),

        // Diagram operations
        diagramGenerator.generateAllDiagrams(mockLargeArchitecture),
        diagramGenerator.generateComponentDiagram(mockLargeArchitecture),

        // Documentation operations
        documentationGenerator.generateAllFormats(mockLargeArchitecture),
        documentationGenerator.generateMarkdown(mockLargeArchitecture),
      ];

      const startTime = Date.now();
      const results = await Promise.all(mixedOperations);
      const mixedTime = Date.now() - startTime;

      expect(results).toHaveLength(8);
      expect(mixedTime).toBeLessThan(20000); // Should complete in under 20 seconds
    });
  });

  describe('Performance Regression Tests', () => {
    it('should maintain consistent performance across multiple runs', async () => {
      const runTimes: number[] = [];

      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        await validationEngine.validate(mockLargeArchitecture);
        const runTime = Date.now() - startTime;
        runTimes.push(runTime);
      }

      // Calculate statistics
      const avgTime = runTimes.reduce((sum, time) => sum + time, 0) / runTimes.length;
      const maxTime = Math.max(...runTimes);
      const minTime = Math.min(...runTimes);

      expect(avgTime).toBeLessThan(5000); // Average should be under 5 seconds
      expect(maxTime - minTime).toBeLessThan(2000); // Variation should be reasonable
    });

    it('should not degrade performance with repeated operations', async () => {
      const firstRunStart = Date.now();
      await validationEngine.validate(mockLargeArchitecture);
      const firstRunTime = Date.now() - firstRunStart;

      // Run multiple times to check for memory leaks or degradation
      for (let i = 0; i < 10; i++) {
        await validationEngine.validate(mockLargeArchitecture);
      }

      const lastRunStart = Date.now();
      await validationEngine.validate(mockLargeArchitecture);
      const lastRunTime = Date.now() - lastRunStart;

      // Performance should not degrade significantly
      expect(lastRunTime).toBeLessThan(firstRunTime * 2); // Should not take more than 2x the original time
    });
  });

  describe('Stress Test Scenarios', () => {
    it('should handle extreme load scenarios', async () => {
      // Create an extreme scenario with very large data
      const extremeArchitecture = {
        components: Array.from({ length: 500 }, (_, i) => ({
          id: `extreme-${i}`,
          name: `Extreme-Service-${i}`,
          type: 'compute',
          description: `Extreme service for stress testing`,
          isAWSService: true,
        })),
        relationships: Array.from({ length: 1000 }, (_, i) => ({
          source: { name: `Extreme-Service-${i}` },
          target: { name: `Extreme-Service-${i + 1}` },
          type: 'connects',
          description: `Extreme relationship`,
        })),
        patterns: Array.from({ length: 20 }, (_, i) => `Pattern-${i}`),
        requirements: Array.from({ length: 50 }, (_, i) => `Requirement-${i}`),
        constraints: Array.from({ length: 20 }, (_, i) => `Constraint-${i}`),
        bestPractices: Array.from({ length: 20 }, (_, i) => `Best-Practice-${i}`),
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.7,
        },
        confidence: 0.7,
        nlpAnalysis: null,
      };

      const startTime = Date.now();
      const result = await analyzer.analyzeFromInput(JSON.stringify(extremeArchitecture));
      const extremeTime = Date.now() - startTime;

      expect(result).toBeDefined();
      expect(result.components).toHaveLength(500);
      expect(extremeTime).toBeLessThan(30000); // Should complete in under 30 seconds
    });

    it('should recover from resource-intensive failures gracefully', async () => {
      // Test with malformed large data
      const malformedLargeData = {
        components: Array.from({ length: 100 }, (_, i) => ({
          name: i % 2 === 0 ? `Valid-${i}` : null,
          type: i % 3 === 0 ? 'compute' : null,
          isAWSService: i % 5 === 0 ? true : null,
        })),
        relationships: Array.from({ length: 50 }, (_, i) => ({
          source: i % 2 === 0 ? { name: `Source-${i}` } : null,
          target: i % 3 === 0 ? { name: `Target-${i}` } : null,
        })),
        patterns: [],
        requirements: [],
        constraints: [],
      };

      const result = await validationEngine.validate(malformedLargeData);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.pillarScores).toHaveLength(6);
    });
  });
});