/**
 * Documentation Template Manager
 *
 * Manages different documentation templates for various architecture types
 */
import { DocumentationError } from './documentation-error';

export class DocumentationTemplateManager {
  private templates: Record<string, string>;

  constructor() {
    this.templates = this.loadDefaultTemplates();
  }

  /**
   * Get a specific template by name
   */
  getTemplate(templateName: string): string | undefined {
    return this.templates[templateName];
  }

  /**
   * Get all available template names
   */
  getAvailableTemplates(): string[] {
    return Object.keys(this.templates);
  }

  /**
   * Add a custom template
   */
  addTemplate(templateName: string, templateContent: string): void {
    if (!templateName || !templateContent) {
      throw new DocumentationError('Template name and content are required');
    }
    this.templates[templateName] = templateContent;
  }

  /**
   * Remove a template
   */
  removeTemplate(templateName: string): void {
    if (!this.templates[templateName]) {
      throw new DocumentationError(`Template '${templateName}' not found`);
    }
    delete this.templates[templateName];
  }

  /**
   * Load default templates
   */
  private loadDefaultTemplates(): Record<string, string> {
    return {
      serverless: this.createServerlessTemplate(),
      microservices: this.createMicroservicesTemplate(),
      enterprise: this.createEnterpriseTemplate(),
      'security-focused': this.createSecurityFocusedTemplate(),
      'cost-optimized': this.createCostOptimizedTemplate(),
    };
  }

  /**
   * Create serverless template
   */
  private createServerlessTemplate(): string {
    return `# Serverless Architecture Documentation Template

## Serverless Architecture Overview

This template is designed for serverless AWS architectures using Lambda, API Gateway, DynamoDB, and other serverless services.

### Key Characteristics
- Event-driven execution
- Automatic scaling
- Pay-per-use pricing model
- No server management required

### Best Practices for Serverless
1. **Cold Start Mitigation**: Implement provisioned concurrency for critical functions
2. **Stateless Design**: Ensure all functions are stateless
3. **Proper Error Handling**: Implement comprehensive error handling and retries
4. **Monitoring**: Use CloudWatch alarms and X-Ray for tracing
5. **Security**: Apply least privilege IAM roles
`;
  }

  /**
   * Create microservices template
   */
  private createMicroservicesTemplate(): string {
    return `# Microservices Architecture Documentation Template

## Microservices Architecture Overview

This template is designed for microservices-based architectures using ECS, EKS, or Lambda-based microservices.

### Key Characteristics
- Independent service deployment
- Technology diversity
- Decentralized data management
- Resilience through isolation

### Best Practices for Microservices
1. **Service Boundaries**: Clearly define service boundaries and responsibilities
2. **API Design**: Use RESTful or GraphQL APIs with proper versioning
3. **Service Discovery**: Implement proper service discovery mechanisms
4. **Data Consistency**: Handle eventual consistency patterns
5. **Monitoring**: Implement distributed tracing and centralized logging
`;
  }

  /**
   * Create enterprise template
   */
  private createEnterpriseTemplate(): string {
    return `# Enterprise Architecture Documentation Template

## Enterprise Architecture Overview

This template is designed for large-scale enterprise architectures with multiple AWS services and complex requirements.

### Key Characteristics
- Multi-tier architecture
- High availability requirements
- Complex security and compliance needs
- Integration with legacy systems

### Best Practices for Enterprise Architectures
1. **Multi-Region Deployment**: Implement multi-region failover strategies
2. **Compliance**: Ensure compliance with industry standards (HIPAA, GDPR, etc.)
3. **Governance**: Implement proper tagging and resource organization
4. **Disaster Recovery**: Develop comprehensive disaster recovery plans
5. **Performance**: Optimize for enterprise-scale performance requirements
`;
  }

  /**
   * Create security-focused template
   */
  private createSecurityFocusedTemplate(): string {
    return `# Security-Focused Architecture Documentation Template

## Security Architecture Overview

This template is designed for architectures with enhanced security requirements.

### Key Characteristics
- Zero-trust security model
- Comprehensive logging and monitoring
- Encryption at rest and in transit
- Fine-grained access control

### Best Practices for Security-Focused Architectures
1. **IAM**: Implement least privilege access control
2. **Encryption**: Enable encryption for all data storage and transmission
3. **Network Security**: Use VPC, security groups, and network ACLs
4. **Monitoring**: Implement comprehensive security monitoring and alerting
5. **Compliance**: Ensure compliance with security standards (NIST, ISO 27001, etc.)
`;
  }

  /**
   * Create cost-optimized template
   */
  private createCostOptimizedTemplate(): string {
    return `# Cost-Optimized Architecture Documentation Template

## Cost-Optimized Architecture Overview

This template is designed for architectures focused on cost efficiency and optimization.

### Key Characteristics
- Right-sizing of resources
- Reserved instances and savings plans
- Spot instances for fault-tolerant workloads
- Cost monitoring and optimization

### Best Practices for Cost-Optimized Architectures
1. **Right-Sizing**: Regularly review and right-size resources
2. **Reserved Capacity**: Utilize reserved instances and savings plans
3. **Auto-Scaling**: Implement proper auto-scaling policies
4. **Cost Monitoring**: Set up cost monitoring and alerts
5. **Resource Tagging**: Implement comprehensive resource tagging for cost allocation
`;
  }
}
