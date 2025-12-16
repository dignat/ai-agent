/**
 * Requirements Analyzer
 *
 * Converts natural language requirements to structured data for architecture design
 */

import { AWSServiceCatalog } from './service-catalog';
import { ArchitecturalPatterns } from './patterns-library';

export class RequirementsAnalyzer {
  private serviceCatalog: AWSServiceCatalog;
  private patternsLibrary: ArchitecturalPatterns;

  constructor() {
    this.serviceCatalog = new AWSServiceCatalog();
    this.patternsLibrary = new ArchitecturalPatterns();
  }

  /**
   * Analyze requirements and convert to structured data
   */
  analyzeRequirements(text: string, entities: any, intents: any): any {
    const structuredData: any = {
      architecture: {
        name: this.generateArchitectureName(text),
        description: this.generateArchitectureDescription(text),
        type: this.determineArchitectureType(entities, intents),
        components: [],
        services: [],
        relationships: [],
        requirements: [],
        patterns: [],
        constraints: [],
        bestPractices: [],
      },
      confidence: this.calculateOverallConfidence(entities, intents),
    };

    // Map entities to structured components
    this.mapEntitiesToComponents(entities, structuredData.architecture);

    // Map services to architecture
    this.mapServicesToArchitecture(entities, structuredData.architecture);

    // Map relationships
    this.mapRelationships(entities, structuredData.architecture);

    // Map requirements and constraints
    this.mapRequirements(entities, intents, structuredData.architecture);

    // Map architectural patterns
    this.mapPatterns(intents, structuredData.architecture);

    // Map best practices
    this.mapBestPractices(intents, structuredData.architecture);

    return structuredData;
  }

  /**
   * Generate architecture name based on requirements
   */
  private generateArchitectureName(text: string): string {
    const keywords = ['architecture', 'solution', 'system', 'platform', 'application'];
    const words = text
      .split(' ')
      .filter((word) => word.length > 3 && !keywords.includes(word.toLowerCase()));

    if (words.length > 0) {
      return `${words[0].charAt(0).toUpperCase() + words[0].slice(1)} Architecture`;
    }

    return 'AWS Architecture Solution';
  }

  /**
   * Generate architecture description
   */
  private generateArchitectureDescription(text: string): string {
    const sentences = text.split('.').filter((s) => s.trim().length > 10);
    if (sentences.length > 0) {
      return sentences[0].trim() + '.';
    }

    return 'AWS architecture solution based on provided requirements.';
  }

  /**
   * Determine architecture type
   */
  private determineArchitectureType(entities: any, intents: any): string {
    // Check for specific architectural patterns
    const serverlessPattern = intents.architecturalPatterns.find((p: any) =>
      p.pattern.toLowerCase().includes('serverless'),
    );

    const microservicesPattern = intents.architecturalPatterns.find((p: any) =>
      p.pattern.toLowerCase().includes('microservices'),
    );

    const eventDrivenPattern = intents.architecturalPatterns.find((p: any) =>
      p.pattern.toLowerCase().includes('event-driven'),
    );

    // Determine type based on patterns and entities
    if (serverlessPattern) {
      return 'Serverless Architecture';
    } else if (microservicesPattern) {
      return 'Microservices Architecture';
    } else if (eventDrivenPattern) {
      return 'Event-Driven Architecture';
    } else if (entities.services.some((s: any) => s.name === 'Lambda')) {
      return 'Serverless Architecture';
    } else if (entities.services.some((s: any) => s.name === 'ECS' || s.name === 'EKS')) {
      return 'Containerized Architecture';
    }

    return 'General AWS Architecture';
  }

  /**
   * Map entities to structured components
   */
  private mapEntitiesToComponents(entities: any, architecture: any): void {
    // Map AWS services
    for (const service of entities.services) {
      architecture.components.push({
        id: `comp-${service.name.toLowerCase()}`,
        name: service.name,
        type: service.type,
        description: service.description,
        isAWSService: true,
        confidence: service.confidence,
      });
    }

    // Map custom components
    for (const component of entities.components) {
      architecture.components.push({
        id: `comp-${component.name.toLowerCase().replace(' ', '-')}`,
        name: component.name,
        type: component.type,
        isAWSService: false,
        confidence: component.confidence,
      });
    }
  }

  /**
   * Map services to architecture
   */
  private mapServicesToArchitecture(entities: any, architecture: any): void {
    for (const service of entities.services) {
      architecture.services.push({
        serviceName: service.name,
        serviceType: service.type,
        description: service.description,
        confidence: service.confidence,
      });
    }
  }

  /**
   * Map relationships
   */
  private mapRelationships(entities: any, architecture: any): void {
    for (const relationship of entities.relationships) {
      architecture.relationships.push({
        type: relationship.type,
        description: relationship.description,
        confidence: relationship.confidence,
      });
    }
  }

  /**
   * Map requirements and constraints
   */
  private mapRequirements(entities: any, intents: any, architecture: any): void {
    // Map entity requirements
    for (const requirement of entities.requirements) {
      architecture.requirements.push({
        type: requirement.type,
        value: requirement.value,
        description: requirement.description,
        confidence: requirement.confidence,
      });
    }

    // Map intent constraints
    for (const constraint of intents.constraints) {
      architecture.constraints.push({
        type: constraint.type,
        description: constraint.description,
        confidence: constraint.confidence,
      });
    }
  }

  /**
   * Map architectural patterns
   */
  private mapPatterns(intents: any, architecture: any): void {
    for (const pattern of intents.architecturalPatterns) {
      architecture.patterns.push({
        name: pattern.pattern,
        category: pattern.category,
        services: pattern.services || [],
        confidence: pattern.confidence,
      });
    }
  }

  /**
   * Map best practices
   */
  private mapBestPractices(intents: any, architecture: any): void {
    for (const practice of intents.bestPractices) {
      architecture.bestPractices.push({
        type: practice.type,
        description: practice.description,
        isBestPractice: practice.isBestPractice,
        confidence: practice.confidence,
      });
    }
  }

  /**
   * Calculate overall confidence score
   */
  private calculateOverallConfidence(entities: any, intents: any): number {
    const entityConfidence =
      entities.services.reduce((sum: number, service: any) => sum + service.confidence, 0) /
      (entities.services.length || 1);

    const intentConfidence =
      intents.architecturalPatterns.reduce(
        (sum: number, pattern: any) => sum + pattern.confidence,
        0,
      ) / (intents.architecturalPatterns.length || 1);

    // Weighted average
    return entityConfidence * 0.6 + intentConfidence * 0.4;
  }
}
