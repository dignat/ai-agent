/**
 * Cost Optimization Pillar
 *
 * Focuses on avoiding unnecessary costs and maximizing business value
 * from AWS services.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createCostOptimizationQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'cost-1',
      question: 'How do you understand and control your costs?',
      description: 'Cost awareness and control mechanisms',
      bestPractices: [
        'Implement cost allocation tags',
        'Set up budget alerts',
        'Use AWS Cost Explorer for cost analysis',
        'Implement cost optimization recommendations',
      ],
      validationRules: [
        {
          id: 'cost-1-1',
          description: 'Architecture should include cost monitoring components',
          validate: (analysisResult: any) => {
            const hasCostMonitoring =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('Cost Explorer') ||
                  c.name.includes('budget') ||
                  c.name.includes('cost monitoring'),
              );
            return hasCostMonitoring;
          },
          severity: 'medium',
          recommendation:
            'Implement AWS Cost Explorer for cost analysis and AWS Budgets for cost monitoring and alerts. Use cost allocation tags to track costs by project, department, or environment.',
        },
      ],
      weight: 2,
    },
  ];
}
