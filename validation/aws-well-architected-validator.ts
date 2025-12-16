/**
 * AWS Well-Architected Framework Validator
 *
 * Validates AWS architecture against the AWS Well-Architected Framework
 * which includes 6 pillars: Operational Excellence, Security, Reliability,
 * Performance Efficiency, Cost Optimization, and Sustainability
 */
import { ValidationEngine } from './engine';
import { createOperationalExcellenceQuestions } from './pillars/operational-excellence';
import { createSecurityQuestions } from './pillars/security';
import { createReliabilityQuestions } from './pillars/reliability';
import { createPerformanceEfficiencyQuestions } from './pillars/performance-efficiency';
import { createCostOptimizationQuestions } from './pillars/cost-optimization';
import { createSustainabilityQuestions } from './pillars/sustainability';

export interface AWSWellArchitectedPillar {
  name: string;
  description: string;
  questions: AWSWellArchitectedQuestion[];
  score: number;
  recommendations: AWSRecommendation[];
}

export interface AWSWellArchitectedQuestion {
  id: string;
  question: string;
  description: string;
  bestPractices: string[];
  validationRules: ValidationRule[];
  weight: number;
}

export interface ValidationRule {
  id: string;
  description: string;
  validate: (analysisResult: any) => boolean;
  severity: 'critical' | 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface AWSRecommendation {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  pillar: string;
  affectedComponents: string[];
  implementationGuidance: string;
  referenceLinks: string[];
}

export interface AWSWellArchitectedReport {
  overallScore: number;
  pillars: AWSWellArchitectedPillar[];
  criticalIssues: AWSRecommendation[];
  highRiskIssues: AWSRecommendation[];
  mediumRiskIssues: AWSRecommendation[];
  lowRiskIssues: AWSRecommendation[];
  recommendationsByComponent: Record<string, AWSRecommendation[]>;
  timestamp: string;
}

export class AWSWellArchitectedValidator {
  private pillars: AWSWellArchitectedPillar[] = [];

  constructor() {
    this.initializePillars();
  }

  /**
   * Initialize all 6 AWS Well-Architected Framework pillars
   */
  private initializePillars(): void {
    this.pillars = [
      this.createOperationalExcellencePillar(),
      this.createSecurityPillar(),
      this.createReliabilityPillar(),
      this.createPerformanceEfficiencyPillar(),
      this.createCostOptimizationPillar(),
      this.createSustainabilityPillar(),
    ];
  }

  /**
   * Validate architecture against AWS Well-Architected Framework
   */
  async validate(analysisResult: any): Promise<AWSWellArchitectedReport> {
    console.log('Validating AWS architecture against Well-Architected Framework...');

    const report: AWSWellArchitectedReport = {
      overallScore: 0,
      pillars: [],
      criticalIssues: [],
      highRiskIssues: [],
      mediumRiskIssues: [],
      lowRiskIssues: [],
      recommendationsByComponent: {},
      timestamp: new Date().toISOString(),
    };

    // Validate each pillar
    for (const pillar of this.pillars) {
      const validatedPillar = await this.validatePillar(pillar, analysisResult);
      report.pillars.push(validatedPillar);

      // Categorize recommendations by severity
      validatedPillar.recommendations.forEach((recommendation) => {
        switch (recommendation.severity) {
          case 'critical':
            report.criticalIssues.push(recommendation);
            break;
          case 'high':
            report.highRiskIssues.push(recommendation);
            break;
          case 'medium':
            report.mediumRiskIssues.push(recommendation);
            break;
          case 'low':
            report.lowRiskIssues.push(recommendation);
            break;
        }

        // Group recommendations by component
        recommendation.affectedComponents.forEach((component) => {
          if (!report.recommendationsByComponent[component]) {
            report.recommendationsByComponent[component] = [];
          }
          report.recommendationsByComponent[component].push(recommendation);
        });
      });
    }

    // Calculate overall score
    report.overallScore = this.calculateOverallScore(report.pillars);

    return report;
  }

