/**
 * Input Parser - Main Entry Point
 *
 * Handles parsing of JSON and YAML architecture input files
 * and converts them to the unified architecture data model
 */

import { JSONParser } from './json-parser';
import { YAMLParser } from './yaml-parser';
import { InputParserError } from './parser-error';
import { ArchitectureInput, UnifiedArchitectureData } from './types';

export class InputParser {
  private jsonParser: JSONParser;
  private yamlParser: YAMLParser;

  constructor() {
    this.jsonParser = new JSONParser();
    this.yamlParser = new YAMLParser();
  }

  /**
   * Parse input from file content
   * @param content File content as string
   * @param format 'json' or 'yaml'
   * @returns Unified architecture data model
   */
  async parse(content: string, format: 'json' | 'yaml'): Promise<UnifiedArchitectureData> {
    try {
      if (format === 'json') {
        return await this.jsonParser.parse(content);
      } else if (format === 'yaml') {
        return await this.yamlParser.parse(content);
      } else {
        throw new InputParserError(`Unsupported format: ${format}`);
      }
    } catch (error) {
      if (error instanceof InputParserError) {
        throw error;
      }
      throw new InputParserError(
        `Failed to parse ${format} input: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Auto-detect format and parse
   * @param content File content as string
   * @returns Unified architecture data model
   */
  async parseAuto(content: string): Promise<UnifiedArchitectureData> {
    try {
      // Try to detect format
      const trimmedContent = content.trim();

      if (trimmedContent.startsWith('{') || trimmedContent.startsWith('[')) {
        return await this.jsonParser.parse(trimmedContent);
      } else if (
        trimmedContent.startsWith('---') ||
        (trimmedContent.includes(':') && !trimmedContent.includes('":'))
      ) {
        return await this.yamlParser.parse(trimmedContent);
      } else {
        throw new InputParserError(
          'Could not auto-detect input format. Please specify format explicitly.',
        );
      }
    } catch (error) {
      if (error instanceof InputParserError) {
        throw error;
      }
      throw new InputParserError(
        `Auto-detection failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Convert between formats
   * @param data Architecture data
   * @param targetFormat 'json' or 'yaml'
   * @returns Converted content as string
   */
  async convert(data: UnifiedArchitectureData, targetFormat: 'json' | 'yaml'): Promise<string> {
    if (targetFormat === 'json') {
      return this.jsonParser.stringify(data);
    } else {
      return this.yamlParser.stringify(data);
    }
  }

  /**
   * Get parser for specific format
   */
  getParser(format: 'json' | 'yaml') {
    return format === 'json' ? this.jsonParser : this.yamlParser;
  }
}
