/**
 * NLP Error Handler
 *
 * Handles error detection, validation, and ambiguous requirement resolution
 */

export class NLPErrorHandler {
  /**
   * Validate and handle errors in structured data
   */
  validateAndHandleErrors(structuredData: any): any {
    const validationResult = {
      ...structuredData,
      validation: {
        errors: [],
        warnings: [],
        suggestions: [],
        confidence: structuredData.confidence,
      },
    };

    // Validate architecture completeness
    this.validateArchitectureCompleteness(structuredData, validationResult);

    // Check for ambiguous requirements
    this.checkForAmbiguousRequirements(structuredData, validationResult);

    // Validate service compatibility
    this.validateServiceCompatibility(structuredData, validationResult);

    // Check for missing best practices
    this.checkForMissingBestPractices(structuredData, validationResult);

    // Adjust confidence based on validation
    validationResult.confidence = this.adjustConfidenceBasedOnValidation(validationResult);

    return validationResult;
  }

  /**
   * Validate architecture completeness
   */
  private validateArchitectureCompleteness(structuredData: any, validationResult: any): void {
    const architecture = structuredData.architecture;

    // Check for minimum components
    if (architecture.components.length === 0) {
      validationResult.validation.errors.push({
        type: 'missing-components',
        message: 'No components detected in the architecture',
        severity: 'high',
        suggestion: 'Please provide more specific requirements about the system components',
      });
    }

    // Check for minimum services
    if (architecture.services.length === 0) {
      validationResult.validation.errors.push({
        type: 'missing-services',
        message: 'No AWS services detected',
        severity: 'high',
        suggestion: 'Mention specific AWS services or describe the type of application',
      });
    }

    // Check for basic requirements
    if (architecture.requirements.length === 0 && architecture.constraints.length === 0) {
      validationResult.validation.warnings.push({
        type: 'missing-requirements',
        message: 'No specific requirements or constraints detected',
        severity: 'medium',
        suggestion: 'Consider adding performance, security, or cost requirements',
      });
    }
  }

  /**
   * Check for ambiguous requirements
   */
  private checkForAmbiguousRequirements(structuredData: any, validationResult: any): void {
    const architecture = structuredData.architecture;
    const text = JSON.stringify(architecture);

    // Check for vague terms
    const vagueTerms = [
      'some',
      'few',
      'several',
      'many',
      'various',
      'good',
      'better',
      'best',
      'fast',
      'quick',
      'reliable',
      'stable',
      'efficient',
      'optimized',
    ];

    for (const term of vagueTerms) {
      if (text.toLowerCase().includes(term)) {
        validationResult.validation.warnings.push({
          type: 'vague-requirement',
          message: `Vague term detected: "${term}"`,
          severity: 'low',
          suggestion: `Replace "${term}" with specific metrics or requirements`,
        });
      }
    }

    // Check for conflicting requirements
    this.checkForConflictingRequirements(architecture, validationResult);
  }

  /**
   * Check for conflicting requirements
   */
  private checkForConflictingRequirements(architecture: any, validationResult: any): void {
    const requirements = architecture.requirements;
    const constraints = architecture.constraints;

    // Check for cost vs performance conflicts
    const costRequirement = requirements.find(
      (r: any) => r.type === 'cost' && r.value === 'cost-effective',
    );
    const performanceRequirement = requirements.find(
      (r: any) => r.type === 'performance' && r.value === 'low-latency',
    );

    if (costRequirement && performanceRequirement) {
      validationResult.validation.warnings.push({
        type: 'conflicting-requirements',
        message: 'Potential conflict between cost-effectiveness and low-latency requirements',
        severity: 'medium',
        suggestion: 'Consider trade-offs between cost and performance, or specify priorities',
      });
    }

    // Check for security vs usability conflicts
    const securityRequirement = requirements.find((r: any) => r.type === 'security');
    const constraintsWithSecurityImpact = constraints.filter(
      (c: any) =>
        c.description.toLowerCase().includes('user experience') ||
        c.description.toLowerCase().includes('ease of use'),
    );

    if (securityRequirement && constraintsWithSecurityImpact.length > 0) {
      validationResult.validation.warnings.push({
        type: 'security-usability-tradeoff',
        message: 'Potential trade-off between security requirements and usability constraints',
        severity: 'medium',
        suggestion: 'Consider security best practices that maintain good user experience',
      });
    }
  }

  /**
   * Validate service compatibility
   */
  private validateServiceCompatibility(structuredData: any, validationResult: any): void {
    const services = structuredData.architecture.services.map((s: any) => s.serviceName);

    // Check for incompatible service combinations
    const incompatibleCombinations = [
      {
        services: ['EC2', 'Lambda'],
        message: 'Mixing EC2 and Lambda may indicate unclear architectural direction',
        suggestion: 'Consider whether you need traditional servers or serverless approach',
      },
      {
        services: ['RDS', 'DynamoDB'],
        message: 'Using both RDS and DynamoDB may indicate unclear data storage needs',
        suggestion: 'Choose based on your data access patterns and consistency requirements',
      },
    ];

    for (const combination of incompatibleCombinations) {
      const hasAllServices = combination.services.every((service) => services.includes(service));

      if (hasAllServices) {
        validationResult.validation.warnings.push({
          type: 'service-compatibility',
          message: combination.message,
          severity: 'medium',
          suggestion: combination.suggestion,
        });
      }
    }
  }

  /**
   * Check for missing best practices
   */
  private checkForMissingBestPractices(structuredData: any, validationResult: any): void {
    const bestPractices = structuredData.architecture.bestPractices;
    const services = structuredData.architecture.services.map((s: any) => s.serviceName);

    // Check for missing security best practices
    const hasSecurityServices = services.some((s: string) =>
      ['IAM', 'KMS', 'WAF', 'GuardDuty'].includes(s),
    );

    const hasSecurityBestPractice = bestPractices.some((bp: any) => bp.type.includes('security'));

    if (!hasSecurityServices && !hasSecurityBestPractice) {
      validationResult.validation.suggestions.push({
        type: 'missing-security',
        message: 'No security services or best practices detected',
        severity: 'medium',
        suggestion: 'Consider adding IAM, KMS, or other security services for production workloads',
      });
    }

    // Check for missing availability best practices
    const hasMultiAZServices = services.some((s: string) => ['RDS', 'EC2', 'EKS'].includes(s));

    const hasAvailabilityBestPractice = bestPractices.some((bp: any) =>
      bp.type.includes('availability'),
    );

    if (hasMultiAZServices && !hasAvailabilityBestPractice) {
      validationResult.validation.suggestions.push({
        type: 'missing-availability',
        message: 'Multi-AZ deployment not explicitly mentioned for stateful services',
        severity: 'medium',
        suggestion: 'Consider Multi-AZ deployment for RDS, EC2, or EKS for high availability',
      });
    }
  }

  /**
   * Adjust confidence based on validation results
   */
  private adjustConfidenceBasedOnValidation(validationResult: any): number {
    const errors = validationResult.validation.errors;
    const warnings = validationResult.validation.warnings;

    let confidenceAdjustment = 0;

    // Reduce confidence for errors
    if (errors.length > 0) {
      confidenceAdjustment -= errors.length * 0.15;
    }

    // Reduce confidence for warnings
    if (warnings.length > 0) {
      confidenceAdjustment -= warnings.length * 0.05;
    }

    // Ensure confidence doesn't go below minimum
    const newConfidence = Math.max(0.1, validationResult.confidence + confidenceAdjustment);

    return parseFloat(newConfidence.toFixed(2));
  }
}
