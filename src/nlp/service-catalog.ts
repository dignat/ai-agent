/**
 * AWS Service Catalog
 *
 * Comprehensive catalog of AWS services with metadata for NLP processing
 */

export class AWSServiceCatalog {
  private catalog: Record<string, any>;

  constructor() {
    this.catalog = {
      compute: {
        services: [
          {
            name: 'EC2',
            type: 'compute',
            description: 'Virtual servers with various instance types',
            keywords: ['ec2', 'virtual machine', 'vm', 'instance'],
          },
          {
            name: 'Lambda',
            type: 'compute',
            description: 'Serverless compute service',
            keywords: ['lambda', 'serverless', 'function'],
          },
          {
            name: 'ECS',
            type: 'compute',
            description: 'Container orchestration service',
            keywords: ['ecs', 'container', 'docker'],
          },
          {
            name: 'EKS',
            type: 'compute',
            description: 'Kubernetes service',
            keywords: ['eks', 'kubernetes', 'k8s'],
          },
          {
            name: 'Fargate',
            type: 'compute',
            description: 'Serverless containers',
            keywords: ['fargate', 'serverless container'],
          },
          {
            name: 'Batch',
            type: 'compute',
            description: 'Batch processing',
            keywords: ['batch', 'batch processing'],
          },
          {
            name: 'Elastic Beanstalk',
            type: 'compute',
            description: 'Platform as a Service',
            keywords: ['beanstalk', 'paas'],
          },
        ],
      },
      storage: {
        services: [
          {
            name: 'S3',
            type: 'storage',
            description: 'Object storage with multiple tiers',
            keywords: ['s3', 'object storage', 'bucket'],
          },
          {
            name: 'EBS',
            type: 'storage',
            description: 'Block storage for EC2',
            keywords: ['ebs', 'block storage', 'volume'],
          },
          {
            name: 'EFS',
            type: 'storage',
            description: 'Managed NFS file system',
            keywords: ['efs', 'nfs', 'file system'],
          },
          {
            name: 'Glacier',
            type: 'storage',
            description: 'Long-term archival storage',
            keywords: ['glacier', 'archive', 'archival'],
          },
          {
            name: 'Storage Gateway',
            type: 'storage',
            description: 'Hybrid cloud storage',
            keywords: ['storage gateway', 'hybrid storage'],
          },
          {
            name: 'FSx',
            type: 'storage',
            description: 'Managed file systems',
            keywords: ['fsx', 'managed file system'],
          },
        ],
      },
      database: {
        services: [
          {
            name: 'RDS',
            type: 'database',
            description: 'Managed relational databases',
            keywords: ['rds', 'relational database', 'postgresql', 'mysql'],
          },
          {
            name: 'DynamoDB',
            type: 'database',
            description: 'NoSQL database service',
            keywords: ['dynamodb', 'nosql', 'document database'],
          },
          {
            name: 'Aurora',
            type: 'database',
            description: 'High-performance relational database',
            keywords: ['aurora', 'high performance db'],
          },
          {
            name: 'Redshift',
            type: 'database',
            description: 'Data warehousing',
            keywords: ['redshift', 'data warehouse', 'analytics'],
          },
          {
            name: 'ElastiCache',
            type: 'database',
            description: 'In-memory caching',
            keywords: ['elasticache', 'cache', 'redis', 'memcached'],
          },
          {
            name: 'Neptune',
            type: 'database',
            description: 'Graph database',
            keywords: ['neptune', 'graph database'],
          },
          {
            name: 'DocumentDB',
            type: 'database',
            description: 'MongoDB-compatible database',
            keywords: ['documentdb', 'mongodb'],
          },
        ],
      },
      networking: {
        services: [
          {
            name: 'VPC',
            type: 'networking',
            description: 'Virtual private cloud networking',
            keywords: ['vpc', 'virtual network'],
          },
          {
            name: 'CloudFront',
            type: 'networking',
            description: 'Content delivery network',
            keywords: ['cloudfront', 'cdn'],
          },
          {
            name: 'API Gateway',
            type: 'networking',
            description: 'REST/WebSocket API management',
            keywords: ['api gateway', 'rest api', 'websocket'],
          },
          {
            name: 'Route 53',
            type: 'networking',
            description: 'DNS and domain management',
            keywords: ['route53', 'dns', 'domain'],
          },
          {
            name: 'Direct Connect',
            type: 'networking',
            description: 'Dedicated network connections',
            keywords: ['direct connect', 'dedicated connection'],
          },
          {
            name: 'Global Accelerator',
            type: 'networking',
            description: 'Network performance optimization',
            keywords: ['global accelerator', 'network optimization'],
          },
        ],
      },
      security: {
        services: [
          {
            name: 'IAM',
            type: 'security',
            description: 'Identity and access management',
            keywords: ['iam', 'identity', 'access control'],
          },
          {
            name: 'KMS',
            type: 'security',
            description: 'Key management service',
            keywords: ['kms', 'encryption', 'key management'],
          },
          {
            name: 'GuardDuty',
            type: 'security',
            description: 'Threat detection',
            keywords: ['guardduty', 'threat detection'],
          },
          {
            name: 'Shield',
            type: 'security',
            description: 'DDoS protection',
            keywords: ['shield', 'ddos protection'],
          },
          {
            name: 'WAF',
            type: 'security',
            description: 'Web application firewall',
            keywords: ['waf', 'web firewall'],
          },
          {
            name: 'Config',
            type: 'security',
            description: 'Resource inventory and compliance',
            keywords: ['config', 'compliance'],
          },
        ],
      },
      management: {
        services: [
          {
            name: 'CloudWatch',
            type: 'management',
            description: 'Monitoring and observability',
            keywords: ['cloudwatch', 'monitoring', 'logs'],
          },
          {
            name: 'CloudTrail',
            type: 'management',
            description: 'API activity logging',
            keywords: ['cloudtrail', 'api logging'],
          },
          {
            name: 'Systems Manager',
            type: 'management',
            description: 'Operational insights',
            keywords: ['systems manager', 'ssm'],
          },
          {
            name: 'CloudFormation',
            type: 'management',
            description: 'Infrastructure as code',
            keywords: ['cloudformation', 'iac', 'infrastructure as code'],
          },
          {
            name: 'CDK',
            type: 'management',
            description: 'Cloud Development Kit',
            keywords: ['cdk', 'development kit'],
          },
          {
            name: 'Service Catalog',
            type: 'management',
            description: 'Approved IT services portfolio',
            keywords: ['service catalog', 'it services'],
          },
        ],
      },
      ai: {
        services: [
          {
            name: 'SageMaker',
            type: 'ai',
            description: 'Machine learning platform',
            keywords: ['sagemaker', 'machine learning', 'ml'],
          },
          {
            name: 'Rekognition',
            type: 'ai',
            description: 'Image/video analysis',
            keywords: ['rekognition', 'image analysis', 'video analysis'],
          },
          {
            name: 'Lex',
            type: 'ai',
            description: 'Conversational interfaces',
            keywords: ['lex', 'chatbot', 'conversational'],
          },
          {
            name: 'Polly',
            type: 'ai',
            description: 'Text-to-speech',
            keywords: ['polly', 'text to speech', 'tts'],
          },
          {
            name: 'Translate',
            type: 'ai',
            description: 'Language translation',
            keywords: ['translate', 'translation'],
          },
          {
            name: 'Comprehend',
            type: 'ai',
            description: 'Natural language processing',
            keywords: ['comprehend', 'nlp'],
          },
        ],
      },
      serverless: {
        services: [
          {
            name: 'Lambda',
            type: 'serverless',
            description: 'Event-driven compute',
            keywords: ['lambda', 'serverless function'],
          },
          {
            name: 'Step Functions',
            type: 'serverless',
            description: 'Workflow orchestration',
            keywords: ['step functions', 'workflow'],
          },
          {
            name: 'EventBridge',
            type: 'serverless',
            description: 'Event bus service',
            keywords: ['eventbridge', 'event bus'],
          },
          {
            name: 'SQS',
            type: 'serverless',
            description: 'Message queuing',
            keywords: ['sqs', 'queue', 'message queue'],
          },
          {
            name: 'SNS',
            type: 'serverless',
            description: 'Pub/Sub messaging',
            keywords: ['sns', 'pub/sub', 'notification'],
          },
          {
            name: 'DynamoDB Streams',
            type: 'serverless',
            description: 'Database change streams',
            keywords: ['dynamodb streams', 'change stream'],
          },
        ],
      },
    };
  }

  /**
   * Get the complete service catalog
   */
  getCatalog(): Record<string, any> {
    return this.catalog;
  }

  /**
   * Find service by name or keyword
   */
  findService(query: string): any | null {
    query = query.toLowerCase();

    // Search through all services
    for (const category in this.catalog) {
      for (const service of this.catalog[category].services) {
        // Check if query matches service name or any keyword
        if (
          service.name.toLowerCase() === query ||
          service.keywords.some((keyword: string) => keyword.toLowerCase() === query)
        ) {
          return service;
        }
      }
    }

    return null;
  }

  /**
   * Get all services in a specific category
   */
  getServicesByCategory(category: string): any[] {
    return this.catalog[category]?.services || [];
  }
}
