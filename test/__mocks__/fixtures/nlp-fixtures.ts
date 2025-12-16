/**
 * NLP Fixtures
 *
 * Mock data for NLP processing testing
 */
export const mockNLPInput = {
  simpleRequirements: 'Build a serverless web application with Lambda and S3',
  complexRequirements: `
    We need to build a serverless e-commerce platform using AWS services.
    The system should include:
    - AWS Lambda for backend processing
    - API Gateway for REST endpoints
    - DynamoDB for product data storage
    - S3 for image storage and static assets
    - CloudFront for CDN
    - Cognito for user authentication
    The application must be highly available, secure, and cost-effective.
    We need low latency for user interactions and compliance with GDPR.
    The system should handle 10,000 concurrent users with response times under 500ms.
  `,
  incompleteRequirements: 'Build an application',
  ambiguousRequirements: 'Create something with AWS',
  invalidRequirements: 'This is not a valid architecture requirement',
};

export const mockNLPEntities = {
  services: [
    { name: 'Lambda', type: 'compute', description: 'Serverless compute', confidence: 0.95 },
    { name: 'API Gateway', type: 'networking', description: 'REST API', confidence: 0.92 },
    { name: 'DynamoDB', type: 'database', description: 'NoSQL database', confidence: 0.88 },
    { name: 'S3', type: 'storage', description: 'Object storage', confidence: 0.90 },
    { name: 'CloudFront', type: 'networking', description: 'CDN', confidence: 0.85 },
  ],
  components: [
    { name: 'Backend Service', type: 'compute', confidence: 0.93 },
    { name: 'Database Layer', type: 'database', confidence: 0.87 },
    { name: 'Storage Layer', type: 'storage', confidence: 0.89 },
  ],
  relationships: [
    { source: 'Backend Service', target: 'Database Layer', type: 'reads/writes', confidence: 0.91 },
    { source: 'Backend Service', target: 'Storage Layer', type: 'reads', confidence: 0.86 },
  ],
};

export const mockNLPIntents = {
  architecturalPatterns: [
    { pattern: 'Serverless Architecture', category: 'Compute Patterns', confidence: 0.94 },
    { pattern: 'Microservices', category: 'Architecture Patterns', confidence: 0.82 },
    { pattern: 'Event-Driven Architecture', category: 'Messaging Patterns', confidence: 0.78 },
  ],
  useCases: [
    { useCase: 'E-commerce web application', confidence: 0.96 },
    { useCase: 'Product catalog management', confidence: 0.91 },
    { useCase: 'User authentication', confidence: 0.88 },
  ],
  constraints: [
    { constraint: 'GDPR compliance', confidence: 0.93 },
    { constraint: 'Low latency', confidence: 0.89 },
    { constraint: 'High availability', confidence: 0.87 },
    { constraint: 'Cost-effective', confidence: 0.85 },
  ],
  bestPractices: [
    { practice: 'Use serverless components', confidence: 0.90 },
    { practice: 'Implement proper error handling', confidence: 0.88 },
    { practice: 'Monitor all components', confidence: 0.86 },
  ],
};

export const mockNLPErrorCases = {
  emptyInput: '',
  nonArchitectureText: 'This is just random text without any architecture context',
  unsupportedServices: 'Use some non-existent AWS service that does not exist',
  conflictingRequirements: 'Build a system that is both serverless and uses EC2 instances',
  invalidFormat: 'This should cause parsing errors due to invalid format',
};