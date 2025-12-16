/**
 * Documentation Fixtures
 *
 * Mock data for documentation generation testing
 */
export const mockDocumentationTemplates = {
  basicTemplate: {
    name: 'basic-template',
    description: 'Basic architecture documentation template',
    structure: {
      sections: [
        { title: 'Overview', placeholder: '{overview}' },
        { title: 'Components', placeholder: '{components}' },
        { title: 'Architecture Diagram', placeholder: '{diagram}' },
        { title: 'Best Practices', placeholder: '{best-practices}' },
      ],
    },
  },

  detailedTemplate: {
    name: 'detailed-template',
    description: 'Detailed architecture documentation template',
    structure: {
      sections: [
        { title: 'Executive Summary', placeholder: '{summary}' },
        { title: 'Architecture Overview', placeholder: '{overview}' },
        { title: 'Component Details', placeholder: '{components}' },
        { title: 'Data Flow', placeholder: '{data-flow}' },
        { title: 'Security Considerations', placeholder: '{security}' },
        { title: 'Performance Characteristics', placeholder: '{performance}' },
        { title: 'Cost Analysis', placeholder: '{cost}' },
        { title: 'Deployment Strategy', placeholder: '{deployment}' },
        { title: 'Monitoring and Operations', placeholder: '{monitoring}' },
      ],
    },
  },

  securityFocusedTemplate: {
    name: 'security-template',
    description: 'Security-focused architecture documentation',
    structure: {
      sections: [
        { title: 'Security Overview', placeholder: '{security-overview}' },
        { title: 'Threat Model', placeholder: '{threat-model}' },
        { title: 'Security Controls', placeholder: '{security-controls}' },
        { title: 'Compliance', placeholder: '{compliance}' },
        { title: 'Incident Response', placeholder: '{incident-response}' },
      ],
    },
  },
};

export const mockGeneratedDocumentation = {
  markdown: `
# AWS Architecture Documentation

## Overview
This is a serverless e-commerce architecture using AWS services.

## Components
- **Lambda Function**: Serverless compute function
- **API Gateway**: REST API endpoint
- **DynamoDB Table**: NoSQL database
- **S3 Bucket**: Static asset storage

## Architecture Diagram
\`\`\`mermaid
graph TD
  API_Gateway --> Lambda_Function
  Lambda_Function --> DynamoDB_Table
  Lambda_Function --> S3_Bucket
\`\`\`

## Best Practices
- Use serverless components for cost efficiency
- Implement proper error handling
- Use infrastructure as code
- Monitor all components
  `,

  html: `<!DOCTYPE html>
<html>
<head>
  <title>AWS Architecture Documentation</title>
</head>
<body>
  <h1>AWS Architecture Documentation</h1>
  <h2>Overview</h2>
  <p>This is a serverless e-commerce architecture using AWS services.</p>
  <h2>Components</h2>
  <ul>
    <li><strong>Lambda Function</strong>: Serverless compute function</li>
    <li><strong>API Gateway</strong>: REST API endpoint</li>
    <li><strong>DynamoDB Table</strong>: NoSQL database</li>
    <li><strong>S3 Bucket</strong>: Static asset storage</li>
  </ul>
</body>
</html>`,

  pdf: {
    title: 'AWS Architecture Documentation',
    content: 'PDF content would be generated here',
    pages: 5,
    size: 'A4',
  },

  code: `
// AWS Architecture Implementation
import { Lambda } from 'aws-sdk';
import { APIGateway } from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';
import { S3 } from 'aws-sdk';

class ECommerceArchitecture {
  private lambda: Lambda;
  private apiGateway: APIGateway;
  private dynamoDB: DynamoDB;
  private s3: S3;

  constructor() {
    this.lambda = new Lambda();
    this.apiGateway = new APIGateway();
    this.dynamoDB = new DynamoDB();
    this.s3 = new S3();
  }

  async initialize() {
    // Initialize all AWS services
    await this.setupLambda();
    await this.setupAPIGateway();
    await this.setupDynamoDB();
    await this.setupS3();
  }

  private async setupLambda() {
    // Lambda configuration
  }

  private async setupAPIGateway() {
    // API Gateway configuration
  }

  private async setupDynamoDB() {
    // DynamoDB configuration
  }

  private async setupS3() {
    // S3 configuration
  }
}
  `,
};

export const mockDocumentationErrorCases = {
  invalidTemplate: {
    name: 'invalid-template',
    structure: {
      sections: [
        { title: 'Invalid Section', placeholder: '{invalid-placeholder}' },
      ],
    },
  },

  missingPlaceholders: {
    name: 'missing-placeholders-template',
    structure: {
      sections: [
        { title: 'Section with missing data', placeholder: '{missing-data}' },
      ],
    },
  },

  malformedTemplate: {
    name: 'malformed-template',
    structure: null,
  },
};