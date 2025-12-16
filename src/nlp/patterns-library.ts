/**
 * Architectural Patterns Library
 *
 * Collection of common AWS architectural patterns and best practices
 */

export class ArchitecturalPatterns {
  private patterns: Record<string, any>;

  constructor() {
    this.patterns = {
      serverless: {
        name: 'Serverless Patterns',
        patterns: [
          {
            name: 'Event-driven processing',
            description: 'Lambda + SQS/SNS + DynamoDB for event-driven workflows',
            services: ['Lambda', 'SQS', 'SNS', 'DynamoDB'],
            useCases: ['asynchronous processing', 'decoupled services', 'event-based workflows'],
          },
          {
            name: 'API backend',
            description: 'API Gateway + Lambda + DynamoDB for serverless APIs',
            services: ['API Gateway', 'Lambda', 'DynamoDB'],
            useCases: ['REST APIs', 'microservices', 'serverless backends'],
          },
          {
            name: 'Data processing pipeline',
            description: 'S3 → Lambda → S3/Redshift for data transformation',
            services: ['S3', 'Lambda', 'Redshift'],
            useCases: ['data transformation', 'ETL pipelines', 'batch processing'],
          },
          {
            name: 'Real-time file processing',
            description: 'S3 → Lambda → processing → S3 for file processing',
            services: ['S3', 'Lambda'],
            useCases: ['file processing', 'image processing', 'document processing'],
          },
        ],
      },
      microservices: {
        name: 'Microservices Patterns',
        patterns: [
          {
            name: 'Service per function',
            description: 'Individual Lambda functions per service',
            services: ['Lambda', 'API Gateway'],
            useCases: ['microservices', 'service isolation', 'scalable services'],
          },
          {
            name: 'Containerized microservices',
            description: 'ECS/EKS with service mesh',
            services: ['ECS', 'EKS', 'Service Mesh'],
            useCases: ['containerized applications', 'Kubernetes', 'service mesh'],
          },
          {
            name: 'API composition',
            description: 'API Gateway aggregating multiple services',
            services: ['API Gateway', 'Lambda', 'ECS'],
            useCases: ['API aggregation', 'service composition', 'backend for frontend'],
          },
          {
            name: 'Event sourcing',
            description: 'Kinesis/DynamoDB Streams + Lambda',
            services: ['Kinesis', 'DynamoDB Streams', 'Lambda'],
            useCases: ['event sourcing', 'CQRS', 'audit logging'],
          },
        ],
      },
      webApplications: {
        name: 'Web Application Patterns',
        patterns: [
          {
            name: 'Static website',
            description: 'S3 + CloudFront + Route 53',
            services: ['S3', 'CloudFront', 'Route 53'],
            useCases: ['static websites', 'SPA hosting', 'content delivery'],
          },
          {
            name: 'Dynamic web app',
            description: 'ALB + EC2/ECS + RDS',
            services: ['ALB', 'EC2', 'ECS', 'RDS'],
            useCases: ['dynamic websites', 'traditional web apps', 'database-backed apps'],
          },
          {
            name: 'Serverless web app',
            description: 'CloudFront + Lambda@Edge + S3',
            services: ['CloudFront', 'Lambda@Edge', 'S3'],
            useCases: ['serverless websites', 'edge computing', 'global applications'],
          },
          {
            name: 'Progressive web app',
            description: 'Amplify + AppSync + Cognito',
            services: ['Amplify', 'AppSync', 'Cognito'],
            useCases: ['PWA', 'mobile web apps', 'offline-first apps'],
          },
        ],
      },
      dataProcessing: {
        name: 'Data Processing Patterns',
        patterns: [
          {
            name: 'Batch processing',
            description: 'S3 → Glue → Athena/Redshift',
            services: ['S3', 'Glue', 'Athena', 'Redshift'],
            useCases: ['batch ETL', 'data warehousing', 'analytics'],
          },
          {
            name: 'Stream processing',
            description: 'Kinesis → Lambda/Firehose → S3/Redshift',
            services: ['Kinesis', 'Lambda', 'Firehose', 'S3', 'Redshift'],
            useCases: ['real-time analytics', 'stream processing', 'log processing'],
          },
          {
            name: 'ETL pipeline',
            description: 'Glue → S3 → Redshift',
            services: ['Glue', 'S3', 'Redshift'],
            useCases: ['data transformation', 'data loading', 'data pipelines'],
          },
          {
            name: 'Data lake',
            description: 'S3 + Glue + Athena + QuickSight',
            services: ['S3', 'Glue', 'Athena', 'QuickSight'],
            useCases: ['data lakes', 'big data', 'analytics platforms'],
          },
        ],
      },
      hybrid: {
        name: 'Hybrid & Multi-Cloud Patterns',
        patterns: [
          {
            name: 'Hybrid cloud',
            description: 'Direct Connect/VPN + Storage Gateway',
            services: ['Direct Connect', 'Storage Gateway'],
            useCases: ['hybrid architectures', 'on-prem integration', 'migration'],
          },
          {
            name: 'Multi-region deployment',
            description: 'Route 53 + Global Accelerator',
            services: ['Route 53', 'Global Accelerator'],
            useCases: ['global applications', 'disaster recovery', 'low latency'],
          },
          {
            name: 'Disaster recovery',
            description: 'Cross-region replication + backup',
            services: ['S3 Cross-Region Replication', 'Backup'],
            useCases: ['DR planning', 'business continuity', 'high availability'],
          },
          {
            name: 'Edge computing',
            description: 'CloudFront + Lambda@Edge',
            services: ['CloudFront', 'Lambda@Edge'],
            useCases: ['edge computing', 'CDN processing', 'global applications'],
          },
        ],
      },
      security: {
        name: 'Security Patterns',
        patterns: [
          {
            name: 'Zero trust architecture',
            description: 'IAM + Cognito + WAF',
            services: ['IAM', 'Cognito', 'WAF'],
            useCases: ['security', 'identity management', 'access control'],
          },
          {
            name: 'Encryption at rest/transit',
            description: 'KMS + TLS',
            services: ['KMS', 'TLS'],
            useCases: ['data protection', 'compliance', 'security'],
          },
          {
            name: 'Network isolation',
            description: 'VPC + security groups + NACLs',
            services: ['VPC', 'Security Groups', 'NACLs'],
            useCases: ['network security', 'isolation', 'compliance'],
          },
          {
            name: 'Compliance monitoring',
            description: 'Config + GuardDuty + Macie',
            services: ['Config', 'GuardDuty', 'Macie'],
            useCases: ['compliance', 'security monitoring', 'auditing'],
          },
        ],
      },
    };
  }

  /**
   * Get all patterns
   */
  getPatterns(): Record<string, any> {
    return this.patterns;
  }

  /**
   * Find patterns by use case
   */
  findPatternsByUseCase(useCase: string): any[] {
    const results: any[] = [];
    useCase = useCase.toLowerCase();

    for (const category in this.patterns) {
      for (const pattern of this.patterns[category].patterns) {
        if (pattern.useCases.some((uc: string) => uc.toLowerCase().includes(useCase))) {
          results.push({
            category: this.patterns[category].name,
            pattern: pattern.name,
            description: pattern.description,
            services: pattern.services,
          });
        }
      }
    }

    return results;
  }

  /**
   * Get patterns by category
   */
  getPatternsByCategory(category: string): any[] {
    return this.patterns[category]?.patterns || [];
  }
}
