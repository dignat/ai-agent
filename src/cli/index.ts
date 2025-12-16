/**
 * AWS Architecture Agent CLI - Main Entry Point
 *
 * Comprehensive command-line interface for AWS architecture analysis, validation, and generation
 */
import { Command } from 'commander';
import { ArchitectureAnalyzer } from '../architecture/analyzer';
import { MermaidDiagramGenerator } from '../../diagrams/generator';
import { ValidationEngine } from '../../validation/engine';
import { ComprehensiveDocumentationGenerator } from '../../docs/documentation-generator';
import { NLPProcessor } from '../nlp/index';
import { InputParser } from '../input-parser/index';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export class AWSArchitectureCLI {
  private program: Command;
  private analyzer: ArchitectureAnalyzer;
  private diagramGenerator: MermaidDiagramGenerator;
  private validationEngine: ValidationEngine;
  private documentationGenerator: ComprehensiveDocumentationGenerator;
  private nlpProcessor: NLPProcessor;
  private inputParser: InputParser;

  constructor() {
    this.program = new Command();
    this.analyzer = new ArchitectureAnalyzer();
    this.diagramGenerator = new MermaidDiagramGenerator();
    this.validationEngine = new ValidationEngine();
    this.documentationGenerator = new ComprehensiveDocumentationGenerator();
    this.nlpProcessor = new NLPProcessor();
    this.inputParser = new InputParser();

    this.setupCLI();
  }

  /**
   * Setup the CLI with all commands and options
   */
  private setupCLI(): void {
    // Configure the main program
    this.program
      .name('aws-arch-agent')
      .description(
        'AWS Architecture Agent - CLI for analyzing, validating, and generating AWS architecture diagrams',
      )
      .version('1.0.0');

    // Add global options
    this.program
      .option('-v, --verbose', 'enable verbose output')
      .option('-d, --debug', 'enable debug mode')
      .option('-q, --quiet', 'suppress all output except errors');

    // Add commands
    this.setupAnalyzeCommand();
    this.setupGenerateCommand();
    this.setupValidateCommand();
    this.setupDocumentCommand();
    this.setupDemoCommand();

    // Add help information
    this.program.addHelpText(
      'after',
      `
Examples:
  $ aws-arch-agent analyze --text "Build a serverless e-commerce app with Lambda and DynamoDB"
  $ aws-arch-agent analyze --file requirements.txt
  $ aws-arch-agent generate --type mermaid --output architecture.md
  $ aws-arch-agent validate --input architecture.json
  $ aws-arch-agent document --format markdown --output docs/
  $ aws-arch-agent demo --type nlp
    `,
    );
  }

  /**
   * Setup the analyze command
   */
  private setupAnalyzeCommand(): void {
    this.program
      .command('analyze')
      .description('Analyze AWS architecture from text or file input')
      .argument('[text]', 'Natural language requirements text')
      .option('-f, --file <path>', 'Path to file containing requirements')
      .option('-j, --json <path>', 'Path to JSON architecture file')
      .option('-y, --yaml <path>', 'Path to YAML architecture file')
      .option('-o, --output <path>', 'Output file path for analysis results')
      .option('-f, --format <format>', 'Output format (json, text, markdown)', 'json')
      .option('--no-nlp', 'Disable NLP processing')
      .option('--confidence-threshold <threshold>', 'Minimum confidence threshold', '0.7')
      .action(async (text, options) => {
        try {
          let analysisResult;

          if (options.file) {
            const fileContent = readFileSync(options.file, 'utf-8');
            analysisResult = await this.analyzer.analyze(fileContent);
          } else if (options.json) {
            const jsonContent = readFileSync(options.json, 'utf-8');
            analysisResult = await this.analyzer.analyzeFromJson(jsonContent);
          } else if (options.yaml) {
            const yamlContent = readFileSync(options.yaml, 'utf-8');
            analysisResult = await this.analyzer.analyzeFromYaml(yamlContent);
          } else if (text) {
            analysisResult = await this.analyzer.analyze(text);
          } else {
            // Default analysis
            analysisResult = await this.analyzer.analyze();
          }

          // Output results
          if (options.output) {
            const outputContent = this.formatOutput(analysisResult, options.format);
            writeFileSync(options.output, outputContent);
            console.log(`Analysis results saved to: ${options.output}`);
          } else {
            console.log('Analysis Results:');
            console.log(JSON.stringify(analysisResult, null, 2));
          }
        } catch (error) {
          console.error('Analysis failed:', error);
          process.exit(1);
        }
      });
  }

  /**
   * Setup the generate command
   */
  private setupGenerateCommand(): void {
    this.program
      .command('generate')
      .description('Generate architecture diagrams and visualizations')
      .option('-i, --input <path>', 'Input file path (JSON/YAML) or text')
      .option('-t, --type <type>', 'Diagram type (mermaid, plantuml, graphviz)', 'mermaid')
      .option('-o, --output <path>', 'Output file path')
      .option('-f, --format <format>', 'Output format (svg, png, pdf)', 'svg')
      .option('--title <title>', 'Diagram title')
      .option('--theme <theme>', 'Diagram theme (default, dark, light)')
      .action(async (options) => {
        try {
          let analysisResult;

          if (options.input) {
            // Check if input is a file or text
            if (
              options.input.endsWith('.json') ||
              options.input.endsWith('.yaml') ||
              options.input.endsWith('.yml')
            ) {
              const fileContent = readFileSync(options.input, 'utf-8');
              analysisResult = await this.analyzer.analyzeFromInput(fileContent);
            } else {
              analysisResult = await this.analyzer.analyze(options.input);
            }
          } else {
            // Generate from default analysis
            analysisResult = await this.analyzer.analyze();
          }

          // Generate diagrams
          const diagrams = await this.diagramGenerator.generateAllDiagrams(analysisResult);

          // Output results
          if (options.output) {
            // For simplicity, we'll output the mermaid code
            const outputContent = (diagrams as any).mermaid || JSON.stringify(diagrams, null, 2);
            writeFileSync(options.output, outputContent);
            console.log(`Diagrams generated and saved to: ${options.output}`);
          } else {
            console.log('Generated Diagrams:');
            console.log(JSON.stringify(diagrams, null, 2));
          }
        } catch (error) {
          console.error('Diagram generation failed:', error);
          process.exit(1);
        }
      });
  }

  /**
   * Setup the validate command
   */
  private setupValidateCommand(): void {
    this.program
      .command('validate')
      .description('Validate AWS architecture against best practices')
      .option('-i, --input <path>', 'Input file path (JSON/YAML) or text')
      .option('-o, --output <path>', 'Output file path for validation report')
      .option('-f, --format <format>', 'Output format (json, text, markdown)', 'json')
      .option(
        '--pillar <pillar>',
        'Specific pillar to validate (security, reliability, performance, cost, operational, sustainability)',
      )
      .option('--severity <level>', 'Minimum severity level (critical, high, medium, low)')
      .action(async (options) => {
        try {
          let analysisResult;

          if (options.input) {
            if (
              options.input.endsWith('.json') ||
              options.input.endsWith('.yaml') ||
              options.input.endsWith('.yml')
            ) {
              const fileContent = readFileSync(options.input, 'utf-8');
              analysisResult = await this.analyzer.analyzeFromInput(fileContent);
            } else {
              analysisResult = await this.analyzer.analyze(options.input);
            }
          } else {
            analysisResult = await this.analyzer.analyze();
          }

          // Perform validation
          const validationResult = await this.validationEngine.validate(analysisResult);

          // Filter by severity if specified
          let filteredResult = validationResult;
          if (options.severity) {
            filteredResult = this.filterBySeverity(validationResult, options.severity);
          }

          // Filter by pillar if specified
          if (options.pillar) {
            filteredResult = this.filterByPillar(validationResult, options.pillar);
          }

          // Output results
          if (options.output) {
            const outputContent = this.formatOutput(filteredResult, options.format);
            writeFileSync(options.output, outputContent);
            console.log(`Validation report saved to: ${options.output}`);
          } else {
            console.log('Validation Report:');
            console.log(JSON.stringify(filteredResult, null, 2));
          }
        } catch (error) {
          console.error('Validation failed:', error);
          process.exit(1);
        }
      });
  }

  /**
   * Setup the document command
   */
  private setupDocumentCommand(): void {
    this.program
      .command('document')
      .description('Generate comprehensive documentation')
      .option('-i, --input <path>', 'Input file path (JSON/YAML) or text')
      .option('-f, --format <format>', 'Output format (markdown, html, pdf, code)', 'markdown')
      .option('-o, --output <path>', 'Output directory path')
      .option('-t, --template <template>', 'Documentation template to use')
      .option('--title <title>', 'Document title')
      .option('--author <author>', 'Document author')
      .option('--all-formats', 'Generate all documentation formats')
      .action(async (options) => {
        try {
          let analysisResult;

          if (options.input) {
            if (
              options.input.endsWith('.json') ||
              options.input.endsWith('.yaml') ||
              options.input.endsWith('.yml')
            ) {
              const fileContent = readFileSync(options.input, 'utf-8');
              analysisResult = await this.analyzer.analyzeFromInput(fileContent);
            } else {
              analysisResult = await this.analyzer.analyze(options.input);
            }
          } else {
            analysisResult = await this.analyzer.analyze();
          }

          if (options.allFormats) {
            // Generate all formats
            const results = await this.documentationGenerator.generateAllFormats(analysisResult);

            if (options.output) {
              // Save each format to output directory
              const outputDir = options.output;
              mkdirSync(outputDir, { recursive: true });

              if (results.markdown) {
                writeFileSync(join(outputDir, 'documentation.md'), results.markdown);
              }
              if (results.html) {
                writeFileSync(join(outputDir, 'documentation.html'), results.html);
              }
              if (results.pdf) {
                writeFileSync(join(outputDir, 'documentation.pdf'), results.pdf);
              }
              if (results.code) {
                writeFileSync(join(outputDir, 'implementation.ts'), results.code);
              }

              console.log(`Documentation generated in all formats to: ${outputDir}`);
            } else {
              console.log('Generated Documentation (all formats):');
              console.log(JSON.stringify(results, null, 2));
            }
          } else {
            // Generate specific format
            let documentationResult;

            if (options.template) {
              documentationResult = await this.documentationGenerator.generateWithTemplate(
                analysisResult,
                options.template,
                options.format,
              );
            } else {
              switch (options.format) {
                case 'markdown':
                  documentationResult =
                    await this.documentationGenerator.generateMarkdown(analysisResult);
                  break;
                case 'html':
                  documentationResult =
                    await this.documentationGenerator.generateHTML(analysisResult);
                  break;
                case 'pdf':
                  documentationResult =
                    await this.documentationGenerator.generatePDF(analysisResult);
                  break;
                case 'code':
                  documentationResult =
                    await this.documentationGenerator.generateCode(analysisResult);
                  break;
                default:
                  documentationResult =
                    await this.documentationGenerator.generateMarkdown(analysisResult);
              }
            }

            // Output results
            if (options.output) {
              const outputPath =
                typeof options.output === 'string'
                  ? options.output
                  : join(options.output, `documentation.${options.format}`);
              writeFileSync(outputPath, documentationResult);
              console.log(`Documentation generated to: ${outputPath}`);
            } else {
              console.log('Generated Documentation:');
              console.log(documentationResult);
            }
          }
        } catch (error) {
          console.error('Documentation generation failed:', error);
          process.exit(1);
        }
      });
  }

  /**
   * Setup the demo command
   */
  private setupDemoCommand(): void {
    this.program
      .command('demo')
      .description('Run demonstration of AWS Architecture Agent capabilities')
      .option('-t, --type <type>', 'Demo type (nlp, input-parser, documentation, all)', 'all')
      .option('-o, --output <path>', 'Output directory for demo results')
      .action(async (options) => {
        try {
          console.log('AWS Architecture Agent - Demo Mode');
          console.log('==================================');

          if (options.type === 'nlp' || options.type === 'all') {
            console.log('\n--- NLP Demo ---');
            const demoResult = await this.runNLPDemo();
            console.log('NLP Demo completed successfully');
            if (options.output) {
              writeFileSync(
                join(options.output, 'nlp-demo-results.json'),
                JSON.stringify(demoResult, null, 2),
              );
            }
          }

          if (options.type === 'input-parser' || options.type === 'all') {
            console.log('\n--- Input Parser Demo ---');
            const demoResult = await this.runInputParserDemo();
            console.log('Input Parser Demo completed successfully');
            if (options.output) {
              writeFileSync(
                join(options.output, 'input-parser-demo-results.json'),
                JSON.stringify(demoResult, null, 2),
              );
            }
          }

          if (options.type === 'documentation' || options.type === 'all') {
            console.log('\n--- Documentation Demo ---');
            const demoResult = await this.runDocumentationDemo();
            console.log('Documentation Demo completed successfully');
            if (options.output) {
              writeFileSync(
                join(options.output, 'documentation-demo-results.json'),
                JSON.stringify(demoResult, null, 2),
              );
            }
          }

          console.log('\nDemo completed successfully!');
        } catch (error) {
          console.error('Demo failed:', error);
          process.exit(1);
        }
      });
  }

  /**
   * Run NLP demo
   */
  private async runNLPDemo(): Promise<any> {
    const requirementsText = `
      Build a serverless e-commerce platform using AWS services.
      It should include Lambda functions for backend processing,
      API Gateway for REST endpoints, DynamoDB for product data,
      S3 for image storage, and CloudFront for CDN.
      The system must be highly available, secure, and GDPR compliant.
    `;

    const result = await this.nlpProcessor.processRequirements(requirementsText);
    console.log('Detected Services:', result.architecture.services.join(', '));
    console.log(
      'Detected Patterns:',
      result.architecture.patterns.map((p: any) => p.name).join(', '),
    );
    console.log('Confidence:', result.confidence);

    return result;
  }

  /**
   * Run input parser demo
   */
  private async runInputParserDemo(): Promise<any> {
    const yamlExample = `
      services:
        - name: Lambda
          type: Compute
        - name: DynamoDB
          type: Database
      requirements:
        - High availability
        - Low latency
    `;

    const result = await this.inputParser.parse(yamlExample, 'yaml');
    console.log('Parsed Components:', result.components?.length || 0);
    console.log('Parsed Requirements:', result.requirements?.length || 0);

    return result;
  }

  /**
   * Run documentation demo
   */
  private async runDocumentationDemo(): Promise<any> {
    const analysisResult = await this.analyzer.analyze(`
      Create a microservices architecture with ECS, RDS, and SQS
    `);

    const markdownResult = await this.documentationGenerator.generateMarkdown(analysisResult);
    console.log(
      'Generated Markdown Documentation (first 200 chars):',
      markdownResult.substring(0, 200) + '...',
    );

    return {
      markdown: markdownResult,
      analysis: analysisResult,
    };
  }

  /**
   * Format output based on format type
   */
  private formatOutput(data: any, format: string = 'json'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'text':
        return this.formatAsText(data);
      case 'markdown':
        return this.formatAsMarkdown(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  /**
   * Format data as text
   */
  private formatAsText(data: any): string {
    let result = '';

    if (data.components) {
      result += 'Components:\n';
      data.components.forEach((comp: any) => {
        result += `  - ${comp.name} (${comp.type})\n`;
      });
      result += '\n';
    }

    if (data.patterns) {
      result += 'Patterns:\n';
      data.patterns.forEach((pattern: any) => {
        result += `  - ${pattern.name}\n`;
      });
      result += '\n';
    }

    if (data.confidence) {
      result += `Confidence: ${data.confidence}\n`;
    }

    return result;
  }

  /**
   * Format data as markdown
   */
  private formatAsMarkdown(data: any): string {
    let result = '# Architecture Analysis\n\n';

    if (data.components) {
      result += '## Components\n\n';
      data.components.forEach((comp: any) => {
        result += `- **${comp.name}**: ${comp.type}\n`;
        if (comp.description) {
          result += `  ${comp.description}\n`;
        }
      });
      result += '\n';
    }

    if (data.patterns) {
      result += '## Patterns\n\n';
      data.patterns.forEach((pattern: any) => {
        result += `- ${pattern.name}\n`;
      });
      result += '\n';
    }

    if (data.confidence) {
      result += `## Confidence: ${data.confidence}\n`;
    }

    return result;
  }

  /**
   * Filter validation results by severity
   */
  private filterBySeverity(validationResult: any, severity: string): any {
    const severityOrder = ['critical', 'high', 'medium', 'low'];
    const severityIndex = severityOrder.indexOf(severity.toLowerCase());

    if (severityIndex === -1) {
      return validationResult;
    }

    return {
      ...validationResult,
      criticalIssues: severityIndex <= 0 ? validationResult.criticalIssues : [],
      highRiskIssues: severityIndex <= 1 ? validationResult.highRiskIssues : [],
      mediumRiskIssues: severityIndex <= 2 ? validationResult.mediumRiskIssues : [],
      lowRiskIssues: severityIndex <= 3 ? validationResult.lowRiskIssues : [],
    };
  }

  /**
   * Filter validation results by pillar
   */
  private filterByPillar(validationResult: any, pillar: string): any {
    const pillarLower = pillar.toLowerCase();

    // Filter issues by pillar
    const filterIssues = (issues: any[]) => {
      return issues.filter((issue) => issue.pillar && issue.pillar.toLowerCase() === pillarLower);
    };

    return {
      ...validationResult,
      criticalIssues: filterIssues(validationResult.criticalIssues || []),
      highRiskIssues: filterIssues(validationResult.highRiskIssues || []),
      mediumRiskIssues: filterIssues(validationResult.mediumRiskIssues || []),
      lowRiskIssues: filterIssues(validationResult.lowRiskIssues || []),
    };
  }

  /**
   * Run the CLI
   */
  async run(argv: string[] = process.argv): Promise<void> {
    try {
      await this.program.parseAsync(argv);
    } catch (error) {
      console.error('CLI Error:', error);
      process.exit(1);
    }
  }
}

// Create and export CLI instance
const cli = new AWSArchitectureCLI();
export default cli;
