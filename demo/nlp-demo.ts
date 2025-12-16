/**
 * NLP Demo Script
 *
 * Demonstrates the NLP functionality for AWS architecture analysis
 */

import { NLPProcessor } from '../src/nlp/index';

async function runNLPDemo() {
  console.log('=== AWS Architecture NLP Demo ===\n');

  const nlpProcessor = new NLPProcessor();

  // Demo 1: Simple serverless architecture
  console.log('Demo 1: Serverless Web Application');
  const demo1Text = `
    We need to build a serverless web application for a blog platform.
    It should use AWS Lambda for backend processing, API Gateway for REST endpoints,
    DynamoDB for storing blog posts, and S3 for image storage.
    The system must be cost-effective and provide good performance.
  `;

  try {
    const result1 = await nlpProcessor.processRequirements(demo1Text);
    console.log('✅ Analysis completed with confidence:', result1.confidence);
    console.log('📋 Architecture Type:', result1.architecture.type);
    console.log(
      '🔧 Detected Services:',
      result1.architecture.services.map((s: any) => s.serviceName).join(', '),
    );
    console.log(
      '🔗 Detected Patterns:',
      result1.architecture.patterns.map((p: any) => p.name).join(', '),
    );
    console.log(
      '⚠️  Validation Issues:',
      result1.validation.errors.length +
        ' errors, ' +
        result1.validation.warnings.length +
        ' warnings\n',
    );
  } catch (error) {
    console.error('❌ Demo 1 failed:', error);
  }

  // Demo 2: Complex microservices architecture
  console.log('Demo 2: Microservices Architecture');
  const demo2Text = `
    Design a microservices architecture for an e-commerce platform.
    We need ECS for container orchestration, RDS for relational data,
    ElastiCache for caching, and CloudFront for CDN.
    The system should be highly available with multi-AZ deployment
    and comply with PCI DSS security standards.
  `;

  try {
    const result2 = await nlpProcessor.processRequirements(demo2Text);
    console.log('✅ Analysis completed with confidence:', result2.confidence);
    console.log('📋 Architecture Type:', result2.architecture.type);
    console.log(
      '🔧 Detected Services:',
      result2.architecture.services.map((s: any) => s.serviceName).join(', '),
    );
    console.log(
      '🔗 Detected Patterns:',
      result2.architecture.patterns.map((p: any) => p.name).join(', '),
    );
    console.log(
      '⚠️  Validation Issues:',
      result2.validation.errors.length +
        ' errors, ' +
        result2.validation.warnings.length +
        ' warnings\n',
    );
  } catch (error) {
    console.error('❌ Demo 2 failed:', error);
  }

  // Demo 3: Show service catalog and patterns
  console.log('Demo 3: Service Catalog and Patterns');
  const serviceCatalog = nlpProcessor.getServiceCatalog();
  const patternsLibrary = nlpProcessor.getPatternsLibrary();

  console.log('📚 Available Service Categories:', Object.keys(serviceCatalog).join(', '));
  console.log('🎨 Available Pattern Categories:', Object.keys(patternsLibrary).join(', '));

  // Show specific service info
  const lambdaService = serviceCatalog.compute.services.find((s: any) => s.name === 'Lambda');
  if (lambdaService) {
    console.log('🔍 Lambda Service Info:', `${lambdaService.name} - ${lambdaService.description}`);
  }

  console.log('\n=== Demo Completed ===');
}

// Run the demo
runNLPDemo().catch(console.error);
