/**
 * Input Parser Fixtures
 *
 * Mock data for input parsing testing
 */
export const mockInputData = {
  validJson: {
    name: 'Test Architecture',
    description: 'A test architecture for validation',
    components: [
      {
        name: 'Lambda',
        type: 'compute',
        isAWSService: true,
        description: 'Serverless compute function',
      },
      {
        name: 'S3',
        type: 'storage',
        isAWSService: true,
        description: 'Object storage',
      },
    ],
    relationships: [
      {
        source: 'Lambda',
        target: 'S3',
        type: 'reads',
        description: 'Lambda reads from S3',
      },
    ],
    requirements: [
      'Build a serverless application',
      'Support 1000 concurrent users',
    ],
    constraints: [
      'Budget: $1000/month',
      'Response time < 1000ms',
    ],
  },

  validYaml: `
name: Test Architecture
description: A test architecture for validation
components:
  - name: Lambda
    type: compute
    isAWSService: true
    description: Serverless compute function
  - name: S3
    type: storage
    isAWSService: true
    description: Object storage
relationships:
  - source: Lambda
    target: S3
    type: reads
    description: Lambda reads from S3
requirements:
  - Build a serverless application
  - Support 1000 concurrent users
constraints:
  - Budget: $1000/month
  - Response time < 1000ms
`,

  invalidJson: '{ "name": "Test", "invalid": }',

  invalidYaml: `
name: Test Architecture
components:
  - name: Lambda
    type: compute
    invalid: [unclosed array
`,

  ambiguousInput: 'This could be either JSON or YAML',

  emptyInput: '',

  largeInput: {
    name: 'Large Architecture',
    components: Array.from({ length: 100 }, (_, i) => ({
      name: `Service-${i + 1}`,
      type: i % 4 === 0 ? 'compute' : i % 4 === 1 ? 'database' : i % 4 === 2 ? 'storage' : 'networking',
      isAWSService: true,
      description: `Service ${i + 1} for testing`,
    })),
    relationships: Array.from({ length: 200 }, (_, i) => ({
      source: `Service-${Math.floor(i / 2) + 1}`,
      target: `Service-${Math.floor(i / 2) + 2}`,
      type: i % 2 === 0 ? 'connects' : 'depends on',
      description: `Relationship ${i + 1}`,
    })),
  },

  malformedInput: {
    name: 'Malformed Architecture',
    components: [
      { name: null, type: null },
      { name: 'Valid Service', type: 'compute' },
    ],
    relationships: [
      { source: null, target: null },
      { source: 'Valid Service', target: 'Another Service' },
    ],
  },
};

export const mockParsedResults = {
  jsonResult: {
    inputFormat: 'json',
    name: 'Test Architecture',
    description: 'A test architecture for validation',
    components: [
      {
        name: 'Lambda',
        type: 'compute',
        isAWSService: true,
        description: 'Serverless compute function',
      },
      {
        name: 'S3',
        type: 'storage',
        isAWSService: true,
        description: 'Object storage',
      },
    ],
    relationships: [
      {
        source: 'Lambda',
        target: 'S3',
        type: 'reads',
        description: 'Lambda reads from S3',
      },
    ],
    requirements: [
      'Build a serverless application',
      'Support 1000 concurrent users',
    ],
    constraints: [
      'Budget: $1000/month',
      'Response time < 1000ms',
    ],
    confidence: 0.95,
    validation: {
      errors: [],
      warnings: [],
      suggestions: [],
      confidence: 0.95,
    },
  },

  yamlResult: {
    inputFormat: 'yaml',
    name: 'Test Architecture',
    description: 'A test architecture for validation',
    components: [
      {
        name: 'Lambda',
        type: 'compute',
        isAWSService: true,
        description: 'Serverless compute function',
      },
      {
        name: 'S3',
        type: 'storage',
        isAWSService: true,
        description: 'Object storage',
      },
    ],
    relationships: [
      {
        source: 'Lambda',
        target: 'S3',
        type: 'reads',
        description: 'Lambda reads from S3',
      },
    ],
    requirements: [
      'Build a serverless application',
      'Support 1000 concurrent users',
    ],
    constraints: [
      'Budget: $1000/month',
      'Response time < 1000ms',
    ],
    confidence: 0.95,
    validation: {
      errors: [],
      warnings: [],
      suggestions: [],
      confidence: 0.95,
    },
  },
};