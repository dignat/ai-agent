/**
 * Input Parser Demo
 *
 * Demonstrates the JSON/YAML input parsing functionality
 */

import { InputParser } from '../src/input-parser/index';
import { TemplateManager } from '../src/input-parser/template-manager';
import { SchemaValidator } from '../src/input-parser/schema-validator';

async function runDemo() {
  console.log('=== AWS Architecture Input Parser Demo ===\n');

  // Initialize components
  const inputParser = new InputParser();
  const templateManager = new TemplateManager();
  const schemaValidator = new SchemaValidator();

  // 1. Demo JSON parsing
  console.log('1. JSON Parsing Demo');
  console.log('-------------------');

  const jsonInput = `
    {
      "name": "Serverless E-Commerce",
      "description": "A serverless e-commerce platform",
      "type": "serverless",
      "components": [
        {
          "name": "API Gateway",
          "type": "networking",
          "isAWSService": true,
          "description": "Handles REST API requests"
        },
        {
          "name": "AWS Lambda",
          "type": "compute",
          "isAWSService": true,
          "description": "Processes business logic"
        },
        {
          "name": "DynamoDB",
          "type": "database",
          "isAWSService": true,
          "description": "Stores product and user data"
        }
      ],
      "relationships": [
        {
          "source": "API Gateway",
          "target": "AWS Lambda",
          "type": "triggers",
          "description": "API requests trigger Lambda functions"
        },
        {
          "source": "AWS Lambda",
          "target": "DynamoDB",
          "type": "reads/writes",
          "description": "Lambda accesses DynamoDB tables"
        }
      ],
      "requirements": [
        "High availability",
        "Automatic scaling",
        "Low latency for user interactions"
      ],
      "constraints": [
        "Lambda timeout: 15 seconds",
        "DynamoDB read capacity: 10 RCU"
      ],
      "bestPractices": [
        "Use Lambda layers for shared dependencies",
        "Enable DynamoDB auto-scaling"
      ]
    }
  `;

  try {
    const jsonResult = await inputParser.parse(jsonInput, 'json');
    console.log('✅ JSON parsed successfully!');
    console.log(`   - Architecture: ${jsonResult.components.length} components`);
    console.log(`   - Confidence: ${jsonResult.confidence}`);
    console.log(`   - Components: ${jsonResult.components.map((c) => c.name).join(', ')}`);
  } catch (error) {
    console.error('❌ JSON parsing failed:', error);
  }

  // 2. Demo YAML parsing
  console.log('\n2. YAML Parsing Demo');
  console.log('-------------------');

  const yamlInput = `
    name: Microservices Architecture
    description: Container-based microservices
    type: microservices
    components:
      - name: Amazon ECS
        type: compute
        isAWSService: true
        description: Container orchestration
      - name: Application Load Balancer
        type: networking
        isAWSService: true
        description: Traffic distribution
      - name: Amazon RDS
        type: database
        isAWSService: true
        description: Relational database

    relationships:
      - source: Application Load Balancer
        target: Amazon ECS
        type: routes
        description: ALB routes to ECS services
      - source: Amazon ECS
        target: Amazon RDS
        type: reads/writes
        description: ECS accesses RDS

    patterns:
      - name: Microservices Pattern
        category: Application Architecture
        services: [ECS, ALB, RDS]
  `;

  try {
    const yamlResult = await inputParser.parse(yamlInput, 'yaml');
    console.log('✅ YAML parsed successfully!');
    console.log(`   - Architecture: ${yamlResult.components.length} components`);
    console.log(`   - Patterns: ${yamlResult.patterns.length}`);
    console.log(`   - Components: ${yamlResult.components.map((c) => c.name).join(', ')}`);
  } catch (error) {
    console.error('❌ YAML parsing failed:', error);
  }

  // 3. Demo auto-detection
  console.log('\n3. Auto-Detection Demo');
  console.log('----------------------');

  try {
    const autoResult = await inputParser.parseAuto(jsonInput);
    console.log('✅ Auto-detected format:', autoResult.inputFormat);
  } catch (error) {
    console.error('❌ Auto-detection failed:', error);
  }

  // 4. Demo format conversion
  console.log('\n4. Format Conversion Demo');
  console.log('-------------------------');

  try {
    const jsonResult = await inputParser.parse(jsonInput, 'json');
    const yamlResult = await inputParser.parse(yamlInput, 'yaml');

    const convertedYaml = await inputParser.convert(jsonResult, 'yaml');
    console.log('✅ Converted JSON to YAML:');
    console.log(convertedYaml.substring(0, 100) + '...');

    const convertedJson = await inputParser.convert(yamlResult, 'json');
    const jsonObj = JSON.parse(convertedJson);
    console.log('✅ Converted YAML to JSON - Components:', jsonObj.components.length);
  } catch (error) {
    console.error('❌ Conversion failed:', error);
  }

  // 5. Demo template manager
  console.log('\n5. Template Manager Demo');
  console.log('-----------------------');

  console.log('Available templates:', templateManager.getAvailableTemplates().join(', '));
  console.log('Available presets:', templateManager.getAvailablePresets().join(', '));

  try {
    const serverlessTemplate = templateManager.getTemplate('serverless-web-app');
    if (serverlessTemplate) {
      console.log('✅ Serverless template loaded:');
      console.log(`   - Name: ${serverlessTemplate.name}`);
      console.log(`   - Components: ${serverlessTemplate.components?.length}`);
      console.log(`   - Patterns: ${serverlessTemplate.patterns?.length}`);
    }
  } catch (error) {
    console.error('❌ Template loading failed:', error);
  }

  // 6. Demo schema validation
  console.log('\n6. Schema Validation Demo');
  console.log('-----------------------');

  const testInput: any = {
    name: 'Test Architecture',
    components: [
      {
        name: 'S3',
        type: 'storage',
      },
    ],
  };

  try {
    const validationResult = schemaValidator.validate(testInput);
    console.log('✅ Schema validation result:', validationResult.isValid ? 'Valid' : 'Invalid');
    if (!validationResult.isValid) {
      console.log('   Errors:', validationResult.errors.join(', '));
    }
  } catch (error) {
    console.error('❌ Schema validation failed:', error);
  }

  // 7. Demo error handling
  console.log('\n7. Error Handling Demo');
  console.log('----------------------');

  const invalidJson = '{ "name": "Test", "invalid": }';

  try {
    await inputParser.parse(invalidJson, 'json');
    console.log('❌ Should have thrown an error!');
  } catch (error: any) {
    console.log('✅ Properly caught parsing error:', error.message);
  }

  console.log('\n=== Demo Completed ===');
  console.log('The input parser successfully handles JSON/YAML parsing,');
  console.log('format conversion, templates, validation, and error handling!');
}

// Run the demo
runDemo().catch(console.error);
