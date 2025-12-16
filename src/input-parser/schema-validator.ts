/**
 * Schema Validator
 *
 * Validates architecture input against JSON Schema
 */

import Ajv from 'ajv';
import { InputParserError } from './parser-error';
import { ArchitectureInput } from './types';

export class SchemaValidator {
  private ajv: Ajv;
  private schema: any;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false,
    });

    // Define the JSON schema for architecture input
    this.schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        type: { type: 'string' },
        components: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string', minLength: 1 },
              type: { type: 'string', minLength: 1 },
              description: { type: 'string' },
              isAWSService: { type: 'boolean' },
              configuration: { type: 'object' },
            },
            required: ['name', 'type'],
          },
        },
        relationships: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              source: { type: 'string', minLength: 1 },
              target: { type: 'string', minLength: 1 },
              type: { type: 'string', minLength: 1 },
              description: { type: 'string' },
              configuration: { type: 'object' },
            },
            required: ['source', 'target', 'type'],
          },
        },
        patterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', minLength: 1 },
              category: { type: 'string' },
              services: {
                type: 'array',
                items: { type: 'string' },
              },
              description: { type: 'string' },
            },
            required: ['name'],
          },
        },
        requirements: {
          type: 'array',
          items: { type: 'string', minLength: 1 },
        },
        constraints: {
          type: 'array',
          items: { type: 'string', minLength: 1 },
        },
        bestPractices: {
          type: 'array',
          items: { type: 'string', minLength: 1 },
        },
        useCases: {
          type: 'array',
          items: { type: 'string', minLength: 1 },
        },
        metadata: { type: 'object' },
      },
      additionalProperties: false,
    };
  }

  /**
   * Validate input data against schema
   */
  validate(input: ArchitectureInput): { isValid: boolean; errors: string[] } {
    try {
      const validate = this.ajv.compile(this.schema);
      const isValid = validate(input);

      if (isValid) {
        return { isValid: true, errors: [] };
      } else {
        const errors = validate.errors?.map((error) => {
          const instancePath = error.instancePath ? error.instancePath + ' ' : '';
          return `${instancePath}${error.message || 'Invalid value'}`;
        }) || ['Validation failed'];

        return { isValid: false, errors };
      }
    } catch (error) {
      throw new InputParserError(
        `Schema validation error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Validate with custom schema
   */
  validateWithCustomSchema(input: any, customSchema: any): { isValid: boolean; errors: string[] } {
    try {
      const validate = this.ajv.compile(customSchema);
      const isValid = validate(input);

      if (isValid) {
        return { isValid: true, errors: [] };
      } else {
        const errors = validate.errors?.map((error) => {
          const instancePath = error.instancePath ? error.instancePath + ' ' : '';
          return `${instancePath}${error.message || 'Invalid value'}`;
        }) || ['Validation failed'];

        return { isValid: false, errors };
      }
    } catch (error) {
      throw new InputParserError(
        `Custom schema validation error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Get validation errors as formatted string
   */
  formatValidationErrors(errors: string[]): string {
    return errors.map((error, index) => `${index + 1}. ${error}`).join('\n');
  }
}
