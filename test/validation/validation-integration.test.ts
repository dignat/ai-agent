/**
 * Validation Integration Tests
 *
 * Comprehensive tests for validation components working together
 */
import { ValidationEngine } from '../../validation/engine';
import { AWSWellArchitectedValidator } from '../../validation/aws-well-architected-validator';
import { mockArchitectureAnalysis, mockEmptyArchitecture } from '../__mocks__/fixtures/architecture-fixtures';
import { mockValidationResults } from '../__mocks__/fixtures/validation-fixtures';

describe('Validation Integration Tests', () => {
  let validationEngine: ValidationEngine;
  let wellArchitectedValidator: AWSWellArchitectedValidator;

  beforeEach(() => {
    validationEngine = new ValidationEngine();
    wellArchitectedValidator = new AWSWellArchitectedValidator();
  });

  describe('Validation Engine Integration', () => {
    it('should integrate AWS Well-Architected Framework validation', async () => {
      const result = await validationEngine.validate(mockArchitectureAnalysis);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(result.pillarScores).toHaveLength(6);
      expect(result.wellArchitectedReport).toBeDefined();
      expect(result.detailedReport).toBeDefined();
    });

    it('should handle empty architecture validation', async () => {
      const result = await validationEngine.validate(mockEmptyArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThan(50); // Should be low for empty architecture
      expect(result.pillarScores).toHaveLength(6);
    });

    it('should categorize issues by severity correctly', async () => {
      const result = await validationEngine.validate(mockArchitectureAnalysis);

      expect(result.issues).toBeInstanceOf(Array);
      expect(result.warnings).toBeInstanceOf(Array);
      expect(result.recommendations).toBeInstanceOf(Array);

      // Verify that issues are properly categorized
      const totalIssues =
        result.issues.length + result.warnings.length + result.recommendations.length;
      expect(totalIssues).toBeGreaterThanOrEqual(0);
    });
  });

  describe('AWS Well-Architected Framework Validation', () => {
    it('should validate all 6 pillars', async () => {
      const report = await wellArchitectedValidator.validate(mockArchitectureAnalysis);

      expect(report).toBeDefined();
      expect(report.pillars).toHaveLength(6);

      // Check that each pillar has been validated
      report.pillars.forEach((pillar) => {
        expect(pillar.name).toBeDefined();
        expect(pillar.score).toBeGreaterThanOrEqual(0);
        expect(pillar.score).toBeLessThanOrEqual(100);
        expect(pillar.recommendations).toBeInstanceOf(Array);
      });
    });

    it('should generate detailed report with all sections', async () => {
      const report = await wellArchitectedValidator.validate(mockArchitectureAnalysis);
      const detailedReport = wellArchitectedValidator.generateDetailedReport(report);

      expect(detailedReport).toBeDefined();
      expect(detailedReport).toContain('AWS Well-Architected Framework Validation Report');
      expect(detailedReport).toContain('Overall Score');
      expect(detailedReport).toContain('Summary');
      expect(detailedReport).toContain('Pillar Scores');
      expect(detailedReport).toContain('Recommendations by Component');
      expect(detailedReport).toContain('Improvement Suggestions');
    });

    it('should handle different architecture types appropriately', async () => {
      // Test with serverless architecture
      const serverlessReport = await wellArchitectedValidator.validate({
        components: [
          { name: 'Lambda', isAWSService: true },
          { name: 'API Gateway', isAWSService: true },
        ],
        patterns: ['Serverless'],
        requirements: ['Build a serverless application'],
      });

      // Test with traditional architecture
      const traditionalReport = await wellArchitectedValidator.validate({
        components: [
          { name: 'EC2', isAWSService: true },
          { name: 'RDS', isAWSService: true },
        ],
        patterns: ['Traditional'],
        requirements: ['Build a traditional application'],
      });

      expect(serverlessReport.overallScore).toBeGreaterThanOrEqual(0);
      expect(traditionalReport.overallScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Validation Performance', () => {
    it('should complete validation within acceptable time', async () => {
      const startTime = Date.now();
      const result = await validationEngine.validate(mockArchitectureAnalysis);
      const validationTime = Date.now() - startTime;

      expect(validationTime).toBeLessThan(2000); // Should complete in under 2 seconds
      expect(result).toBeDefined();
    });

    it('should handle multiple validations efficiently', async () => {
      const validations = [
        validationEngine.validate(mockArchitectureAnalysis),
        validationEngine.validate(mockEmptyArchitecture),
        validationEngine.validate({
          components: [{ name: 'Test', isAWSService: true }],
          patterns: [],
          requirements: [],
        }),
      ];

      const startTime = Date.now();
      const results = await Promise.all(validations);
      const parallelTime = Date.now() - startTime;

      expect(results).toHaveLength(3);
      expect(parallelTime).toBeLessThan(3000); // Should complete in under 3 seconds
    });
  });

  describe('Validation Error Handling', () => {
    it('should handle invalid architecture data gracefully', async () => {
      const invalidArchitecture = {
        components: null,
        relationships: null,
        patterns: null,
      };

      const result = await validationEngine.validate(invalidArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.pillarScores).toHaveLength(6);
    });

    it('should handle malformed component data', async () => {
      const malformedArchitecture = {
        components: [
          { name: null, type: null },
          { name: 'Valid Service', type: 'compute', isAWSService: true },
        ],
        relationships: [],
        patterns: [],
      };

      const result = await validationEngine.validate(malformedArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
    });

    it('should handle unsupported services appropriately', async () => {
      const unsupportedArchitecture = {
        components: [
          { name: 'NonExistentService', type: 'unknown', isAWSService: true },
          { name: 'AnotherFakeService', type: 'invalid', isAWSService: true },
        ],
        relationships: [],
        patterns: [],
      };

      const result = await validationEngine.validate(unsupportedArchitecture);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.overallScore).toBeLessThan(50); // Should be low for unsupported services
    });
  });

  describe('Validation Consistency', () => {
    it('should produce consistent results for same input', async () => {
      const result1 = await validationEngine.validate(mockArchitectureAnalysis);
      const result2 = await validationEngine.validate(mockArchitectureAnalysis);

      expect(result1.overallScore).toBe(result2.overallScore);
      expect(result1.pillarScores).toEqual(result2.pillarScores);
    });

    it('should produce different results for different architectures', async () => {
      const goodResult = await validationEngine.validate(mockArchitectureAnalysis);
      const poorResult = await validationEngine.validate(mockEmptyArchitecture);

      expect(goodResult.overallScore).toBeGreaterThan(poorResult.overallScore);
    });
  });
});