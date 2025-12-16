/**
 * Comprehensive Mermaid Diagram Generator
 *
 * Generates multiple types of architecture diagrams using Mermaid.js syntax
 * Supports component diagrams, data flow diagrams, system architecture diagrams, and sequence diagrams
 * Includes AWS service icons, customization options, and error handling
 */

import { ArchitectureAnalysis, AWSComponent } from '../types/index';
import { AWSServiceCatalog } from '../src/nlp/service-catalog';

export interface DiagramOptions {
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  layoutDirection?: 'TB' | 'LR' | 'RL' | 'BT';
  showIcons?: boolean;
  showDescriptions?: boolean;
  colorScheme?: 'aws' | 'modern' | 'classic';
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'spacious';
}

export interface DiagramResult {
  type: string;
  title: string;
  mermaidCode: string;
  success: boolean;
  error?: string;
}

export class MermaidDiagramGenerator {
  private serviceCatalog: AWSServiceCatalog;
  private defaultOptions: DiagramOptions;

  constructor() {
    this.serviceCatalog = new AWSServiceCatalog();
    this.defaultOptions = {
      theme: 'default',
      layoutDirection: 'TB',
      showIcons: true,
      showDescriptions: false,
      colorScheme: 'aws',
      fontSize: 'medium',
      spacing: 'normal',
    };
  }

  /**
   * Generate all diagram types for the given architecture analysis
   */
  async generateAllDiagrams(
    analysis: ArchitectureAnalysis,
    options: DiagramOptions = {},
  ): Promise<DiagramResult[]> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const results: DiagramResult[] = [];

