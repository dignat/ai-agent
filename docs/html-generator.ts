/**
 * HTML Documentation Generator
 *
 * Generates comprehensive HTML documentation with proper styling
 */
import { ArchitectureAnalysis } from '../types';
import { DocumentationError } from './documentation-error';

export class HTMLGenerator {
  /**
   * Generate HTML documentation from architecture analysis
   */
  async generate(analysisResult: ArchitectureAnalysis): Promise<string> {
    try {
      if (!analysisResult) {
        throw new DocumentationError('No analysis result provided for HTML generation');
      }

      const html = this.buildHTMLDocumentation(analysisResult);
      return html;
    } catch (error) {
      throw new DocumentationError(
        `HTML generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Generate HTML documentation using a specific template
   */
  async generateWithTemplate(
    analysisResult: ArchitectureAnalysis,
    template: string,
  ): Promise<string> {
    try {
      if (!analysisResult) {
        throw new DocumentationError(
          'No analysis result provided for template-based HTML generation',
        );
      }

      // Apply template to the HTML generation
      const baseHTML = this.buildHTMLDocumentation(analysisResult);
      return this.applyTemplate(baseHTML, template);
    } catch (error) {
      throw new DocumentationError(
        `Template-based HTML generation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Build comprehensive HTML documentation
   */
  private buildHTMLDocumentation(analysisResult: ArchitectureAnalysis): string {
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

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS Architecture Documentation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        header {
            background-color: #232F3E;
            color: white;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        h1, h2, h3 {
            color: #232F3E;
        }
        .section {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .component, .relationship, .pattern, .requirement, .constraint, .practice {
            background-color: #f0f0f0;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #232F3E;
        }
        .aws-service {
            background-color: #FF9900;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.8em;
            display: inline-block;
        }
        .validation-section {
            background-color: #e8f5e9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .error {
            color: #d32f2f;
            background-color: #ffebee;
        }
        .warning {
            color: #ffa000;
            background-color: #fff3e0;
        }
        .suggestion {
            color: #388e3c;
            background-color: #e8f5e9;
        }
        footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <header>
        <h1>AWS Architecture Documentation</h1>
        <p>Comprehensive analysis of your AWS architecture</p>
    </header>

    <div class="section">
        <h2>Architecture Overview</h2>
        <p><strong>Confidence Level:</strong> ${(confidence || 0) * 100}%</p>
        <p><strong>Analysis Date:</strong> ${new Date().toISOString()}</p>
        <p><strong>Components:</strong> ${components.length}</p>
        <p><strong>Patterns:</strong> ${patterns.length}</p>
    </div>
`;

    // Add components section
    if (components && components.length > 0) {
      html += `    <div class="section">
        <h2>Components</h2>
`;

      components.forEach((component) => {
        html += `        <div class="component">
            <h3>${component.name} <span class="aws-service">${component.isAWSService ? 'AWS Service' : 'Custom Component'}</span></h3>
            <p><strong>Type:</strong> ${component.type}</p>
            <p><strong>Description:</strong> ${component.description || 'No description available'}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add relationships section
    if (relationships && relationships.length > 0) {
      html += `    <div class="section">
        <h2>Relationships</h2>
`;

      relationships.forEach((relationship) => {
        html += `        <div class="relationship">
            <h3>${relationship.type}</h3>
            <p><strong>Description:</strong> ${relationship.description || 'No description available'}</p>
            <p><strong>Confidence:</strong> ${relationship.confidence || 'Unknown'}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add patterns section
    if (patterns && patterns.length > 0) {
      html += `    <div class="section">
        <h2>Architecture Patterns</h2>
`;

      patterns.forEach((pattern) => {
        const patternName =
          typeof pattern === 'string' ? pattern : (pattern as any).name || 'Unknown';
        const patternCategory =
          typeof pattern === 'object' && (pattern as any).category
            ? (pattern as any).category
            : 'General';
        const patternServices =
          typeof pattern === 'object' && (pattern as any).services ? (pattern as any).services : [];

        html += `        <div class="pattern">
            <h3>${patternName}</h3>
            <p><strong>Category:</strong> ${patternCategory}</p>
            <p><strong>Services:</strong> ${Array.isArray(patternServices) ? patternServices.join(', ') : 'Not specified'}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add requirements section
    if (requirements && requirements.length > 0) {
      html += `    <div class="section">
        <h2>Requirements</h2>
`;

      requirements.forEach((requirement) => {
        html += `        <div class="requirement">
            <p>${requirement}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add constraints section
    if (constraints && constraints.length > 0) {
      html += `    <div class="section">
        <h2>Constraints</h2>
`;

      constraints.forEach((constraint) => {
        html += `        <div class="constraint">
            <p>${constraint}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add best practices section
    if (bestPractices && bestPractices.length > 0) {
      html += `    <div class="section">
        <h2>Best Practices</h2>
`;

      bestPractices.forEach((practice) => {
        html += `        <div class="practice">
            <p>${practice}</p>
        </div>
`;
      });

      html += `    </div>
`;
    }

    // Add validation section
    if (validation) {
      html += `    <div class="section">
        <h2>Validation Results</h2>
        <div class="validation-section">
            <p><strong>Overall Confidence:</strong> ${validation.confidence * 100}%</p>
            <p><strong>Errors:</strong> ${validation.errors?.length || 0}</p>
            <p><strong>Warnings:</strong> ${validation.warnings?.length || 0}</p>
            <p><strong>Suggestions:</strong> ${validation.suggestions?.length || 0}</p>
        </div>
`;

      if (validation.errors && validation.errors.length > 0) {
        html += `        <h3 class="error">Critical Issues</h3>
`;
        validation.errors.forEach((error) => {
          html += `        <div class="error">
            <p>${error}</p>
        </div>
`;
        });
      }

      if (validation.warnings && validation.warnings.length > 0) {
        html += `        <h3 class="warning">Warnings</h3>
`;
        validation.warnings.forEach((warning) => {
          html += `        <div class="warning">
            <p>${warning}</p>
        </div>
`;
        });
      }

      if (validation.suggestions && validation.suggestions.length > 0) {
        html += `        <h3 class="suggestion">Suggestions</h3>
`;
        validation.suggestions.forEach((suggestion) => {
          html += `        <div class="suggestion">
            <p>${suggestion}</p>
        </div>
`;
        });
      }

      html += `    </div>
`;
    }

    // Add NLP analysis section if available
    if (nlpAnalysis) {
      html += `    <div class="section">
        <h2>NLP Analysis</h2>
        <p><strong>Original Text:</strong> ${nlpAnalysis.originalText || 'Not available'}</p>
`;

      if (nlpAnalysis.entities?.services && nlpAnalysis.entities.services.length > 0) {
        html += `        <h3>Detected Services</h3>
`;
        nlpAnalysis.entities.services.forEach((service) => {
          html += `        <div class="component">
            <h4>${service.name}</h4>
            <p><strong>Type:</strong> ${service.type}</p>
        </div>
`;
        });
      }

      if (
        nlpAnalysis.intents?.architecturalPatterns &&
        nlpAnalysis.intents.architecturalPatterns.length > 0
      ) {
        html += `        <h3>Architectural Patterns</h3>
`;
        nlpAnalysis.intents.architecturalPatterns.forEach((pattern) => {
          html += `        <div class="pattern">
            <h4>${pattern.name}</h4>
            <p><strong>Category:</strong> ${pattern.category}</p>
        </div>
`;
        });
      }

      html += `    </div>
`;
    }

    html += `    <footer>
        <p>Generated by AWS Architecture Agent - ${new Date().toISOString()}</p>
    </footer>
</body>
</html>`;

    return html;
  }

  /**
   * Apply template to HTML content
   */
  private applyTemplate(html: string, template: string): string {
    // Simple template application - in a real implementation, this would use a proper templating engine
    return `${template}\n\n---\n\n${html}`;
  }
}
