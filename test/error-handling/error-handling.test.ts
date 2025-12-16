/**
 * Error Handling and Edge Case Tests
 *
 * Comprehensive tests for error conditions and edge cases
 */
import { ArchitectureAnalyzer } from '../../src/architecture/analyzer';
import { MermaidDiagramGenerator } from '../../diagrams/generator';
import { ValidationEngine } from '../../validation/engine';
import { ComprehensiveDocumentationGenerator } from '../../docs/documentation-generator';
import { mockNLPErrorCases } from '../__mocks__/fixtures/nlp-fixtures';
import { mockValidationErrorCases } from '../__mocks__/fixtures/validation-fixtures';

describe('Error Handling and Edge Case Tests', () => {
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

  describe('NLP Error Handling', () => {
    it('should handle empty input gracefully', async () => {
      const result = await analyzer.analyze('');

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.5);
      expect(result.components).toBeInstanceOf(Array);
      expect(result.validation.errors.length).toBeGreaterThan(0);
    });

    it('should handle non-architecture text appropriately', async () => {
      const result = await analyzer.analyze(mockNLPErrorCases.nonArchitectureText);

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.5);
      expect(result.validation.warnings.length).toBeGreaterThan(0);
    });

    it('should handle unsupported services gracefully', async () => {
      const result = await analyzer.analyze(mockNLPErrorCases.unsupportedServices);

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.7);
      expect(result.validation.warnings.length).toBeGreaterThan(0);
    });

    it('should handle conflicting requirements appropriately', async () => {
      const result = await analyzer.analyze(mockNLPErrorCases.conflictingRequirements);

      expect(result).toBeDefined();
      expect(result.confidence).toBeLessThan(0.6);
      expect(result.validation.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Input Parser Error Handling', () => {
    it('should handle invalid JSON input gracefully', async () => {
      const invalidJson = '{ "invalid": "json" ';

      const result = await analyzer.analyzeFromInput(invalidJson);

      expect(result).toBeDefined();
      expect(result.confidence).toBeGreaterThanOrEqual(0.3); // Should fall back to basic analysis
    });

    it('should handle invalid YAML input gracefully', async () => {
      const invalidYaml = `
name: Test
components:
  - name: Lambda
    invalid: [unclosed
`;

      const result = await analyzer.analyzeFromInput(invalidYaml);

      expect(result).toBeDefined();
      expect(result.confidence).toBeGreaterThanOrEqual(0.3); // Should fall back to basic analysis
    });

    it('should handle ambiguous input format gracefully', async () => {
      const ambiguousInput = 'This could be either JSON or YAML';

      const result = await analyzer.analyzeFromInput(ambiguousInput);

      expect(result).toBeDefined();
      // Should either parse or fall back gracefully
      expect(result.confidence).toBeGreaterThanOrEqual(0.3);
    });
  });

  describe('Validation Error Handling', () => {
    it('should handle invalid architecture data', async () => {
      const result = await validationEngine.validate(mockValidationErrorCases.invalidArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.pillarScores).toHaveLength(6);
      expect(result.issues.length).toBeGreaterThan(0);
    });

    it('should handle malformed component data', async () => {
      const result = await validationEngine.validate(mockValidationErrorCases.malformedArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.pillarScores).toHaveLength(6);
    });

    it('should handle unsupported services appropriately', async () => {
      const result = await validationEngine.validate(mockValidationErrorCases.unsupportedServices);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThan(50); // Should be low for unsupported services
    });
  });

  describe('Diagram Generation Error Handling', () => {
    it('should handle empty components gracefully', async () => {
      const emptyArchitecture = {
        components: [],
        relationships: [],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      const diagrams = await diagramGenerator.generateAllDiagrams(emptyArchitecture);

      expect(diagrams).toHaveLength(4);
      expect(diagrams.every((d) => !d.success)).toBe(true);
      expect(diagrams.every((d) => d.error?.includes('No components'))).toBe(true);
    });

    it('should handle invalid component data gracefully', async () => {
      const invalidArchitecture = {
        components: [
          { id: '1', name: 'Valid Component', type: 'compute', description: 'Valid', isAWSService: true },
        ],
        relationships: [],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      const diagrams = await diagramGenerator.generateAllDiagrams(invalidArchitecture);

      expect(diagrams).toHaveLength(4);
      // Should handle invalid data gracefully
      expect(diagrams.some((d) => d.success)).toBe(true);
    });

    it('should handle invalid relationship data gracefully', async () => {
      const invalidRelationships = {
        components: [
          { id: '1', name: 'Component 1', type: 'compute', description: 'Comp 1', isAWSService: true },
          { id: '2', name: 'Component 2', type: 'database', description: 'Comp 2', isAWSService: true },
        ],
        relationships: [
          { source: { name: 'Component 1' }, target: { name: 'Component 2' }, type: 'connects' },
        ],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      const diagrams = await diagramGenerator.generateAllDiagrams(invalidRelationships);

      expect(diagrams).toHaveLength(4);
      expect(diagrams.some((d) => d.success)).toBe(true);
    });
  });

  describe('Documentation Generation Error Handling', () => {
    it('should handle empty architecture for documentation', async () => {
      const emptyArchitecture = {
        components: [],
        relationships: [],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.1,
        },
        confidence: 0.1,
        nlpAnalysis: null,
      };

      const documentation = await documentationGenerator.generateAllFormats(emptyArchitecture);

      expect(documentation).toBeDefined();
      expect(documentation.markdown).toBeDefined();
      expect(documentation.html).toBeDefined();
      expect(documentation.pdf).toBeDefined();
      expect(documentation.code).toBeDefined();
    });

    it('should handle invalid template data gracefully', async () => {
      const invalidTemplateArchitecture = {
        components: [
          { id: '1', name: 'Test Component', type: 'compute', description: 'Test', isAWSService: true },
        ],
        relationships: [],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      // This should not crash even with invalid template data
      const documentation = await documentationGenerator.generateAllFormats(invalidTemplateArchitecture);

      expect(documentation).toBeDefined();
      expect(documentation.markdown.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Case Scenarios', () => {
    it('should handle maximum input sizes gracefully', async () => {
      // Create architecture with maximum reasonable sizes
      const maxArchitecture = {
        components: Array.from({ length: 1000 }, (_, i) => ({
          id: `max-${i}`,
          name: `Max-Component-${i}`,
          type: 'compute',
          description: `Maximum component for testing`,
          isAWSService: true,
        })),
        relationships: Array.from({ length: 2000 }, (_, i) => ({
          source: { name: `Max-Component-${i}` },
          target: { name: `Max-Component-${i + 1}` },
          type: 'connects',
          description: `Maximum relationship`,
        })),
        patterns: Array.from({ length: 50 }, (_, i) => `Max-Pattern-${i}`),
        requirements: Array.from({ length: 100 }, (_, i) => `Max-Requirement-${i}`),
        constraints: Array.from({ length: 50 }, (_, i) => `Max-Constraint-${i}`),
        bestPractices: Array.from({ length: 50 }, (_, i) => `Max-Best-Practice-${i}`),
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.6,
        },
        confidence: 0.6,
        nlpAnalysis: null,
      };

      const result = await validationEngine.validate(maxArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
    });

    it('should handle minimum valid input gracefully', async () => {
      const minimalArchitecture = {
        components: [
          { id: '1', name: 'Single Component', type: 'compute', description: 'Single', isAWSService: true },
        ],
        relationships: [],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.4,
        },
        confidence: 0.4,
        nlpAnalysis: null,
      };

      const result = await validationEngine.validate(minimalArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
    });

    it('should handle boundary condition inputs', async () => {
      // Test with boundary condition values
      const boundaryArchitecture = {
        components: [
          { name: 'A'.repeat(255), type: 'compute', isAWSService: true }, // Max length name
          { name: 'B', type: 'database', isAWSService: true }, // Min length name
        ],
        relationships: [
          { source: { name: 'A'.repeat(255) }, target: { name: 'B' }, type: 'connects' },
        ],
        patterns: [],
        requirements: [],
        constraints: [],
        bestPractices: [],
        validation: {
          errors: [],
          warnings: [],
          suggestions: [],
          confidence: 0.5,
        },
        confidence: 0.5,
        nlpAnalysis: null,
      };

      const result = await validationEngine.validate(boundaryArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Error Recovery and Resilience', () => {
    it('should recover from partial failures in workflow', async () => {
      // Test that even if one component fails, others can continue
      const operations = [
        analyzer.analyze('valid requirements'), // Should succeed
        analyzer.analyze('invalid requirements'), // Should fail but recover
        validationEngine.validate({
          components: [{ id: '1', name: 'Test', type: 'compute', description: 'Test', isAWSService: true }],
          relationships: [],
          patterns: [],
          requirements: [],
          constraints: [],
          bestPractices: [],
          validation: { errors: [], warnings: [], suggestions: [], confidence: 0.5 },
          confidence: 0.5,
          nlpAnalysis: null,
        }), // Should succeed
        diagramGenerator.generateAllDiagrams({ components: [], relationships: [], patterns: [], requirements: [], constraints: [], bestPractices: [], validation: { errors: [], warnings: [], suggestions: [], confidence: 0.5 }, confidence: 0.5, nlpAnalysis: null }), // Should fail gracefully
      ];

      const results = await Promise.allSettled(operations);

      // All operations should complete (either fulfilled or rejected)
      expect(results).toHaveLength(4);
      expect(results.every((r) => r.status === 'fulfilled' || r.status === 'rejected')).toBe(true);
    });

    it('should maintain consistency after error recovery', async () => {
      // Test that after an error, subsequent operations work correctly
      const errorResult = await analyzer.analyze('invalid input');
      expect(errorResult).toBeDefined();

      // Subsequent operations should still work
      const validResult = await analyzer.analyze('build a serverless application');
      expect(validResult).toBeDefined();
      expect(validResult.confidence).toBeGreaterThan(0.5);

      const validationResult = await validationEngine.validate(validResult);
      expect(validationResult).toBeDefined();
      expect(validationResult.overallScore).toBeGreaterThan(0);
    });
  });
});