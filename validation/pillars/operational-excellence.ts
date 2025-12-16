/**
 * Operational Excellence Pillar
 *
 * Focuses on running and monitoring systems to deliver business value,
 * and continually improving processes and procedures.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createOperationalExcellenceQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'opex-1',
      question: 'How do you understand your workload?',
      description: 'Understanding workload requirements, priorities, and success criteria',
      bestPractices: [
        'Define clear business objectives and success criteria',
        'Document workload requirements and constraints',
        'Establish key performance indicators (KPIs)',
      ],
      validationRules: [
        {
          id: 'opex-1-1',
          description: 'Workload should have documented requirements',
          validate: (analysisResult: any) => {
            return analysisResult.requirements && analysisResult.requirements.length > 0;
          },
          severity: 'medium',
          recommendation:
            'Document clear business requirements and technical constraints for the workload. Use AWS documentation templates to capture key information.',
        },
      ],
      weight: 2,
    },
    {
      id: 'opex-2',
      question: 'How do you structure your organization to support your business outcomes?',
      description: 'Organizational structure and team capabilities',
      bestPractices: [
        'Align team structure with business outcomes',
        'Define clear roles and responsibilities',
        'Establish cross-functional collaboration',
      ],
      validationRules: [
        {
          id: 'opex-2-1',
          description: 'Team structure should be documented',
          validate: (analysisResult: any) => {
            return (
              analysisResult.patterns &&
              analysisResult.patterns.some(
                (p: any) =>
                  p.name.includes('team') ||
                  p.name.includes('organization') ||
                  p.name.includes('collaboration'),
              )
            );
          },
          severity: 'low',
          recommendation:
            'Document team structure, roles, and responsibilities. Consider using AWS Organizational Units and IAM roles for clear separation of duties.',
        },
      ],
      weight: 1,
    },
    {
      id: 'opex-3',
      question: 'How do you design your workload so that you can understand its state?',
      description: 'Observability and monitoring capabilities',
      bestPractices: [
        'Implement comprehensive logging',
        'Set up monitoring and alerting',
        'Use AWS CloudWatch for centralized monitoring',
        'Implement distributed tracing for microservices',
      ],
      validationRules: [
        {
          id: 'opex-3-1',
          description: 'Architecture should include monitoring services',
          validate: (analysisResult: any) => {
            const hasMonitoring =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('CloudWatch') ||
                  c.name.includes('monitoring') ||
                  c.name.includes('logging'),
              );
            return hasMonitoring;
          },
          severity: 'high',
          recommendation:
            'Implement AWS CloudWatch for logging and monitoring. Consider CloudWatch Alarms for critical metrics and CloudWatch Logs Insights for log analysis.',
        },
        {
          id: 'opex-3-2',
          description: 'Architecture should include alerting mechanisms',
          validate: (analysisResult: any) => {
            const hasAlerting =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('SNS') ||
                  c.name.includes('alert') ||
                  c.name.includes('notification'),
              );
            return hasAlerting;
          },
          severity: 'medium',
          recommendation:
            'Set up alerting using Amazon SNS for notifications and AWS CloudWatch Alarms for threshold-based alerts. Consider implementing multi-channel notifications.',
        },
      ],
      weight: 3,
    },
  ];
}
