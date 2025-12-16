/**
 * YAML Parser
 *
 * Handles parsing of YAML architecture input files
 */

import * as yaml from 'js-yaml';
import { InputParserError } from './parser-error';
import { ArchitectureInput, UnifiedArchitectureData, ParserOptions } from './types';
import { ArchitectureAnalysis } from '../../types/index';

export class YAMLParser {
  /**
   * Parse YAML content
   */
  async parse(content: string, options: ParserOptions = {}): Promise<UnifiedArchitectureData> {
    try {
      // Parse YAML content
      const rawData = yaml.load(content);
      const inputData = rawData as ArchitectureInput;

      // Validate and transform the data
      const result = this.transformToUnifiedFormat(inputData, options);

      return {
        ...result,
        inputFormat: 'yaml',
        source: {
          format: 'yaml',
        },
        rawInput: rawData,
        processing: {
          timestamp: new Date().toISOString(),
          validation: {
            isValid: true,
            errors: [],
            warnings: [],
          },
        },
      };
    } catch (error) {
      if (error instanceof yaml.YAMLException) {
        throw InputParserError.invalidYaml(error);
      }
      throw new InputParserError(
        `YAML parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Convert unified data back to YAML
   */
  stringify(data: UnifiedArchitectureData): string {
    try {
      return yaml.dump(data, {
        indent: 2,
        lineWidth: -1, // Disable line wrapping
        noCompatMode: true,
      });
    } catch (error) {
      throw new InputParserError(
        `Failed to stringify YAML: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Transform architecture input to unified format
   */
  private transformToUnifiedFormat(
    input: ArchitectureInput,
    options: ParserOptions,
  ): ArchitectureAnalysis {
    // Apply defaults if enabled
    const processedInput = options.applyDefaults ? this.applyDefaults(input) : input;

    return {
      components:
        processedInput.components?.map((comp) => ({
          id: comp.id || this.generateId(comp.name),
          name: comp.name,
          type: comp.type,
          description: comp.description || '',
          isAWSService: comp.isAWSService || false,
        })) || [],

      relationships:
        processedInput.relationships?.map((rel) => ({
          type: rel.type,
          description: rel.description || '',
          confidence: 0.8, // Default confidence for parsed relationships
        })) || [],

      patterns: processedInput.patterns?.map((pattern) => pattern.name) || [],

      requirements: processedInput.requirements || [],
      constraints: processedInput.constraints || [],
      bestPractices: processedInput.bestPractices || [],

      validation: {
        errors: [],
        warnings: [],
        suggestions: [],
        confidence: 0.9, // High confidence for structured input
      },

      confidence: 0.9,
      nlpAnalysis: null,
    };
  }

  /**
   * Apply default values to input data
   */
  private applyDefaults(input: ArchitectureInput): ArchitectureInput {
    return {
      name: input.name || 'Unnamed Architecture',
      description: input.description || 'AWS architecture',
      type: input.type || 'general',
      components: input.components || [],
      relationships: input.relationships || [],
      patterns: input.patterns || [],
      requirements: input.requirements || [],
      constraints: input.constraints || [],
      bestPractices: input.bestPractices || [],
      useCases: input.useCases || [],
      metadata: input.metadata || {},
    };
  }

  /**
   * Generate ID for components
   */
  private generateId(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 4);
  }
}
