/**
 * Architecture Analysis Fixtures
 *
 * Mock data for architecture analysis testing
 */
import { ArchitectureAnalysis } from '../../../types';

export const mockArchitectureAnalysis: ArchitectureAnalysis = {
  components: [
    {
      id: '1',
      name: 'Lambda Function',
      type: 'compute',
      description: 'Serverless compute function',
      isAWSService: true,
    },
    {
      id: '2',
      name: 'API Gateway',
      type: 'networking',
      description: 'REST API endpoint',
      isAWSService: true,
    },
    {
      id: '3',
      name: 'DynamoDB Table',
      type: 'database',
      description: 'NoSQL database',
      isAWSService: true,
    },
    {
      id: '4',
      name: 'S3 Bucket',
      type: 'storage',
      description: 'Static asset storage',
      isAWSService: true,
    },
    {
      id: '5',
      name: 'Custom Application',
      type: 'custom',
      description: 'Custom business logic',
      isAWSService: false,
    },
  ],
  relationships: [
    {
      source: { name: 'API Gateway' },
      target: { name: 'Lambda Function' },
      type: 'triggers',
      description: 'API requests trigger Lambda functions',
    },
    {
      source: { name: 'Lambda Function' },
      target: { name: 'DynamoDB Table' },
      type: 'reads/writes',
      description: 'Lambda reads and writes product data',
    },
    {
      source: { name: 'Lambda Function' },
      target: { name: 'S3 Bucket' },
      type: 'reads',
      description: 'Lambda reads static assets',
    },
    {
      source: { name: 'Custom Application' },
      target: { name: 'API Gateway' },
      type: 'deploys to',
      description: 'Application deploys to API Gateway',
    },
  ],
  patterns: [
    'Serverless Architecture',
    'Microservices Pattern',
  ],
  requirements: [
    'Build a scalable e-commerce web application',
    'Support 10,000 concurrent users',
    'Provide low-latency responses',
    'Ensure data consistency',
  ],
  constraints: [
    'Budget: $5,000/month',
    'Must comply with GDPR',
    'Response time < 500ms',
    '99.9% availability',
  ],
  bestPractices: [
    'Use serverless components for cost efficiency',
    'Implement proper error handling',
    'Use infrastructure as code',
    'Monitor all components',
  ],
  validation: {
    errors: [],
    warnings: [],
    suggestions: ['Consider adding CloudWatch for monitoring'],
    confidence: 0.95,
  },
  confidence: 0.95,
  nlpAnalysis: {
    originalText: 'Build a serverless e-commerce application with Lambda, API Gateway, DynamoDB, and S3',
    entities: {
      services: [
        { name: 'Lambda', type: 'compute', description: 'Serverless compute' },
        { name: 'API Gateway', type: 'networking', description: 'REST API' },
        { name: 'DynamoDB', type: 'database', description: 'NoSQL database' },
        { name: 'S3', type: 'storage', description: 'Object storage' },
      ],
      components: [
        { name: 'Lambda Function', type: 'compute' },
        { name: 'API Gateway', type: 'networking' },
        { name: 'DynamoDB Table', type: 'database' },
        { name: 'S3 Bucket', type: 'storage' },
      ],
    },
    intents: {
      architecturalPatterns: [
        { pattern: 'Serverless Architecture', category: 'Compute Patterns' },
        { pattern: 'Microservices', category: 'Architecture Patterns' },
      ],
      useCases: ['E-commerce web application', 'Product catalog management'],
      constraints: ['GDPR compliance', 'Low latency', 'High availability'],
    },
  },
};

export const mockEmptyArchitecture: ArchitectureAnalysis = {
  components: [],
  relationships: [],
  patterns: [],
  requirements: [],
  constraints: [],
  bestPractices: [],
  validation: {
    errors: ['No components defined'],
    warnings: [],
    suggestions: ['Add components to architecture'],
    confidence: 0.1,
  },
  confidence: 0.1,
  nlpAnalysis: null,
};

export const mockLargeArchitecture: ArchitectureAnalysis = {
  components: Array.from({ length: 50 }, (_, i) => ({
    id: `comp-${i + 1}`,
    name: `Service-${i + 1}`,
    type: i % 4 === 0 ? 'compute' : i % 4 === 1 ? 'database' : i % 4 === 2 ? 'storage' : 'networking',
    description: `Service ${i + 1} for testing`,
    isAWSService: true,
  })),
  relationships: Array.from({ length: 100 }, (_, i) => ({
    source: { name: `Service-${Math.floor(i / 2) + 1}` },
    target: { name: `Service-${Math.floor(i / 2) + 2}` },
    type: i % 2 === 0 ? 'connects' : 'depends on',
    description: `Relationship ${i + 1}`,
  })),
  patterns: [
    'Serverless',
    'Microservices',
    'Event-Driven',
  ],
  requirements: Array.from({ length: 10 }, (_, i) => `Requirement ${i + 1}`),
  constraints: Array.from({ length: 5 }, (_, i) => `Constraint ${i + 1}`),
  bestPractices: Array.from({ length: 5 }, (_, i) => `Best Practice ${i + 1}`),
  validation: {
    errors: [],
    warnings: [],
    suggestions: [],
    confidence: 0.85,
  },
  confidence: 0.85,
  nlpAnalysis: null,
};