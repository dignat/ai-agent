/**
 * Type Definitions
 *
 * Central location for all TypeScript interfaces and types
 */

export interface AWSComponent {
  id: string;
  name: string;
  type: string;
  description: string;
  isAWSService?: boolean;
}

export interface ArchitectureAnalysis {
  components: AWSComponent[];
  relationships: any[];
  patterns: string[];
  requirements?: any[];
  constraints?: any[];
  bestPractices?: any[];
  validation?: {
    errors: any[];
    warnings: any[];
    suggestions: any[];
    confidence: number;
  };
  confidence?: number;
  nlpAnalysis?: {
    originalText?: string;
    entities?: {
      services: any[];
      components: any[];
    };
    intents?: {
      architecturalPatterns: any[];
      useCases: any[];
      constraints: any[];
    };
  } | null;
}

// NLP Module Types
export interface NLPEntity {
  name: string;
  type: string;
  description?: string;
  confidence: number;
}

export interface NLPIntent {
  pattern: string;
  category: string;
  confidence: number;
  services?: string[];
}

export interface NLPAnalysisResult {
  architecture: {
    name: string;
    description: string;
    type: string;
    components: any[];
    services: any[];
    relationships: any[];
    requirements: any[];
    patterns: any[];
    constraints: any[];
    bestPractices: any[];
    useCases?: any[];
  };
  validation: {
    errors: any[];
    warnings: any[];
    suggestions: any[];
    confidence: number;
  };
  confidence: number;
}

// UUID module declaration
// declare module 'uuid';
