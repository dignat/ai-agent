/**
 * Validation Engine
 *
 * Validates AWS architecture against best practices
 */
import { AWSWellArchitectedValidator } from './aws-well-architected-validator';

export class ValidationEngine {
  private awsWellArchitectedValidator: AWSWellArchitectedValidator;

  constructor() {
    this.awsWellArchitectedValidator = new AWSWellArchitectedValidator();
  }

  async validate(analysisResult: any): Promise<any> {
    console.log('Validating AWS architecture against best practices...');

    // Run AWS Well-Architected Framework validation
    const wellArchitectedReport = await this.awsWellArchitectedValidator.validate(analysisResult);

    // Generate detailed report
    const detailedReport =
      this.awsWellArchitectedValidator.generateDetailedReport(wellArchitectedReport);

    return {
      issues: wellArchitectedReport.criticalIssues.concat(wellArchitectedReport.highRiskIssues),
      warnings: wellArchitectedReport.mediumRiskIssues,
      recommendations: wellArchitectedReport.lowRiskIssues,
      wellArchitectedReport: wellArchitectedReport,
      detailedReport: detailedReport,
      overallScore: wellArchitectedReport.overallScore,
      pillarScores: wellArchitectedReport.pillars.map((pillar) => ({
        name: pillar.name,
        score: pillar.score,
        recommendationsCount: pillar.recommendations.length,
      })),
    };
  }
}