  /**
   * Validate a single pillar
   */
  private async validatePillar(
    pillar: AWSWellArchitectedPillar,
    analysisResult: any,
  ): Promise<AWSWellArchitectedPillar> {
    const validatedPillar: AWSWellArchitectedPillar = {
      ...pillar,
      score: 0,
      recommendations: [],
    };

    let totalWeight = 0;
    let achievedScore = 0;

    // Validate each question in the pillar
    for (const question of pillar.questions) {
      totalWeight += question.weight;

      // Check each validation rule for the question
      let questionScore = 0;
      const questionRecommendations: AWSRecommendation[] = [];

      for (const rule of question.validationRules) {
        const isValid = rule.validate(analysisResult);

        if (!isValid) {
          // Create recommendation for failed validation
          const recommendation: AWSRecommendation = {
            id: `${pillar.name.toLowerCase().replace(/\s+/g, '-')}-${question.id}-${rule.id}`,
            title: `Improve ${question.question}`,
            description: rule.description,
            severity: rule.severity,
            pillar: pillar.name,
            affectedComponents: this.getAffectedComponents(analysisResult, rule),
            implementationGuidance: rule.recommendation,
            referenceLinks: this.getReferenceLinks(pillar.name, question.id, rule.id),
          };

          questionRecommendations.push(recommendation);
        } else {
          questionScore += question.weight;
        }
      }

      // Add question score to pillar score
      achievedScore += questionScore;
      validatedPillar.recommendations.push(...questionRecommendations);
    }

    // Calculate pillar score (0-100)
    validatedPillar.score = totalWeight > 0 ? Math.round((achievedScore / totalWeight) * 100) : 0;

    return validatedPillar;
  }

  /**
   * Calculate overall score based on pillar scores
   */
  private calculateOverallScore(pillars: AWSWellArchitectedPillar[]): number {
    if (pillars.length === 0) return 0;

    const totalScore = pillars.reduce((sum, pillar) => sum + pillar.score, 0);
    return Math.round(totalScore / pillars.length);
  }

  /**
   * Generate a detailed report from the validation results
   */
  public generateDetailedReport(report: AWSWellArchitectedReport): string {
    let detailedReport = `# AWS Well-Architected Framework Validation Report\n\n`;
    detailedReport += `**Generated:** ${report.timestamp}\n\n`;
    detailedReport += `**Overall Score:** ${report.overallScore}/100\n\n`;

    // Summary section
    detailedReport += `## Summary\n\n`;
    detailedReport += `- **Critical Issues:** ${report.criticalIssues.length}\n`;
    detailedReport += `- **High Risk Issues:** ${report.highRiskIssues.length}\n`;
    detailedReport += `- **Medium Risk Issues:** ${report.mediumRiskIssues.length}\n`;
    detailedReport += `- **Low Risk Issues:** ${report.lowRiskIssues.length}\n\n`;

    // Pillar scores
    detailedReport += `## Pillar Scores\n\n`;
    report.pillars.forEach((pillar) => {
      detailedReport += `- **${pillar.name}:** ${pillar.score}/100 (${pillar.recommendations.length} recommendations)\n`;
    });
    detailedReport += `\n`;

    // Critical issues
    if (report.criticalIssues.length > 0) {
      detailedReport += `## Critical Issues\n\n`;
      report.criticalIssues.forEach((issue) => {
        detailedReport += `### ${issue.title}\n`;
        detailedReport += `- **Pillar:** ${issue.pillar}\n`;
        detailedReport += `- **Severity:** ${issue.severity}\n`;
        detailedReport += `- **Affected Components:** ${issue.affectedComponents.join(', ')}\n`;
        detailedReport += `- **Description:** ${issue.description}\n`;
        detailedReport += `- **Recommendation:** ${issue.implementationGuidance}\n`;
        detailedReport += `- **References:** ${issue.referenceLinks.join(', ')}\n\n`;
      });
    }

    // High risk issues
    if (report.highRiskIssues.length > 0) {
      detailedReport += `## High Risk Issues\n\n`;
      report.highRiskIssues.forEach((issue) => {
        detailedReport += `### ${issue.title}\n`;
        detailedReport += `- **Pillar:** ${issue.pillar}\n`;
        detailedReport += `- **Severity:** ${issue.severity}\n`;
        detailedReport += `- **Affected Components:** ${issue.affectedComponents.join(', ')}\n`;
        detailedReport += `- **Description:** ${issue.description}\n`;
        detailedReport += `- **Recommendation:** ${issue.implementationGuidance}\n\n`;
      });
    }

    // Recommendations by component
    detailedReport += `## Recommendations by Component\n\n`;
    Object.entries(report.recommendationsByComponent).forEach(([component, recommendations]) => {
      detailedReport += `### ${component}\n`;
      recommendations.forEach((rec) => {
        detailedReport += `- **${rec.title}** (${rec.severity}): ${rec.description}\n`;
      });
      detailedReport += `\n`;
    });

    // Improvement suggestions
    detailedReport += `## Improvement Suggestions\n\n`;
    detailedReport += `1. **Address Critical Issues First:** Focus on resolving all critical issues before moving to lower severity items.\n`;
    detailedReport += `2. **Pillar Improvement:** Consider focusing on pillars with the lowest scores first.\n`;
    detailedReport += `3. **AWS Best Practices:** Review AWS Well-Architected Framework documentation for each pillar.\n`;
    detailedReport += `4. **Continuous Validation:** Regularly validate your architecture as it evolves.\n`;

    return detailedReport;
  }

