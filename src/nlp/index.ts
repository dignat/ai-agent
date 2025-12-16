/**
 * AWS Architecture NLP Processor
 *
 * Main entry point for natural language processing functionality
 * Handles parsing, entity extraction, intent recognition, and requirements analysis
 */

import { EntityExtractor } from './entity-extractor';
import { IntentRecognizer } from './intent-recognizer';
import { RequirementsAnalyzer } from './requirements-analyzer';
import { NLPErrorHandler } from './error-handler';
import { AWSServiceCatalog } from './service-catalog';
import { ArchitecturalPatterns } from './patterns-library';

export class NLPProcessor {
  private entityExtractor: EntityExtractor;
  private intentRecognizer: IntentRecognizer;
  private requirementsAnalyzer: RequirementsAnalyzer;
  private errorHandler: NLPErrorHandler;
  private serviceCatalog: AWSServiceCatalog;
  private patternsLibrary: ArchitecturalPatterns;

  constructor() {
    this.entityExtractor = new EntityExtractor();
    this.intentRecognizer = new IntentRecognizer();
    this.requirementsAnalyzer = new RequirementsAnalyzer();
    this.errorHandler = new NLPErrorHandler();
    this.serviceCatalog = new AWSServiceCatalog();
    this.patternsLibrary = new ArchitecturalPatterns();
  }

  /**
   * Process natural language requirements and return structured architecture data
   * @param requirementsText Natural language requirements
   * @returns Structured architecture analysis
   */
  async processRequirements(requirementsText: string): Promise<any> {
    try {
      // Step 1: Extract entities (AWS services, components, relationships)
      const entities = this.entityExtractor.extractEntities(requirementsText);

      // Step 2: Recognize architectural intents and patterns
      const intents = this.intentRecognizer.recognizeIntents(requirementsText, entities);

      // Step 3: Analyze requirements and convert to structured data
      const structuredData = this.requirementsAnalyzer.analyzeRequirements(
        requirementsText,
        entities,
        intents,
      );

      // Step 4: Validate and handle any errors
      const validatedData = this.errorHandler.validateAndHandleErrors(structuredData);

      return validatedData;
    } catch (error) {
      console.error('NLP Processing Error:', error);
      throw new Error(
        `Failed to process requirements: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Get available AWS services catalog
   */
  getServiceCatalog(): any {
    return this.serviceCatalog.getCatalog();
  }

  /**
   * Get architectural patterns library
   */
  getPatternsLibrary(): any {
    return this.patternsLibrary.getPatterns();
  }
}
