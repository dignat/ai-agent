/**
 * Input Parser Types
 *
 * Type definitions for architecture input parsing
 */

import { ArchitectureAnalysis } from '../../types/index';

export interface ArchitectureInput {
  /**
   * Architecture name
   */
  name?: string;

  /**
   * Architecture description
   */
  description?: string;

  /**
   * Architecture type (e.g., serverless, microservices, etc.)
   */
  type?: string;

  /**
   * Components in the architecture
   */
  components?: Array<{
    id?: string;
    name: string;
    type: string;
    description?: string;
    isAWSService?: boolean;
    configuration?: Record<string, any>;
  }>;

  /**
   * Relationships between components
   */
  relationships?: Array<{
    source: string;
    target: string;
    type: string;
    description?: string;
    configuration?: Record<string, any>;
  }>;

  /**
   * Architectural patterns
   */
  patterns?: Array<{
    name: string;
    category?: string;
    services?: string[];
    description?: string;
  }>;

  /**
   * Requirements for the architecture
   */
  requirements?: string[];

  /**
   * Constraints for the architecture
   */
  constraints?: string[];

  /**
   * Best practices to follow
   */
  bestPractices?: string[];

  /**
   * Use cases for the architecture
   */
  useCases?: string[];

  /**
   * Metadata about the architecture
   */
  metadata?: Record<string, any>;
}

export interface UnifiedArchitectureData extends ArchitectureAnalysis {
  /**
   * Original input format
   */
  inputFormat?: 'json' | 'yaml';

  /**
   * Source file information
   */
  source?: {
    fileName?: string;
    filePath?: string;
    format?: string;
  };

  /**
   * Raw input data (before processing)
   */
  rawInput?: any;

  /**
   * Processing metadata
   */
  processing?: {
    timestamp?: string;
    validation?: {
      isValid?: boolean;
      errors?: string[];
      warnings?: string[];
    };
  };
}

export interface ParserOptions {
  /**
   * Whether to validate input against schema
   */
  validate?: boolean;

  /**
   * Whether to apply default values
   */
  applyDefaults?: boolean;

  /**
   * Custom schema to use for validation
   */
  customSchema?: any;
}