  /**
   * Get affected components for a validation rule
   */
  private getAffectedComponents(analysisResult: any, rule: ValidationRule): string[] {
    // Extract affected components based on the rule and analysis result
    const affectedComponents: string[] = [];

    // Look for AWS services in the analysis result
    if (analysisResult.components) {
      analysisResult.components.forEach((component: any) => {
        if (component.isAWSService) {
          affectedComponents.push(component.name);
        }
      });
    }

    return affectedComponents.length > 0 ? affectedComponents : ['Architecture'];
  }

  /**
   * Get reference links for recommendations
   */
  private getReferenceLinks(pillarName: string, questionId: string, ruleId: string): string[] {
    const baseUrl = 'https://docs.aws.amazon.com/wellarchitected/latest/framework/';
    const pillarUrls: Record<string, string> = {
      'Operational Excellence': 'operational-excellence.html',
      Security: 'security.html',
      Reliability: 'reliability.html',
      'Performance Efficiency': 'performance-efficiency.html',
      'Cost Optimization': 'cost-optimization.html',
      Sustainability: 'sustainability.html',
    };

    const pillarUrl = pillarUrls[pillarName] || 'index.html';
    return [`${baseUrl}${pillarUrl}`, `https://aws.amazon.com/architecture/well-architected/`];
  }

  // Pillar definitions will be implemented in the next steps
  private createOperationalExcellencePillar(): AWSWellArchitectedPillar {
    return {
      name: 'Operational Excellence',
      description:
        'Focuses on running and monitoring systems to deliver business value, and continually improving processes and procedures.',
      questions: createOperationalExcellenceQuestions(),
      score: 0,
      recommendations: [],
    };
  }

  private createSecurityPillar(): AWSWellArchitectedPillar {
    return {
      name: 'Security',
      description:
        'Focuses on protecting information and systems through risk assessment and mitigation strategies.',
      questions: createSecurityQuestions(),
      score: 0,
      recommendations: [],
    };
  }

  private createReliabilityPillar(): AWSWellArchitectedPillar {
    return {
      name: 'Reliability',
      description:
        'Focuses on ensuring workloads perform their intended functions correctly and consistently.',
      questions: createReliabilityQuestions(),
      score: 0,
      recommendations: [],
    };
  }

  private createPerformanceEfficiencyPillar(): AWSWellArchitectedPillar {
    return {
      name: 'Performance Efficiency',
      description:
        'Focuses on using computing resources efficiently to meet requirements and maintain efficiency as demand changes.',
      questions: createPerformanceEfficiencyQuestions(),
      score: 0,
      recommendations: [],
    };
  }

  private createCostOptimizationPillar(): AWSWellArchitectedPillar {
    return {
      name: 'Cost Optimization',
      description:
        'Focuses on avoiding unnecessary costs and maximizing business value from AWS services.',
      questions: createCostOptimizationQuestions(),
      score: 0,
      recommendations: [],
    };
  }

  private createSustainabilityPillar(): AWSWellArchitectedPillar {
    return {
      name: 'Sustainability',
      description: 'Focuses on minimizing the environmental impacts of running cloud workloads.',
      questions: createSustainabilityQuestions(),
      score: 0,
      recommendations: [],
    };
  }
}
