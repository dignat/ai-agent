/**
 * Mermaid Diagram Generator Tests
 *
 * Comprehensive unit tests for the MermaidDiagramGenerator class
 * Tests all diagram types, error handling, and customization options
 */

import { MermaidDiagramGenerator, DiagramOptions, DiagramResult } from './generator';
import { ArchitectureAnalysis, AWSComponent } from '../types/index';

describe('MermaidDiagramGenerator', () => {
  let generator: MermaidDiagramGenerator;
  let mockAnalysis: ArchitectureAnalysis;

  beforeEach(() => {
    generator = new MermaidDiagramGenerator();
    mockAnalysis = {
      components: [
        {
          id: '1',
          name: 'EC2 Instance',
          type: 'compute',
          description: 'Web server instance',
          isAWSService: true,
        },
        {
          id: '2',
          name: 'S3 Bucket',
          type: 'storage',
          description: 'Static asset storage',
          isAWSService: true,
        },
        {
          id: '3',
          name: 'Custom Component',
          type: 'custom',
          description: 'Custom application logic',
          isAWSService: false,
        },
      ],
      relationships: [
        {
          source: { name: 'EC2 Instance' },
          target: { name: 'S3 Bucket' },
          type: 'reads from',
          description: 'Reads static assets',
        },
        {
          source: { name: 'Custom Component' },
          target: { name: 'EC2 Instance' },
          type: 'deploys to',
          description: 'Deploys application code',
        },
      ],
      patterns: ['Serverless Architecture', 'Microservices'],
      requirements: [],
      constraints: [],
      bestPractices: [],
      validation: {
        errors: [],
        warnings: [],
        suggestions: [],
        confidence: 0.95,
      },
      confidence: 0.95,
      nlpAnalysis: null,
    };
  });

  describe('generateAllDiagrams', () => {
    it('should generate all diagram types successfully', async () => {
      const results = await generator.generateAllDiagrams(mockAnalysis);

      expect(results.length).toBe(4);
      expect(results.every((r) => r.success)).toBe(true);

      const diagramTypes = results.map((r) => r.type);
      expect(diagramTypes).toContain('component');
      expect(diagramTypes).toContain('data-flow');
      expect(diagramTypes).toContain('system-architecture');
      expect(diagramTypes).toContain('sequence');
    });

    it('should handle empty analysis gracefully', async () => {
      const emptyAnalysis = {
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

      const results = await generator.generateAllDiagrams(emptyAnalysis);

      expect(results.length).toBe(4);
      expect(results.every((r) => !r.success)).toBe(true);
      expect(results.every((r) => r.error?.includes('No components available'))).toBe(true);
    });

    it('should handle error during generation', async () => {
      // Mock a scenario that would cause an error
      const invalidAnalysis = {
        ...mockAnalysis,
        components: null as any,
      };

      const results = await generator.generateAllDiagrams(invalidAnalysis);
      // The current implementation generates all diagrams even with errors
      // This test should be updated to reflect the actual behavior
      expect(results.length).toBe(4);
      expect(results.some((r) => !r.success)).toBe(true);
    });
  });

  describe('generateComponentDiagram', () => {
    it('should generate valid component diagram', async () => {
      const result = await generator.generateComponentDiagram(mockAnalysis);

      expect(result.success).toBe(true);
      expect(result.type).toBe('component');
      expect(result.mermaidCode).toContain('componentDiagram');
      expect(result.mermaidCode).toContain('EC2_Instance');
      expect(result.mermaidCode).toContain('S3_Bucket');
      expect(result.mermaidCode).toContain('Custom_Component');
    });

    it('should include AWS icons when enabled', async () => {
      const options: DiagramOptions = { showIcons: true };
      const result = await generator.generateComponentDiagram(mockAnalysis, options);

      expect(result.mermaidCode).toContain('🖥️'); // EC2 icon
      expect(result.mermaidCode).toContain('💾'); // S3 icon
    });

    it('should exclude AWS icons when disabled', async () => {
      const options: DiagramOptions = { showIcons: false };
      const result = await generator.generateComponentDiagram(mockAnalysis, options);

      expect(result.mermaidCode).not.toContain('🖥️');
      expect(result.mermaidCode).not.toContain('💾');
    });

    it('should handle empty components', async () => {
      const emptyAnalysis = { ...mockAnalysis, components: [] };
      const result = await generator.generateComponentDiagram(emptyAnalysis);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No components available for diagram generation');
    });
  });

  describe('generateDataFlowDiagram', () => {
    it('should generate valid data flow diagram', async () => {
      const result = await generator.generateDataFlowDiagram(mockAnalysis);

      expect(result.success).toBe(true);
      expect(result.type).toBe('data-flow');
      expect(result.mermaidCode).toContain('flowchart');
      expect(result.mermaidCode).toContain('EC2_Instance');
      expect(result.mermaidCode).toContain('S3_Bucket');
    });

    it('should use correct layout direction', async () => {
      const options: DiagramOptions = { layoutDirection: 'LR' };
      const result = await generator.generateDataFlowDiagram(mockAnalysis, options);

      expect(result.mermaidCode).toContain('flowchart LR');
    });

    it('should handle empty components', async () => {
      const emptyAnalysis = { ...mockAnalysis, components: [] };
      const result = await generator.generateDataFlowDiagram(emptyAnalysis);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No components available for diagram generation');
    });
  });

  describe('generateSystemArchitectureDiagram', () => {
    it('should generate valid system architecture diagram', async () => {
      const result = await generator.generateSystemArchitectureDiagram(mockAnalysis);

      expect(result.success).toBe(true);
      expect(result.type).toBe('system-architecture');
      expect(result.mermaidCode).toContain('graph');
      expect(result.mermaidCode).toContain('EC2_Instance');
      expect(result.mermaidCode).toContain('S3_Bucket');
    });

    it('should include architecture patterns', async () => {
      const result = await generator.generateSystemArchitectureDiagram(mockAnalysis);

      expect(result.mermaidCode).toContain('Serverless Architecture, Microservices');
    });

    it('should handle empty components', async () => {
      const emptyAnalysis = { ...mockAnalysis, components: [] };
      const result = await generator.generateSystemArchitectureDiagram(emptyAnalysis);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No components available for diagram generation');
    });
  });

  describe('generateSequenceDiagram', () => {
    it('should generate valid sequence diagram', async () => {
      const result = await generator.generateSequenceDiagram(mockAnalysis);

      expect(result.success).toBe(true);
      expect(result.type).toBe('sequence');
      expect(result.mermaidCode).toContain('sequenceDiagram');
      expect(result.mermaidCode).toContain('participant EC2_Instance');
      expect(result.mermaidCode).toContain('participant S3_Bucket');
    });

    it('should handle empty components', async () => {
      const emptyAnalysis = { ...mockAnalysis, components: [] };
      const result = await generator.generateSequenceDiagram(emptyAnalysis);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No components available for diagram generation');
    });
  });

  describe('Diagram Customization', () => {
    it('should apply theme options', async () => {
      const options: DiagramOptions = { theme: 'dark' };
      const result = await generator.generateComponentDiagram(mockAnalysis, options);

      expect(result.mermaidCode).toContain("'theme': 'dark'");
    });

    it('should apply layout direction', async () => {
      const options: DiagramOptions = { layoutDirection: 'LR' };
      const result = await generator.generateDataFlowDiagram(mockAnalysis, options);

      expect(result.mermaidCode).toContain('flowchart LR');
    });

    it('should show descriptions when enabled', async () => {
      const options: DiagramOptions = { showDescriptions: true };
      const result = await generator.generateComponentDiagram(mockAnalysis, options);

      expect(result.mermaidCode).toContain('Web server instance');
      expect(result.mermaidCode).toContain('Static asset storage');
    });

    it('should hide descriptions when disabled', async () => {
      const options: DiagramOptions = { showDescriptions: false };
      const result = await generator.generateComponentDiagram(mockAnalysis, options);

      expect(result.mermaidCode).not.toContain('Web server instance');
      expect(result.mermaidCode).not.toContain('Static asset storage');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid component data', async () => {
      const invalidAnalysis = {
        ...mockAnalysis,
        components: [{ name: null } as any],
      };

      const result = await generator.generateComponentDiagram(invalidAnalysis);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle invalid relationship data', async () => {
      const invalidAnalysis = {
        ...mockAnalysis,
        relationships: [{ source: null, target: null } as any],
      };

      const result = await generator.generateComponentDiagram(invalidAnalysis);
      expect(result.success).toBe(true); // Should still succeed with fallback component names
    });
  });

  describe('AWS Service Integration', () => {
    it('should correctly identify AWS services', async () => {
      const result = await generator.generateComponentDiagram(mockAnalysis);

      // Check that AWS services get proper styling
      expect(result.mermaidCode).toContain('fill:#FF9900'); // EC2 (compute)
      expect(result.mermaidCode).toContain('fill:#FF9900'); // S3 (storage)
    });

    it('should correctly identify non-AWS components', async () => {
      const result = await generator.generateComponentDiagram(mockAnalysis);

      // Custom components should have different styling
      expect(result.mermaidCode).toContain('fill:#f9f'); // Custom component color
    });
  });
});
