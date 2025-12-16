/**
 * Template Manager
 *
 * Manages architecture templates and presets
 */

import { ArchitectureInput } from './types';

export class TemplateManager {
  private templates: Record<string, ArchitectureInput>;
  private presets: Record<string, Partial<ArchitectureInput>>;

  constructor() {
    this.templates = this.loadDefaultTemplates();
    this.presets = this.loadDefaultPresets();
  }

  /**
   * Get available template names
   */
  getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }

  /**
   * Get available preset names
   */
  getAvailablePresets(): string[] {
    return Object.keys(this.presets);
  }

  /**
   * Get template by name
   */
  getTemplate(name: string): ArchitectureInput | undefined {
    return this.templates[name];
  }

  /**
   * Get preset by name
   */
  getPreset(name: string): Partial<ArchitectureInput> | undefined {
    return this.presets[name];
  }

  /**
   * Apply template to create new architecture
   */
  applyTemplate(name: string, customizations: Partial<ArchitectureInput> = {}): ArchitectureInput {
    const template = this.getTemplate(name);
    if (!template) {
      throw new Error(`Template not found: ${name}`);
    }

    return {
      ...template,
      ...customizations,
      name: customizations.name || template.name,
      description: customizations.description || template.description,
    };
  }

  /**
   * Apply preset to existing architecture
   */
  applyPreset(architecture: ArchitectureInput, presetName: string): ArchitectureInput {
    const preset = this.getPreset(presetName);
    if (!preset) {
      throw new Error(`Preset not found: ${presetName}`);
    }

    return {
      ...architecture,
      ...preset,
      components: [...(architecture.components || []), ...(preset.components || [])],
      patterns: [...(architecture.patterns || []), ...(preset.patterns || [])],
      requirements: [...(architecture.requirements || []), ...(preset.requirements || [])],
      constraints: [...(architecture.constraints || []), ...(preset.constraints || [])],
      bestPractices: [...(architecture.bestPractices || []), ...(preset.bestPractices || [])],
    };
  }

  /**
   * Add custom template
   */
  addTemplate(name: string, template: ArchitectureInput): void {
    this.templates[name] = template;
  }

  /**
   * Add custom preset
   */
  addPreset(name: string, preset: Partial<ArchitectureInput>): void {
    this.presets[name] = preset;
  }

  /**
   * Load default templates
   */
  private loadDefaultTemplates(): Record<string, ArchitectureInput> {
    return {
      'serverless-web-app': {
        name: 'Serverless Web Application',
        description: 'A serverless web application using AWS Lambda, API Gateway, and DynamoDB',
        type: 'serverless',
        components: [
          {
            name: 'API Gateway',
            type: 'networking',
            isAWSService: true,
            description: 'REST API endpoint management',
          },
          {
            name: 'AWS Lambda',
            type: 'compute',
            isAWSService: true,
            description: 'Serverless compute for business logic',
          },
          {
            name: 'DynamoDB',
            type: 'database',
            isAWSService: true,
            description: 'NoSQL database for data storage',
          },
          {
            name: 'Amazon S3',
            type: 'storage',
            isAWSService: true,
            description: 'Object storage for static assets',
          },
        ],
        relationships: [
          {
            source: 'API Gateway',
            target: 'AWS Lambda',
            type: 'triggers',
            description: 'API requests trigger Lambda functions',
          },
          {
            source: 'AWS Lambda',
            target: 'DynamoDB',
            type: 'reads/writes',
            description: 'Lambda functions access DynamoDB tables',
          },
          {
            source: 'AWS Lambda',
            target: 'Amazon S3',
            type: 'reads/writes',
            description: 'Lambda functions access S3 buckets',
          },
        ],
        patterns: [
          {
            name: 'Serverless Architecture',
            category: 'Compute',
            services: ['API Gateway', 'Lambda', 'DynamoDB'],
          },
        ],
        requirements: ['High availability', 'Automatic scaling', 'Cost efficiency'],
        constraints: [
          'Lambda execution timeout: 15 seconds',
          'DynamoDB read capacity: 5 RCU',
          'DynamoDB write capacity: 5 WCU',
        ],
        bestPractices: [
          'Use Lambda layers for shared code',
          'Implement proper IAM roles with least privilege',
          'Enable DynamoDB auto-scaling',
          'Use API Gateway caching for frequent requests',
        ],
      },

      'microservices-ecs': {
        name: 'Microservices with ECS',
        description: 'Microservices architecture using Amazon ECS and application load balancing',
        type: 'microservices',
        components: [
          {
            name: 'Amazon ECS',
            type: 'compute',
            isAWSService: true,
            description: 'Container orchestration service',
          },
          {
            name: 'Application Load Balancer',
            type: 'networking',
            isAWSService: true,
            description: 'Load balancing for container services',
          },
          {
            name: 'Amazon RDS',
            type: 'database',
            isAWSService: true,
            description: 'Relational database service',
          },
          {
            name: 'Amazon ElastiCache',
            type: 'database',
            isAWSService: true,
            description: 'In-memory caching service',
          },
        ],
        relationships: [
          {
            source: 'Application Load Balancer',
            target: 'Amazon ECS',
            type: 'routes',
            description: 'ALB routes traffic to ECS services',
          },
          {
            source: 'Amazon ECS',
            target: 'Amazon RDS',
            type: 'reads/writes',
            description: 'ECS services access RDS databases',
          },
          {
            source: 'Amazon ECS',
            target: 'Amazon ElastiCache',
            type: 'reads/writes',
            description: 'ECS services access ElastiCache for caching',
          },
        ],
        patterns: [
          {
            name: 'Microservices Architecture',
            category: 'Application',
            services: ['ECS', 'ALB', 'RDS'],
          },
        ],
      },
    };
  }

  /**
   * Load default presets
   */
  private loadDefaultPresets(): Record<string, Partial<ArchitectureInput>> {
    return {
      'security-best-practices': {
        bestPractices: [
          'Enable encryption at rest for all data stores',
          'Implement IAM roles with least privilege',
          'Enable VPC flow logs for network monitoring',
          'Use AWS WAF for web application protection',
          'Enable AWS Config for compliance monitoring',
        ],
        constraints: [
          'All resources must be deployed in private subnets',
          'Enable multi-factor authentication for administrative access',
          'Implement network ACLs and security groups',
        ],
      },

      'high-availability': {
        requirements: [
          'Multi-AZ deployment for critical components',
          'Automatic failover capabilities',
          'Minimum 99.95% availability SLA',
        ],
        bestPractices: [
          'Deploy across multiple Availability Zones',
          'Use Auto Scaling groups for compute resources',
          'Implement health checks and automatic recovery',
          'Use Amazon RDS Multi-AZ for databases',
        ],
        patterns: [
          {
            name: 'Multi-AZ Deployment',
            category: 'Reliability',
          },
        ],
      },

      'cost-optimization': {
        requirements: [
          'Cost-effective resource utilization',
          'Automatic scaling based on demand',
          'Reserved instances for predictable workloads',
        ],
        bestPractices: [
          'Use AWS Cost Explorer for cost analysis',
          'Implement auto-scaling policies',
          'Use Spot Instances for fault-tolerant workloads',
          'Enable AWS Cost and Usage Report',
          'Use Savings Plans for consistent usage',
        ],
      },
    };
  }
}
