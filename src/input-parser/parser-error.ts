/**
 * Input Parser Error
 *
 * Custom error class for input parsing errors
 */

export class InputParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputParserError';
  }

  /**
   * Create error for invalid JSON
   */
  static invalidJson(error: Error): InputParserError {
    return new InputParserError(`Invalid JSON: ${error.message}`);
  }

  /**
   * Create error for invalid YAML
   */
  static invalidYaml(error: Error): InputParserError {
    return new InputParserError(`Invalid YAML: ${error.message}`);
  }

  /**
   * Create error for schema validation failure
   */
  static validationFailed(errors: string[]): InputParserError {
    return new InputParserError(`Schema validation failed: ${errors.join(', ')}`);
  }

  /**
   * Create error for unsupported format
   */
  static unsupportedFormat(format: string): InputParserError {
    return new InputParserError(`Unsupported format: ${format}`);
  }

  /**
   * Create error for missing required field
   */
  static missingRequiredField(field: string): InputParserError {
    return new InputParserError(`Missing required field: ${field}`);
  }
}
