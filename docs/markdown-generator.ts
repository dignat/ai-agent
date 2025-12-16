/**
 * Markdown Documentation Generator
 *
 * Generates comprehensive Markdown documentation with proper formatting and structure
 */
import { ArchitectureAnalysis } from '../types';
import { DocumentationError } from './documentation-error';

export class MarkdownGenerator {
  /**
   * Generate Markdown documentation from architecture analysis
   */
  async generate(analysisResult: ArchitectureAnalysis): Promise<string> {
    try {
      if (!analysisResult) {
        throw new DocumentationError('No analysis result provided for Markdown generation');
      }

      const markdown = this.buildMarkdownDocumentation(analysisResult);
      return markdown;
    } catch (error) {
      throw new DocumentationError(
        `Markdown generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate Markdown documentation using a specific template
   */
  async generateWithTemplate(
    analysisResult: ArchitectureAnalysis,
    template: string,
  ): Promise<string> {
    try {
      if (!analysisResult) {
        throw new DocumentationError(
          'No analysis result provided for template-based Markdown generation',
        );
      }

      // Apply template to the markdown generation
      const baseMarkdown = this.buildMarkdownDocumentation(analysisResult);
      return this.applyTemplate(baseMarkdown, template);
    } catch (error) {
      throw new DocumentationError(
        `Template-based Markdown generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Build comprehensive Markdown documentation
   */
  private buildMarkdownDocumentation(analysisResult: ArchitectureAnalysis): string {
    const {
      components,
      relationships,
      patterns,
      requirements,
      constraints,
      bestPractices,
      validation,
      confidence,
      nlpAnalysis,
    } = analysisResult;

    let markdown = `# AWS Architecture Documentation
`;

    // Add metadata
    markdown += `## Architecture Overview
- **Confidence Level**: ${(confidence || 0) * 100}%
- **Analysis Date**: ${new Date().toISOString()}
- **Components**: ${components.length}
- **Patterns**: ${patterns.length}
`;

    // Add components section
    if (components && components.length > 0) {
      markdown += `## Components
`;
      components.forEach((component, index) => {
        markdown += `${index + 1}. **${component.name}** (${component.type})
   - Description: ${component.description || 'No description available'}
   - AWS Service: ${component.isAWSService ? 'Yes' : 'No'}
`;
      });
    }

    // Add relationships section
    if (relationships && relationships.length > 0) {
      markdown += `## Relationships
`;
      relationships.forEach((relationship, index) => {
        markdown += `${index + 1}. **${relationship.type}**
   - Description: ${relationship.description || 'No description available'}
   - Confidence: ${relationship.confidence || 'Unknown'}
`;
      });
    }

    // Add patterns section
    if (patterns && patterns.length > 0) {
      markdown += `## Architecture Patterns
`;
      patterns.forEach((pattern, index) => {
        const patternName =
          typeof pattern === 'string' ? pattern : (pattern as any).name || 'Unknown';
        const patternCategory =
          typeof pattern === 'object' && (pattern as any).category
            ? (pattern as any).category
            : 'General';
        const patternServices =
          typeof pattern === 'object' && (pattern as any).services ? (pattern as any).services : [];
        markdown += `${index + 1}. **${patternName}** (${patternCategory})
   - Services: ${Array.isArray(patternServices) ? patternServices.join(', ') : 'Not specified'}
`;
      });
    }

    // Add requirements section
    if (requirements && requirements.length > 0) {
      markdown += `## Requirements
`;
      requirements.forEach((requirement, index) => {
        markdown += `${index + 1}. ${requirement}
`;
      });
    }

    // Add constraints section
    if (constraints && constraints.length > 0) {
      markdown += `## Constraints
`;
      constraints.forEach((constraint, index) => {
        markdown += `${index + 1}. ${constraint}
`;
      });
    }

    // Add best practices section
    if (bestPractices && bestPractices.length > 0) {
      markdown += `## Best Practices
`;
      bestPractices.forEach((practice, index) => {
        markdown += `${index + 1}. ${practice}
`;
      });
    }

    // Add validation section
    if (validation) {
      markdown += `## Validation Results
- **Overall Confidence**: ${validation.confidence * 100}%
- **Errors**: ${validation.errors?.length || 0}
- **Warnings**: ${validation.warnings?.length || 0}
- **Suggestions**: ${validation.suggestions?.length || 0}
`;

      if (validation.errors && validation.errors.length > 0) {
        markdown += `\n### Critical Issues
`;
        validation.errors.forEach((error, index) => {
          markdown += `${index + 1}. ${error}
`;
        });
      }

      if (validation.warnings && validation.warnings.length > 0) {
        markdown += `\n### Warnings
`;
        validation.warnings.forEach((warning, index) => {
          markdown += `${index + 1}. ${warning}
`;
        });
      }

      if (validation.suggestions && validation.suggestions.length > 0) {
        markdown += `\n### Suggestions
`;
        validation.suggestions.forEach((suggestion, index) => {
          markdown += `${index + 1}. ${suggestion}
`;
        });
      }
    }

    // Add NLP analysis section if available
    if (nlpAnalysis) {
      markdown += `## NLP Analysis
- **Original Text**: ${nlpAnalysis.originalText || 'Not available'}
`;

      if (nlpAnalysis.entities?.services && nlpAnalysis.entities.services.length > 0) {
        markdown += `\n### Detected Services
`;
        nlpAnalysis.entities.services.forEach((service, index) => {
          markdown += `${index + 1}. ${service.name} (${service.type})
`;
        });
      }

      if (
        nlpAnalysis.intents?.architecturalPatterns &&
        nlpAnalysis.intents.architecturalPatterns.length > 0
      ) {
        markdown += `\n### Architectural Patterns
`;
        nlpAnalysis.intents.architecturalPatterns.forEach((pattern, index) => {
          markdown += `${index + 1}. ${pattern.name} (${pattern.category})
`;
        });
      }
    }

    return markdown;
  }

  /**
   * Apply template to markdown content
   */
  private applyTemplate(markdown: string, template: string): string {
    // Simple template application - in a real implementation, this would use a proper templating engine
    return `${template}\n\n---\n\n${markdown}`;
  }
}
