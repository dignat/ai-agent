/**
 * AWS Architecture Agent CLI - Unit Tests
 *
 * Comprehensive tests for the CLI functionality
 */
import { AWSArchitectureCLI } from './index';
import { Command } from 'commander';

describe('AWSArchitectureCLI', () => {
  let cli: AWSArchitectureCLI;

  beforeEach(() => {
    cli = new AWSArchitectureCLI();
  });

  test('should initialize CLI with correct name and version', () => {
    const program = (cli as any).program;
    expect(program.name()).toBe('aws-arch-agent');
    expect(program.version()).toBe('1.0.0');
  });

  test('should have all major commands registered', () => {
    const program = (cli as any).program;
    const commands = program.commands;

    expect(commands).toHaveLength(5);
    expect(commands.map((c: Command) => c.name())).toContain('analyze');
    expect(commands.map((c: Command) => c.name())).toContain('generate');
    expect(commands.map((c: Command) => c.name())).toContain('validate');
    expect(commands.map((c: Command) => c.name())).toContain('document');
    expect(commands.map((c: Command) => c.name())).toContain('demo');
  });

  test('should have global options', () => {
    const program = (cli as any).program;
    const options = program.options;

    expect(options).toHaveLength(4); // Includes version option
    expect(options.some((opt: any) => opt.long === '--verbose')).toBe(true);
    expect(options.some((opt: any) => opt.long === '--debug')).toBe(true);
    expect(options.some((opt: any) => opt.long === '--quiet')).toBe(true);
  });

  test('analyze command should have correct options', () => {
    const program = (cli as any).program;
    const analyzeCmd = program.commands.find((c: Command) => c.name() === 'analyze');

    expect(analyzeCmd).toBeDefined();
    expect(analyzeCmd?.options).toHaveLength(7);
  });

  test('generate command should have correct options', () => {
    const program = (cli as any).program;
    const generateCmd = program.commands.find((c: Command) => c.name() === 'generate');

    expect(generateCmd).toBeDefined();
    expect(generateCmd?.options).toHaveLength(6);
  });

  test('validate command should have correct options', () => {
    const program = (cli as any).program;
    const validateCmd = program.commands.find((c: Command) => c.name() === 'validate');

    expect(validateCmd).toBeDefined();
    expect(validateCmd?.options).toHaveLength(5);
  });

  test('document command should have correct options', () => {
    const program = (cli as any).program;
    const documentCmd = program.commands.find((c: Command) => c.name() === 'document');

    expect(documentCmd).toBeDefined();
    expect(documentCmd?.options).toHaveLength(7);
  });

  test('demo command should have correct options', () => {
    const program = (cli as any).program;
    const demoCmd = program.commands.find((c: Command) => c.name() === 'demo');

    expect(demoCmd).toBeDefined();
    expect(demoCmd?.options).toHaveLength(2);
  });

  test('formatOutput should handle different formats', () => {
    const testData = {
      components: [{ name: 'Lambda', type: 'Compute' }],
      patterns: [{ name: 'Serverless' }],
      confidence: 0.95,
    };

    // Test JSON format
    const jsonOutput = cli['formatOutput'](testData, 'json');
    expect(() => JSON.parse(jsonOutput)).not.toThrow();

    // Test text format
    const textOutput = cli['formatOutput'](testData, 'text');
    expect(textOutput).toContain('Components:');
    expect(textOutput).toContain('Patterns:');
    expect(textOutput).toContain('Confidence:');

    // Test markdown format
    const markdownOutput = cli['formatOutput'](testData, 'markdown');
    expect(markdownOutput).toContain('# Architecture Analysis');
    expect(markdownOutput).toContain('## Components');
    expect(markdownOutput).toContain('## Patterns');
  });

  test('filterBySeverity should filter correctly', () => {
    const validationResult = {
      criticalIssues: [{ severity: 'critical' }],
      highRiskIssues: [{ severity: 'high' }],
      mediumRiskIssues: [{ severity: 'medium' }],
      lowRiskIssues: [{ severity: 'low' }],
    };

    // Test that filterBySeverity returns the same object when no severity is specified
    const noFilter = cli['filterBySeverity'](validationResult, 'unknown');
    expect(noFilter).toEqual(validationResult);

    // Test that filterBySeverity handles empty arrays
    const emptyResult = cli['filterBySeverity'](
      {
        criticalIssues: [],
        highRiskIssues: [],
        mediumRiskIssues: [],
        lowRiskIssues: [],
      },
      'critical',
    );
    expect(emptyResult.criticalIssues).toHaveLength(0);
    expect(emptyResult.highRiskIssues).toHaveLength(0);
    expect(emptyResult.mediumRiskIssues).toHaveLength(0);
    expect(emptyResult.lowRiskIssues).toHaveLength(0);
  });

  test('filterByPillar should filter by specific pillar', () => {
    const validationResult = {
      criticalIssues: [
        { pillar: 'Security', message: 'Security issue' },
        { pillar: 'Reliability', message: 'Reliability issue' },
      ],
      highRiskIssues: [
        { pillar: 'Security', message: 'Security issue' },
        { pillar: 'Performance', message: 'Performance issue' },
      ],
    };

    const securityOnly = cli['filterByPillar'](validationResult, 'security');
    expect(securityOnly.criticalIssues).toHaveLength(1);
    expect(securityOnly.highRiskIssues).toHaveLength(1);
    expect(securityOnly.criticalIssues[0].pillar).toBe('Security');
  });
});