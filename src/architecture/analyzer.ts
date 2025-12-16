/**
 * Architecture Analyzer
 *
 * Analyzes AWS architecture components and relationships
 */
import { NLPProcessor } from '../nlp/index';
import { InputParser } from '../input-parser/index';
import { ArchitectureInput } from '../input-parser/types';

export class ArchitectureAnalyzer {
  private nlpProcessor: NLPProcessor;

  private inputParser: InputParser;

  constructor() {
    this.nlpProcessor = new NLPProcessor();
    this.inputParser = new InputParser();
  }

  /**
   * Analyze architecture with optional natural language requirements
   */
  async analyze(requirementsText?: string): Promise<any> {
    console.log('Analyzing AWS architecture components...');

    if (requirementsText) {
      console.log('Processing natural language requirements...');
      try {
        const nlpResult = await this.nlpProcessor.processRequirements(requirementsText);
        return this.convertNLPResultToAnalysis(nlpResult);
      } catch (error) {
        console.error('NLP Processing failed, falling back to basic analysis:', error);
        return this.basicAnalysis();
      }
    }

    return this.basicAnalysis();
  }

  /**
   * Convert NLP result to architecture analysis format
   */
  private convertNLPResultToAnalysis(nlpResult: any): any {
    const architecture = nlpResult.architecture;

    return {
      components: architecture.components.map((comp: any) => ({
        id: comp.id,
        name: comp.name,
        type: comp.type,
        description: comp.description || '',
        isAWSService: comp.isAWSService || false,
      })),
      relationships: architecture.relationships.map((rel: any) => ({
        type: rel.type,
        description: rel.description,
        confidence: rel.confidence,
      })),
      patterns: architecture.patterns.map((pattern: any) => ({
        name: pattern.name,
        category: pattern.category,
        services: pattern.services,
      })),
      requirements: architecture.requirements,
      constraints: architecture.constraints,
      bestPractices: architecture.bestPractices,
      validation: nlpResult.validation,
      confidence: nlpResult.confidence,
      nlpAnalysis: {
        originalText: 'Processed via NLP',
        entities: {
          services: architecture.services,
          components: architecture.components,
        },
        intents: {
          architecturalPatterns: architecture.patterns,
          useCases: nlpResult.architecture.useCases || [],
          constraints: architecture.constraints,
        },
      },
    };
  }

  /**
   * Basic analysis without NLP
   */
  private basicAnalysis(): any {
    return {
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
        confidence: 0.3,
      },
      confidence: 0.3,
      nlpAnalysis: null,
    };
  }

  /**
   * Get NLP processor for direct access
   */
  getNLPProcessor(): NLPProcessor {
    return this.nlpProcessor;
  }

  /**
   * Get input parser for direct access
   */
  getInputParser(): InputParser {
    return this.inputParser;
  }

  /**
   * Analyze architecture from JSON input
   */
  async analyzeFromJson(jsonContent: string): Promise<any> {
    try {
      const parsedData = await this.inputParser.parse(jsonContent, 'json');
      return this.enrichAnalysisWithNLP(parsedData);
    } catch (error) {
      console.error('JSON parsing failed:', error);
      return this.basicAnalysis();
    }
  }

  /**
   * Analyze architecture from YAML input
   */
  async analyzeFromYaml(yamlContent: string): Promise<any> {
    try {
      const parsedData = await this.inputParser.parse(yamlContent, 'yaml');
      return this.enrichAnalysisWithNLP(parsedData);
    } catch (error) {
      console.error('YAML parsing failed:', error);
      return this.basicAnalysis();
    }
  }

  /**
   * Analyze architecture from auto-detected input format
   */
  async analyzeFromInput(content: string): Promise<any> {
    try {
      const parsedData = await this.inputParser.parseAuto(content);
      return this.enrichAnalysisWithNLP(parsedData);
    } catch (error) {
      console.error('Input parsing failed:', error);
      return this.basicAnalysis();
    }
  }

  /**
   * Enrich parsed analysis with NLP processing
   */
  private async enrichAnalysisWithNLP(parsedData: any): Promise<any> {
    // If we have requirements text, process it with NLP
    if (parsedData.requirements && parsedData.requirements.length > 0) {
      const requirementsText = parsedData.requirements.join(' ');
      try {
        const nlpResult = await this.nlpProcessor.processRequirements(requirementsText);
        return this.convertNLPResultToAnalysis(nlpResult);
      } catch (error) {
        console.log('NLP enrichment failed, using parsed data:', error);
      }
    }

    // Return the parsed data with some additional processing
    return {
      ...parsedData,
      confidence: parsedData.confidence || 0.85,
      validation: parsedData.validation || {
        errors: [],
        warnings: [],
        suggestions: [],
        confidence: 0.85,
      },
    };
  }
}
