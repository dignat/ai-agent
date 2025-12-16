/**
 * Documentation Generation Demo
 *
 * Demonstrates the comprehensive documentation generation capabilities
 * of the AWS Architecture Agent
 */
import { ArchitectureAnalyzer } from '../src/architecture/analyzer';
import { ComprehensiveDocumentationGenerator } from '../docs/documentation-generator';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

async function runDocumentationDemo() {
  console.log('=== AWS Architecture Documentation Generation Demo ===\n');

  try {
    // Initialize components
    const analyzer = new ArchitectureAnalyzer();
    const documentationGenerator = new ComprehensiveDocumentationGenerator();

    // Sample architecture requirements
    const requirementsText = `
      We need to build a serverless e-commerce platform on AWS.
      The system should include:
      - AWS Lambda functions for backend processing
      - API Gateway for REST endpoints
      - DynamoDB for product and user data
      - S3 for image storage and static assets
      - Cognito for user authentication
      - CloudFront CDN for global content delivery

      Requirements:
      - High availability and scalability
      - Low latency for user interactions
      - GDPR compliance for European users
      - Cost optimization with auto-scaling
      - Comprehensive monitoring and logging

      Architecture patterns:
      - Serverless computing
      - Microservices for different functional areas
      - Event-driven architecture for order processing
      - Multi-region deployment for disaster recovery
    `;

    console.log('🔍 Analyzing architecture requirements...');
    const analysisResult = await analyzer.analyze(requirementsText);
    console.log('✅ Analysis completed with confidence:', analysisResult.confidence);

    // Show detected components
    const detectedServices = analysisResult.components
      .filter((c: any) => c.isAWSService)
      .map((c: any) => c.name)
      .join(', ');

    console.log('🔧 Detected AWS Services:', detectedServices);
    console.log(
      '📊 Architecture Type:',
      analysisResult.nlpAnalysis?.intents.architecturalPatterns[0]?.name || 'Not specified',
    );

    // Generate all documentation formats
    console.log('\n📝 Generating comprehensive documentation...');
    const documentationResults = await documentationGenerator.generateAllFormats(analysisResult);

    // Create output directory
    const outputDir = join(__dirname, '..', 'generated-docs');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Save Markdown documentation
    const markdownPath = join(outputDir, 'architecture-documentation.md');
    writeFileSync(markdownPath, documentationResults.markdown);
    console.log('📄 Markdown documentation saved:', markdownPath);

    // Save HTML documentation
    const htmlPath = join(outputDir, 'architecture-documentation.html');
    writeFileSync(htmlPath, documentationResults.html);
    console.log('🌐 HTML documentation saved:', htmlPath);

    // Save PDF documentation
    const pdfPath = join(outputDir, 'architecture-documentation.pdf');
    writeFileSync(pdfPath, documentationResults.pdf);
    console.log('📑 PDF documentation saved:', pdfPath);

    // Save implementation code
    const codePath = join(outputDir, 'aws-implementation.ts');
    writeFileSync(codePath, documentationResults.code);
    console.log('💻 Implementation code saved:', codePath);

    // Show available templates
    const availableTemplates = documentationGenerator.getAvailableTemplates();
    console.log(`\n📚 Available Documentation Templates: ${availableTemplates.join(', ')}`);

    // Generate template-based documentation
    console.log('\n🎨 Generating template-based documentation...');
    if (availableTemplates.length > 0) {
      const templateName = availableTemplates[0];
      const templateDoc = await documentationGenerator.generateWithTemplate(
        analysisResult,
        templateName,
        'markdown',
      );

      const templatePath = join(outputDir, `architecture-${templateName}-template.md`);
      if (typeof templateDoc === 'string') {
        writeFileSync(templatePath, templateDoc);
        console.log(`📝 ${templateName} template documentation saved:`, templatePath);
      }
    }

    // Show documentation statistics
    console.log('\n📊 Documentation Statistics:');
    console.log(`- Markdown size: ${documentationResults.markdown.length} characters`);
    console.log(`- HTML size: ${documentationResults.html.length} characters`);
    console.log(`- PDF size: ${documentationResults.pdf.length} bytes`);
    console.log(`- Code size: ${documentationResults.code.length} characters`);

    // Show sample content
    console.log('\n📝 Sample Markdown Content:');
    const markdownLines = documentationResults.markdown.split('\n');
    const sampleLines = markdownLines.slice(0, 10).join('\n');
    console.log(sampleLines + '...');

    console.log('\n✅ Documentation generation demo completed successfully!');
    console.log('📁 All files saved in:', outputDir);
  } catch (error) {
    console.error('❌ Documentation generation failed:', error);
    process.exit(1);
  }
}

// Run the demo
runDocumentationDemo();
