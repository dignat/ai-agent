/**
 * Sustainability Pillar
 *
 * Focuses on minimizing the environmental impacts of running cloud workloads.
 */
import { AWSWellArchitectedQuestion, ValidationRule } from '../aws-well-architected-validator';

export function createSustainabilityQuestions(): AWSWellArchitectedQuestion[] {
  return [
    {
      id: 'sust-1',
      question: 'How do you understand your impact?',
      description: 'Environmental impact awareness and measurement',
      bestPractices: [
        'Measure and monitor resource utilization',
        'Use AWS Customer Carbon Footprint Tool',
        'Optimize resource usage to reduce environmental impact',
        'Consider renewable energy options',
      ],
      validationRules: [
        {
          id: 'sust-1-1',
          description: 'Architecture should consider sustainability practices',
          validate: (analysisResult: any) => {
            // Check for patterns that suggest sustainability awareness
            const hasSustainability =
              analysisResult.patterns &&
              analysisResult.patterns.some(
                (p: any) =>
                  p.name.includes('sustainability') ||
                  p.name.includes('carbon') ||
                  p.name.includes('energy efficiency'),
              );
            return hasSustainability;
          },
          severity: 'low',
          recommendation:
            'Implement sustainability practices by optimizing resource utilization, using AWS Customer Carbon Footprint Tool to measure impact, and considering renewable energy options where available.',
        },
      ],
      weight: 1,
    },
  ];
}
