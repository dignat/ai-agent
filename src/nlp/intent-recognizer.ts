/**
 * Intent Recognizer
 *
 * Recognizes architectural intents and patterns from natural language requirements
 */

import { ArchitecturalPatterns } from './patterns-library';

export class IntentRecognizer {
  private patternsLibrary: ArchitecturalPatterns;

  constructor() {
    this.patternsLibrary = new ArchitecturalPatterns();
  }

  /**
   * Recognize intents from requirements text
   */
  recognizeIntents(text: string, entities: any): any {
    const intents: any = {
      architecturalPatterns: [],
      useCases: [],
      constraints: [],
      bestPractices: [],
    };

    // Analyze text for architectural patterns
    this.analyzeArchitecturalPatterns(text, intents);

    // Extract use cases and constraints
    this.extractUseCases(text, intents);
    this.extractConstraints(text, intents);

    // Identify best practices and anti-patterns
    this.identifyBestPractices(text, intents);

    return intents;
  }

  /**
   * Analyze text for architectural patterns
   */
  private analyzeArchitecturalPatterns(text: string, intents: any): void {
    const patterns = this.patternsLibrary.getPatterns();
    const normalizedText = text.toLowerCase();

    // Check for specific pattern mentions
    for (const category in patterns) {
      for (const pattern of patterns[category].patterns) {
        // Check if pattern name or description is mentioned
        if (
          normalizedText.includes(pattern.name.toLowerCase()) ||
          pattern.description
            .toLowerCase()
            .split(' ')
            .some((word: string) => normalizedText.includes(word))
        ) {
          intents.architecturalPatterns.push({
            pattern: pattern.name,
            category: patterns[category].name,
            confidence: 0.85,
            services: pattern.services,
          });
        }
      }
    }

    // Check for common architectural keywords
    const architecturalKeywords = [
      { keyword: 'serverless', pattern: 'serverless' },
      { keyword: 'microservices', pattern: 'microservices' },
      { keyword: 'event-driven', pattern: 'event-driven' },
      { keyword: 'monolithic', pattern: 'monolithic' },
      { keyword: 'multi-tier', pattern: 'multi-tier' },
      { keyword: 'hybrid', pattern: 'hybrid' },
      { keyword: 'data lake', pattern: 'data lake' },
      { keyword: 'real-time', pattern: 'real-time' },
    ];

    for (const keyword of architecturalKeywords) {
      if (normalizedText.includes(keyword.keyword)) {
        intents.architecturalPatterns.push({
          pattern: keyword.pattern,
          category: 'keyword-based',
          confidence: 0.75,
        });
      }
    }
  }

  /**
   * Extract use cases from text
   */
  private extractUseCases(text: string, intents: any): void {
    const useCasePatterns = [
      { pattern: /(web application|website|frontend)/i, type: 'web-application' },
      { pattern: /(api|rest api|graphql|endpoint)/i, type: 'api' },
      { pattern: /(data processing|etl|analytics)/i, type: 'data-processing' },
      { pattern: /(machine learning|ml|ai)/i, type: 'machine-learning' },
      { pattern: /(iot|device|sensor)/i, type: 'iot' },
      { pattern: /(mobile app|android|ios)/i, type: 'mobile' },
      { pattern: /(batch processing|scheduled job)/i, type: 'batch-processing' },
      { pattern: /(real-time|streaming|live)/i, type: 'real-time' },
    ];

    for (const patternObj of useCasePatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        intents.useCases.push({
          type: patternObj.type,
          description: matches[0],
          confidence: 0.8,
        });
      }
    }
  }

  /**
   * Extract constraints from text
   */
  private extractConstraints(text: string, intents: any): void {
    const constraintPatterns = [
      { pattern: /(budget of [\$\d]+|cost limit|low cost)/i, type: 'cost' },
      { pattern: /(latency < \d+ms|fast|low latency)/i, type: 'performance' },
      { pattern: /(uptime \d+%|high availability|sla)/i, type: 'availability' },
      { pattern: /(compliance with|must comply|regulation)/i, type: 'compliance' },
      { pattern: /(security requirement|must be secure)/i, type: 'security' },
      { pattern: /(scalability requirement|must scale)/i, type: 'scalability' },
      { pattern: /(deadline|must be completed by)/i, type: 'timeline' },
    ];

    for (const patternObj of constraintPatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        intents.constraints.push({
          type: patternObj.type,
          description: matches[0],
          confidence: 0.85,
        });
      }
    }
  }

  /**
   * Identify best practices and anti-patterns
   */
  private identifyBestPractices(text: string, intents: any): void {
    const bestPracticePatterns = [
      { pattern: /(well-architected|aws best practice)/i, type: 'well-architected' },
      { pattern: /(least privilege|minimal permissions)/i, type: 'security-best-practice' },
      { pattern: /(multi-az|high availability)/i, type: 'availability-best-practice' },
      { pattern: /(infrastructure as code|iac|cloudformation)/i, type: 'iac-best-practice' },
      { pattern: /(tagging strategy|resource tags)/i, type: 'tagging-best-practice' },
      { pattern: /(monitoring|cloudwatch|logging)/i, type: 'observability-best-practice' },
    ];

    const antiPatternPatterns = [
      { pattern: /(over-provisioning|fixed capacity)/i, type: 'over-provisioning' },
      { pattern: /(tight coupling|monolithic)/i, type: 'tight-coupling' },
      { pattern: /(no backup|single region)/i, type: 'no-backup' },
      { pattern: /(complexity without need)/i, type: 'over-engineering' },
    ];

    // Check for best practices
    for (const patternObj of bestPracticePatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        intents.bestPractices.push({
          type: patternObj.type,
          description: matches[0],
          isBestPractice: true,
          confidence: 0.9,
        });
      }
    }

    // Check for anti-patterns
    for (const patternObj of antiPatternPatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        intents.bestPractices.push({
          type: patternObj.type,
          description: matches[0],
          isBestPractice: false,
          confidence: 0.85,
        });
      }
    }
  }
}
