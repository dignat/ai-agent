/**
 * Performance Efficiency Pillar
 *
 * Focuses on using computing resources efficiently to meet requirements
 * and maintain efficiency as demand changes.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createPerformanceEfficiencyQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'perf-1',
      question: 'How do you select your compute solution?',
      description: 'Compute resource selection and optimization',
      bestPractices: [
        'Right-size compute instances',
        'Use auto-scaling for variable workloads',
        'Consider serverless options for appropriate workloads',
        'Use AWS Compute Optimizer for recommendations',
      ],
      validationRules: [
        {
          id: 'perf-1-1',
          description: 'Architecture should include auto-scaling components',
          validate: (analysisResult: any) => {
            const hasAutoScaling =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('Auto Scaling') ||
                  c.name.includes('auto-scaling') ||
                  c.name.includes('scaling'),
              );
            return hasAutoScaling;
          },
          severity: 'medium',
          recommendation:
            'Implement AWS Auto Scaling for compute resources. Use Amazon EC2 Auto Scaling for EC2 instances and Application Auto Scaling for other AWS services. Consider using AWS Compute Optimizer to get right-sizing recommendations.',
        },
      ],
      weight: 2,
    },
  ];
}
