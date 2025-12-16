/**
 * Reliability Pillar
 *
 * Focuses on ensuring workloads perform their intended functions
 * correctly and consistently.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createReliabilityQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'rel-1',
      question: 'How do you plan for disaster recovery?',
      description: 'Disaster recovery planning and implementation',
      bestPractices: [
        'Implement backup and restore procedures',
        'Use multi-AZ deployments for critical components',
        'Implement failover mechanisms',
        'Test disaster recovery procedures regularly',
      ],
      validationRules: [
        {
          id: 'rel-1-1',
          description: 'Architecture should include backup components',
          validate: (analysisResult: any) => {
            const hasBackup =
              analysisResult.components &&
              analysisResult.components.some(
                (c: any) =>
                  c.name.includes('backup') ||
                  c.name.includes('Backup') ||
                  c.name.includes('S3') ||
                  c.name.includes('EBS'),
              );
            return hasBackup;
          },
          severity: 'high',
          recommendation:
            'Implement AWS Backup for centralized backup management. Use Amazon S3 for durable object storage and Amazon EBS snapshots for block storage backup. Consider implementing cross-region replication for critical data.',
        },
      ],
      weight: 3,
    },
  ];
}
