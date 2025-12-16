/**
 * Security Pillar
 *
 * Focuses on protecting information and systems through risk assessment
 * and mitigation strategies.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createSecurityQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'sec-1',
      question: 'How do you securely operate your workload?',
      description: 'Security operations and incident response',
      bestPractices: [
        'Implement security monitoring and alerting',
        'Establish incident response procedures',
        'Use AWS GuardDuty for threat detection',
        'Implement AWS Security Hub for centralized security management',
      ],
      validationRules: [
        {
          id: 'sec-1-1',
          description: 'Architecture should include security monitoring',
          validate: (analysisResult: any) => {
            const hasSecurityMonitoring =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('GuardDuty') ||
                  c.name.includes('Security Hub') ||
                  c.name.includes('security monitoring'),
              );
            return hasSecurityMonitoring;
          },
          severity: 'high',
          recommendation:
            'Implement AWS GuardDuty for threat detection and AWS Security Hub for centralized security management. Set up security monitoring and alerting for critical security events.',
        },
      ],
      weight: 3,
    },
    {
      id: 'sec-2',
      question: 'How do you manage identities for people and machines?',
      description: 'Identity and access management',
      bestPractices: [
        'Use AWS IAM for identity management',
        'Implement least privilege access',
        'Use temporary credentials where possible',
        'Implement multi-factor authentication',
      ],
      validationRules: [
        {
          id: 'sec-2-1',
          description: 'Architecture should include IAM components',
          validate: (analysisResult: any) => {
            const hasIAM =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('IAM') ||
                  c.name.includes('identity') ||
                  c.name.includes('access management'),
              );
            return hasIAM;
          },
          severity: 'critical',
          recommendation:
            'Implement AWS IAM for identity and access management. Use IAM roles, policies, and groups to implement least privilege access control. Consider using AWS IAM Access Analyzer to identify unused permissions.',
        },
      ],
      weight: 4,
    },
  ];
}
