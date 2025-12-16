/**
 * Documentation Generation Error
 *
 * Custom error class for documentation generation failures
 */
export class DocumentationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentationError';
    Object.setPrototypeOf(this, DocumentationError.prototype);
  }
}
