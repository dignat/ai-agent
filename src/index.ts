/**
 * AWS Architecture Agent - Main Entry Point
 *
 * This is the main entry point for the AWS Architecture Agent application.
 * It orchestrates the various components for architecture analysis, validation, and diagram generation.
 */
import { ArchitectureAnalyzer } from './architecture/analyzer';
import { MermaidDiagramGenerator } from '../diagrams/generator';
import { ValidationEngine } from '../validation/engine';
import { ComprehensiveDocumentationGenerator } from '../docs/documentation-generator';

async function main() {
  console.log('AWS Architecture Agent - Starting...');

  try {
    // Initialize components
    const analyzer = new ArchitectureAnalyzer();
    const diagramGenerator = new MermaidDiagramGenerator();
    const validationEngine = new ValidationEngine();
    const documentationGenerator = new ComprehensiveDocumentationGenerator();

    // Example workflow with NLP integration
    console.log('Analyzing AWS architecture...');

    // Example 1: Basic analysis without NLP
    console.log('\n--- Basic Analysis ---');
    const basicAnalysis = await analyzer.analyze();
    console.log('Basic analysis completed with confidence:', basicAnalysis.confidence);

    // Example 2: NLP-powered analysis with natural language requirements
    console.log('\n--- NLP-Powered Analysis ---');
    const requirementsText = `
      We need to build a serverless web application for e-commerce.
      It should use AWS Lambda for backend processing, API Gateway for REST endpoints,
      DynamoDB for product data storage, and S3 for image storage.
      The system must be highly available, secure, and cost-effective.
      We need low latency for user interactions and compliance with GDPR.
    `;

    const nlpAnalysis = await analyzer.analyze(requirementsText);
    console.log('NLP analysis completed with confidence:', nlpAnalysis.confidence);

    const detectedServices = nlpAnalysis.components
      .filter((c: any) => c.isAWSService)
      .map((c: any) => c.name)
      .join(', ');

    console.log('Detected services:', detectedServices);
    console.log(
      'Architecture type:',
      nlpAnalysis.nlpAnalysis?.intents.architecturalPatterns[0]?.name || 'Not specified',
    );

    // Validate the NLP analysis
    console.log('\n--- Validation ---');
    const validationResult = await validationEngine.validate(nlpAnalysis);
    console.log('Validation completed. Overall Score:', validationResult.overallScore);
    console.log('Critical Issues:', validationResult.criticalIssues?.length || 0);
    console.log('High Risk Issues:', validationResult.highRiskIssues?.length || 0);
    console.log('Medium Risk Issues:', validationResult.mediumRiskIssues?.length || 0);
    console.log('Low Risk Issues:', validationResult.lowRiskIssues?.length || 0);

    // Show detailed report
    console.log('\n--- Detailed Validation Report ---');
    console.log(validationResult.detailedReport);

    // Generate diagrams
    console.log('\n--- Diagram Generation ---');
    const diagrams = await diagramGenerator.generateAllDiagrams(nlpAnalysis);
    console.log('Diagrams generated successfully');

    // Generate documentation
    console.log('\n--- Documentation Generation ---');
    const documentationResults = await documentationGenerator.generateAllFormats(nlpAnalysis);
    console.log('Documentation generated successfully:');
    console.log('- Markdown: ✓');
    console.log('- HTML: ✓');
    console.log('- PDF: ✓');
    console.log('- Implementation Code: ✓');

    // Show available templates
    const availableTemplates = documentationGenerator.getAvailableTemplates();
    console.log(`\nAvailable documentation templates: ${availableTemplates.join(', ')}`);

    // Generate template-based documentation example
    if (availableTemplates.length > 0) {
      const templateExample = await documentationGenerator.generateWithTemplate(
        nlpAnalysis,
        availableTemplates[0],
        'markdown',
      );
      console.log(`\nTemplate-based documentation generated using: ${availableTemplates[0]}`);
    }

    console.log('\nAWS Architecture Agent - Completed successfully');
  } catch (error) {
    console.error('AWS Architecture Agent - Error:', error);
    process.exit(1);
  }
}

// Run the main function
main();
