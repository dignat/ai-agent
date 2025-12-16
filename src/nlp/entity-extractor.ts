/**
 * Entity Extractor
 *
 * Extracts AWS services, components, and relationships from natural language text
 */

import { AWSServiceCatalog } from './service-catalog';

export class EntityExtractor {
  private serviceCatalog: AWSServiceCatalog;

  constructor() {
    this.serviceCatalog = new AWSServiceCatalog();
  }

  /**
   * Extract entities from requirements text
   */
  extractEntities(text: string): any {
    const entities: any = {
      services: [],
      components: [],
      relationships: [],
      requirements: [],
    };

    // Normalize text
    const normalizedText = text.toLowerCase();

    // Extract AWS services
    this.extractServices(normalizedText, entities);

    // Extract components (non-AWS specific entities)
    this.extractComponents(normalizedText, entities);

    // Extract relationships between entities
    this.extractRelationships(text, entities);

    // Extract specific requirements
    this.extractRequirements(text, entities);

    return entities;
  }

  /**
   * Extract AWS services from text
   */
  private extractServices(text: string, entities: any): void {
    const serviceCatalog = this.serviceCatalog.getCatalog();

    // Search through all service categories
    for (const category in serviceCatalog) {
      for (const service of serviceCatalog[category].services) {
        // Check if service name or keywords are mentioned in text
        if (
          service.name.toLowerCase() === text ||
          service.keywords.some((keyword: string) => text.includes(keyword.toLowerCase()))
        ) {
          // Avoid duplicates
          if (!entities.services.some((s: any) => s.name === service.name)) {
            entities.services.push({
              name: service.name,
              type: service.type,
              description: service.description,
              confidence: this.calculateConfidence(text, service),
            });
          }
        }
      }
    }
  }

  /**
   * Extract non-AWS components (custom components, data flows, etc.)
   */
  private extractComponents(text: string, entities: any): void {
    // Common component patterns
    const componentPatterns = [
      { pattern: /(user|client|frontend|web app|mobile app)/i, type: 'user-interface' },
      { pattern: /(database|data store|storage|repo)/i, type: 'data-storage' },
      { pattern: /(api|endpoint|service|microservice)/i, type: 'service' },
      { pattern: /(queue|message bus|event bus)/i, type: 'messaging' },
      { pattern: /(cache|caching layer)/i, type: 'cache' },
      { pattern: /(authentication|auth|identity provider)/i, type: 'authentication' },
    ];

    // Extract components based on patterns
    for (const patternObj of componentPatterns) {
      const matches = text.match(patternObj.pattern);
      if (matches) {
        const componentName = matches[0];
        if (!entities.components.some((c: any) => c.name === componentName)) {
          entities.components.push({
            name: componentName,
            type: patternObj.type,
            confidence: 0.8, // Default confidence for pattern matches
          });
        }
      }
    }
  }

  /**
   * Extract relationships between entities
   */
  private extractRelationships(text: string, entities: any): void {
    // Relationship patterns
    const relationshipPatterns = [
      { pattern: /(connects to|integrates with|uses|consumes|calls|triggers)/i, type: 'uses' },
      { pattern: /(stores data in|writes to|saves to)/i, type: 'stores-in' },
      { pattern: /(reads from|queries|accesses)/i, type: 'reads-from' },
      { pattern: /(sends to|publishes to|emits)/i, type: 'sends-to' },
      { pattern: /(receives from|subscribes to|listens to)/i, type: 'receives-from' },
      { pattern: /(depends on|requires)/i, type: 'depends-on' },
    ];

    // Extract relationships
    for (const patternObj of relationshipPatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        entities.relationships.push({
          type: patternObj.type,
          description: matches[0],
          confidence: 0.7, // Default confidence for relationship detection
        });
      }
    }
  }

  /**
   * Extract specific requirements from text
   */
  private extractRequirements(text: string, entities: any): void {
    // Requirement patterns
    const requirementPatterns = [
      { pattern: /(high availability|ha|fault tolerant)/i, type: 'availability', value: 'high' },
      {
        pattern: /(low latency|fast response|real-time)/i,
        type: 'performance',
        value: 'low-latency',
      },
      { pattern: /(scalable|auto-scaling|elastic)/i, type: 'scalability', value: 'scalable' },
      { pattern: /(secure|encrypted|compliant)/i, type: 'security', value: 'secure' },
      { pattern: /(cost-effective|budget|low cost)/i, type: 'cost', value: 'cost-effective' },
      { pattern: /(backup|disaster recovery|dr)/i, type: 'reliability', value: 'backup' },
      { pattern: /(monitoring|logging|observability)/i, type: 'monitoring', value: 'monitored' },
    ];

    // Extract requirements
    for (const patternObj of requirementPatterns) {
      const matches = text.match(new RegExp(patternObj.pattern, 'gi'));
      if (matches) {
        entities.requirements.push({
          type: patternObj.type,
          value: patternObj.value,
          description: matches[0],
          confidence: 0.8, // Default confidence for requirement detection
        });
      }
    }
  }

  /**
   * Calculate confidence score based on how clearly the service is mentioned
   */
  private calculateConfidence(text: string, service: any): number {
    // Exact name match
    if (text.includes(service.name.toLowerCase())) {
      return 0.95;
    }

    // Keyword match
    if (service.keywords.some((keyword: string) => text.includes(keyword.toLowerCase()))) {
      return 0.8;
    }

    return 0.6;
  }
}