    try {
      // Generate component diagram
      results.push(await this.generateComponentDiagram(analysis, mergedOptions));

      // Generate data flow diagram
      results.push(await this.generateDataFlowDiagram(analysis, mergedOptions));

      // Generate system architecture diagram
      results.push(await this.generateSystemArchitectureDiagram(analysis, mergedOptions));

      // Generate sequence diagram
      results.push(await this.generateSequenceDiagram(analysis, mergedOptions));

      return results;
    } catch (error) {
      console.error('Error generating diagrams:', error);
      return [
        {
          type: 'error',
          title: 'Diagram Generation Error',
          mermaidCode: `Error generating diagrams: ${error instanceof Error ? error.message : String(error)}`,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        },
      ];
    }
  }

  /**
   * Generate component diagram showing AWS services and their relationships
   */
  async generateComponentDiagram(
    analysis: ArchitectureAnalysis,
    options: DiagramOptions = {},
  ): Promise<DiagramResult> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      const components = analysis.components || [];
      const relationships = analysis.relationships || [];

      if (components.length === 0) {
        return {
          type: 'component',
          title: 'Component Diagram',
          mermaidCode: this.generateEmptyDiagram('No components found for component diagram'),
          success: false,
          error: 'No components available for diagram generation',
        };
      }

      const mermaidCode = this.buildMermaidCode(
        `
        componentDiagram
        ${this.getDiagramHeader('Component Diagram', mergedOptions)}

        %% AWS Components
        ${components.map((comp) => this.generateComponentDefinition(comp, mergedOptions)).join('\n        ')}

        %% Relationships
        ${relationships.map((rel, index) => this.generateComponentRelationship(rel, index, mergedOptions)).join('\n        ')}

        %% Style
        ${this.generateComponentStyles(components, mergedOptions)}
      `,
        mergedOptions,
      );

      return {
        type: 'component',
        title: 'Component Diagram',
        mermaidCode,
        success: true,
      };
    } catch (error) {
      return this.handleDiagramError('component', error);
    }
  }

  /**
   * Generate data flow diagram showing information flow between components
   */
  async generateDataFlowDiagram(
    analysis: ArchitectureAnalysis,
    options: DiagramOptions = {},
  ): Promise<DiagramResult> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      const components = analysis.components || [];
      const relationships = analysis.relationships || [];

      if (components.length === 0) {
        return {
          type: 'data-flow',
          title: 'Data Flow Diagram',
          mermaidCode: this.generateEmptyDiagram('No components found for data flow diagram'),
          success: false,
          error: 'No components available for diagram generation',
        };
      }

      const mermaidCode = this.buildMermaidCode(
        `
        flowchart ${mergedOptions.layoutDirection}
        ${this.getDiagramHeader('Data Flow Diagram', mergedOptions)}

        %% Data Flow Components
        ${components.map((comp) => this.generateDataFlowComponent(comp, mergedOptions)).join('\n        ')}

        %% Data Flow Relationships
        ${relationships.map((rel, index) => this.generateDataFlowRelationship(rel, index, mergedOptions)).join('\n        ')}

        %% Style
        ${this.generateDataFlowStyles(components, mergedOptions)}
      `,
        mergedOptions,
      );

      return {
        type: 'data-flow',
        title: 'Data Flow Diagram',
        mermaidCode,
        success: true,
      };
    } catch (error) {
      return this.handleDiagramError('data-flow', error);
    }
  }

  /**
   * Generate system architecture diagram with proper AWS service representation
   */
  async generateSystemArchitectureDiagram(
    analysis: ArchitectureAnalysis,
    options: DiagramOptions = {},
  ): Promise<DiagramResult> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      const components = analysis.components || [];
      const relationships = analysis.relationships || [];
      const patterns = analysis.patterns || [];

      if (components.length === 0) {
        return {
          type: 'system-architecture',
          title: 'System Architecture Diagram',
          mermaidCode: this.generateEmptyDiagram(
            'No components found for system architecture diagram',
          ),
          success: false,
          error: 'No components available for diagram generation',
        };
      }

      const mermaidCode = this.buildMermaidCode(
        `
        graph ${mergedOptions.layoutDirection}
        ${this.getDiagramHeader('System Architecture Diagram', mergedOptions)}

        %% System Components
        ${components.map((comp) => this.generateSystemComponent(comp, mergedOptions)).join('\n        ')}

        %% System Relationships
        ${relationships.map((rel, index) => this.generateSystemRelationship(rel, index, mergedOptions)).join('\n        ')}

        %% Architecture Patterns
        ${patterns.length > 0 ? `%% Patterns: ${patterns.join(', ')}` : ''}

        %% Style
        ${this.generateSystemStyles(components, mergedOptions)}
      `,
        mergedOptions,
      );

      return {
        type: 'system-architecture',
        title: 'System Architecture Diagram',
        mermaidCode,
        success: true,
      };
    } catch (error) {
      return this.handleDiagramError('system-architecture', error);
    }
  }

  /**
   * Generate sequence diagram showing component interactions
   */
  async generateSequenceDiagram(
    analysis: ArchitectureAnalysis,
    options: DiagramOptions = {},
  ): Promise<DiagramResult> {
    try {
      const mergedOptions = { ...this.defaultOptions, ...options };
      const components = analysis.components || [];
      const relationships = analysis.relationships || [];

      if (components.length === 0) {
        return {
          type: 'sequence',
          title: 'Sequence Diagram',
          mermaidCode: this.generateEmptyDiagram('No components found for sequence diagram'),
          success: false,
          error: 'No components available for diagram generation',
        };
      }

      const mermaidCode = this.buildMermaidCode(
        `
        sequenceDiagram
        ${this.getDiagramHeader('Sequence Diagram', mergedOptions)}

        %% Participants
        ${components.map((comp) => `participant ${this.getComponentId(comp)}`).join('\n        ')}

        %% Interactions
        ${relationships.map((rel, index) => this.generateSequenceInteraction(rel, index, mergedOptions)).join('\n        ')}

        %% Style
        ${this.generateSequenceStyles(components, mergedOptions)}
      `,
        mergedOptions,
      );

      return {
        type: 'sequence',
        title: 'Sequence Diagram',
        mermaidCode,
        success: true,
      };
    } catch (error) {
      return this.handleDiagramError('sequence', error);
    }
  }

  // Helper methods for diagram generation
  private getComponentId(component: AWSComponent): string {
    return component.name.replace(/\s+/g, '_');
  }

  private getAWSIcon(component: AWSComponent): string {
    if (!component.isAWSService) return '';

    // Try to find service by exact name first
    let service = this.serviceCatalog.findService(component.name);

    // If not found, try to find by partial match (e.g., "EC2 Instance" -> "EC2")
    if (!service) {
      const serviceName = component.name.split(' ')[0]; // Get first word
      service = this.serviceCatalog.findService(serviceName);
    }

    if (!service) return '';

    // Simple icon representation based on service type
    const icons: Record<string, string> = {
      compute: '🖥️',
      storage: '💾',
      database: '🗃️',
      networking: '🌐',
      security: '🔒',
      management: '⚙️',
      ai: '🤖',
      serverless: '⚡',
    };

    return icons[service.type] || '🔧';
  }

  private generateComponentDefinition(component: AWSComponent, options: DiagramOptions): string {
    const icon = options.showIcons ? this.getAWSIcon(component) : '';
    const description =
      options.showDescriptions && component.description
        ? `
          ${component.description}`
        : '';

    return `component ${this.getComponentId(component)} {
        ${icon} ${component.name}${description}
      }`;
  }

  private generateDataFlowComponent(component: AWSComponent, options: DiagramOptions): string {
    const icon = options.showIcons ? this.getAWSIcon(component) : '';
    return `${this.getComponentId(component)}[${icon} ${component.name}]`;
  }

  private generateSystemComponent(component: AWSComponent, options: DiagramOptions): string {
    const icon = options.showIcons ? this.getAWSIcon(component) : '';
    return `${this.getComponentId(component)}[${icon} ${component.name}]`;
  }

  private generateComponentRelationship(
    relationship: any,
    index: number,
    options: DiagramOptions,
  ): string {
    const source = this.getComponentId(
      relationship.source || { name: `Component_${index}_Source` },
    );
    const target = this.getComponentId(
      relationship.target || { name: `Component_${index}_Target` },
    );

    return `${source} --> ${target} : ${relationship.type || 'depends on'}`;
  }

  private generateDataFlowRelationship(
    relationship: any,
    index: number,
    options: DiagramOptions,
  ): string {
    const source = this.getComponentId(
      relationship.source || { name: `Component_${index}_Source` },
    );
    const target = this.getComponentId(
      relationship.target || { name: `Component_${index}_Target` },
    );

    const arrowType = relationship.type === 'data' ? '-->' : '---';
    const label = relationship.description || relationship.type || 'data flow';

    return `${source} ${arrowType}|${label}| ${target}`;
  }

  private generateSystemRelationship(
    relationship: any,
    index: number,
    options: DiagramOptions,
  ): string {
    const source = this.getComponentId(
      relationship.source || { name: `Component_${index}_Source` },
    );
    const target = this.getComponentId(
      relationship.target || { name: `Component_${index}_Target` },
    );

    const arrowType = relationship.type === 'dependency' ? '-->' : '---';
    const label = relationship.description || relationship.type || 'connects to';

    return `${source} ${arrowType}|${label}| ${target}`;
  }

  private generateSequenceInteraction(
    relationship: any,
    index: number,
    options: DiagramOptions,
  ): string {
    const source = this.getComponentId(
      relationship.source || { name: `Component_${index}_Source` },
    );
    const target = this.getComponentId(
      relationship.target || { name: `Component_${index}_Target` },
    );

    const message = relationship.description || relationship.type || 'message';
    const arrowType = relationship.type === 'async' ? '->>' : '->';

    return `${source}${arrowType}${target}: ${message}`;
  }

  private generateComponentStyles(components: AWSComponent[], options: DiagramOptions): string {
    return components
      .map((comp) => {
        const color = this.getComponentColor(comp, options);
        return `style ${this.getComponentId(comp)} fill:${color},stroke:#333`;
      })
      .join('\n        ');
  }

  private generateDataFlowStyles(components: AWSComponent[], options: DiagramOptions): string {
    return components
      .map((comp) => {
        const color = this.getComponentColor(comp, options);
        return `style ${this.getComponentId(comp)} fill:${color},stroke:#333`;
      })
      .join('\n        ');
  }

  private generateSystemStyles(components: AWSComponent[], options: DiagramOptions): string {
    return components
      .map((comp) => {
        const color = this.getComponentColor(comp, options);
        return `style ${this.getComponentId(comp)} fill:${color},stroke:#333`;
      })
      .join('\n        ');
  }

  private generateSequenceStyles(components: AWSComponent[], options: DiagramOptions): string {
    return components
      .map((comp) => {
        const color = this.getComponentColor(comp, options);
        return `style ${this.getComponentId(comp)} fill:${color},stroke:#333`;
      })
      .join('\n        ');
  }

  private getComponentColor(component: AWSComponent, options: DiagramOptions): string {
    if (!component.isAWSService) return '#f9f';

    // Try to find service by exact name first
    let service = this.serviceCatalog.findService(component.name);

    // If not found, try to find by partial match (e.g., "EC2 Instance" -> "EC2")
    if (!service) {
      const serviceName = component.name.split(' ')[0]; // Get first word
      service = this.serviceCatalog.findService(serviceName);
    }

    if (!service) return '#bbf';

    // Color scheme based on service type
    const colors: Record<string, string> = {
      compute: '#FF9900', // AWS orange
      storage: '#FF9900', // AWS orange
      database: '#232F3E', // AWS dark blue
      networking: '#FF9900', // AWS orange
      security: '#232F3E', // AWS dark blue
      management: '#FF9900', // AWS orange
      ai: '#232F3E', // AWS dark blue
      serverless: '#FF9900', // AWS orange
    };

    return colors[service.type] || '#bbf';
  }

  private getDiagramHeader(title: string, options: DiagramOptions): string {
    return `%% ${title}\n        %% Layout: ${options.layoutDirection}\n        %% Theme: ${options.theme}`;
  }

  private buildMermaidCode(content: string, options: DiagramOptions): string {
    // Apply theme settings
    let mermaidCode = content.trim();

    // Add theme configuration
    if (options.theme !== 'default') {
      mermaidCode = `%%{init: { 'theme': '${options.theme}' } }%%\n${mermaidCode}`;
    }

    return mermaidCode;
  }

  private generateEmptyDiagram(message: string): string {
    return `%% Empty Diagram\n        %% ${message}\n        graph TD\n        A[No Components] --> B[${message}]`;
  }

  private handleDiagramError(type: string, error: unknown): DiagramResult {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error generating ${type} diagram:`, errorMessage);

    return {
      type,
      title: `${this.capitalizeFirstLetter(type)} Diagram Error`,
      mermaidCode: `%% Error generating ${type} diagram\n        graph TD\n        A[Error] --> B[${errorMessage}]`,
      success: false,
      error: errorMessage,
    };
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export default MermaidDiagramGenerator;
