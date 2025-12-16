/**
 * Input Parser Tests
 *
 * Unit tests for JSON/YAML input parsing functionality
 */

import { InputParser } from './index';
import { InputParserError } from './parser-error';
import { ArchitectureInput } from './types';

describe('InputParser', () => {
  let inputParser: InputParser;

  beforeEach(() => {
    inputParser = new InputParser();
  });

  describe('JSON Parsing', () => {
    it('should parse valid JSON input', async () => {
      const jsonContent = `
        {
          "name": "Test Architecture",
          "description": "A test architecture",
          "components": [
            {
              "name": "Lambda",
              "type": "compute",
              "isAWSService": true
            }
          ]
        }
      `;

      const result = await inputParser.parse(jsonContent, 'json');
      expect(result).toBeDefined();
      expect(result.inputFormat).toBe('json');
      expect(result.components).toHaveLength(1);
      expect(result.components[0].name).toBe('Lambda');
    });

    it('should throw error for invalid JSON', async () => {
      const invalidJson = '{ "name": "Test", "invalid": }';

      await expect(inputParser.parse(invalidJson, 'json')).rejects.toThrow(InputParserError);
    });
  });

  describe('YAML Parsing', () => {
    it('should parse valid YAML input', async () => {
      const yamlContent = `
        name: Test Architecture
        description: A test architecture
        components:
          - name: Lambda
            type: compute
            isAWSService: true
      `;

      const result = await inputParser.parse(yamlContent, 'yaml');
      expect(result).toBeDefined();
      expect(result.inputFormat).toBe('yaml');
      expect(result.components).toHaveLength(1);
      expect(result.components[0].name).toBe('Lambda');
    });

    it('should throw error for invalid YAML', async () => {
      const invalidYaml = `
        name: Test Architecture
        components:
          - name: Lambda
            type: compute
            invalid: [unclosed array
      `;

      await expect(inputParser.parse(invalidYaml, 'yaml')).rejects.toThrow(InputParserError);
    });
  });

  describe('Auto-detection', () => {
    it('should auto-detect JSON format', async () => {
      const jsonContent = '{"name": "Test", "components": []}';
      const result = await inputParser.parseAuto(jsonContent);
      expect(result.inputFormat).toBe('json');
    });

    it('should auto-detect YAML format', async () => {
      const yamlContent = 'name: Test\ncomponents: []';
      const result = await inputParser.parseAuto(yamlContent);
      expect(result.inputFormat).toBe('yaml');
    });

    it('should throw error when format cannot be detected', async () => {
      const ambiguousContent = 'ambiguous content';

      await expect(inputParser.parseAuto(ambiguousContent)).rejects.toThrow(
        'Could not auto-detect input format',
      );
    });
  });

  describe('Format Conversion', () => {
    it('should convert between JSON and YAML', async () => {
      const jsonContent = '{"name": "Test", "components": [{"name": "S3", "type": "storage"}]}';

      // Parse JSON
      const parsed = await inputParser.parse(jsonContent, 'json');

      // Convert to YAML
      const yamlOutput = await inputParser.convert(parsed, 'yaml');
      expect(yamlOutput).toContain('name: Test');
      expect(yamlOutput).toContain('name: S3');

      // Convert back to JSON
      const jsonOutput = await inputParser.convert(parsed, 'json');
      const jsonParsed = JSON.parse(jsonOutput);
      expect(jsonParsed.components).toBeDefined();
      expect(jsonParsed.components.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle unsupported format', async () => {
      const invalidFormat = 'xml';

      await expect(inputParser.parse('content', invalidFormat as any)).rejects.toThrow(
        'Unsupported format',
      );
    });

    it('should provide detailed error messages', async () => {
      const invalidJson = '{ invalid: json }';

      try {
        await inputParser.parse(invalidJson, 'json');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error).toBeInstanceOf(InputParserError);
        expect(error.message).toContain('Invalid JSON');
      }
    });
  });
});

describe('SchemaValidator', () => {
  it('should validate correct architecture input', () => {
    // This would be tested in a separate schema validator test file
  });
});

describe('TemplateManager', () => {
  it('should provide access to templates', () => {
    // This would be tested in a separate template manager test file
  });
});
