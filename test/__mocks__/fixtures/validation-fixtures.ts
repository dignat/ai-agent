/**
 * Validation Fixtures
 *
 * Mock data for validation testing
 */
export const mockValidationResults = {
  goodArchitecture: {
    overallScore: 85,
    criticalIssues: [],
    highRiskIssues: [],
    mediumRiskIssues: [
      {
        message: 'Consider adding monitoring for all components',
        severity: 'medium',
        pillar: 'Operational Excellence',
        component: 'Lambda Function',
      },
    ],
    lowRiskIssues: [
      {
        message: 'Documentation could be more detailed',
        severity: 'low',
        pillar: 'Operational Excellence',
        component: 'API Gateway',
      },
    ],
    pillars: [
      {
        name: 'Operational Excellence',
        score: 80,
        recommendations: [
          {
            description: 'Add CloudWatch monitoring',
            severity: 'medium',
            component: 'Lambda Function',
          },
        ],
      },
      {
        name: 'Security',
        score: 90,
        recommendations: [],
      },
      {
        name: 'Reliability',
        score: 85,
        recommendations: [],
      },
      {
        name: 'Performance Efficiency',
        score: 80,
        recommendations: [],
      },
      {
        name: 'Cost Optimization',
        score: 90,
        recommendations: [],
      },
      {
        name: 'Sustainability',
        score: 75,
        recommendations: [
          {
            description: 'Consider using Graviton processors',
            severity: 'low',
            component: 'Lambda Function',
          },
        ],
      },
    ],
  },
  poorArchitecture: {
    overallScore: 40,
    criticalIssues: [
      {
        message: 'No monitoring components detected',
        severity: 'critical',
        pillar: 'Operational Excellence',
        component: 'All Components',
      },
      {
        message: 'No security components detected',
        severity: 'critical',
        pillar: 'Security',
        component: 'All Components',
      },
    ],
    highRiskIssues: [
      {
        message: 'Single point of failure detected',
        severity: 'high',
        pillar: 'Reliability',
        component: 'EC2 Instance',
      },
    ],
    mediumRiskIssues: [
      {
        message: 'No backup strategy detected',
        severity: 'medium',
        pillar: 'Reliability',
        component: 'DynamoDB Table',
      },
    ],
    lowRiskIssues: [],
    pillars: [
      {
        name: 'Operational Excellence',
        score: 30,
        recommendations: [
          {
            description: 'Add CloudWatch monitoring',
            severity: 'critical',
            component: 'All Components',
          },
          {
            description: 'Implement logging',
            severity: 'critical',
            component: 'All Components',
          },
        ],
      },
      {
        name: 'Security',
        score: 20,
        recommendations: [
          {
            description: 'Add IAM roles and policies',
            severity: 'critical',
            component: 'All Components',
          },
        ],
      },
      {
        name: 'Reliability',
        score: 40,
        recommendations: [
          {
            description: 'Add multi-AZ deployment',
            severity: 'high',
            component: 'EC2 Instance',
          },
        ],
      },
      {
        name: 'Performance Efficiency',
        score: 50,
        recommendations: [],
      },
      {
        name: 'Cost Optimization',
        score: 60,
        recommendations: [],
      },
      {
        name: 'Sustainability',
        score: 30,
        recommendations: [
          {
            description: 'Use spot instances where possible',
            severity: 'medium',
            component: 'EC2 Instance',
          },
        ],
      },
    ],
  },
  emptyArchitecture: {
    overallScore: 10,
    criticalIssues: [
      {
        message: 'No components detected in architecture',
        severity: 'critical',
        pillar: 'All Pillars',
        component: 'None',
      },
    ],
    highRiskIssues: [],
    mediumRiskIssues: [],
    lowRiskIssues: [],
    pillars: [
      {
        name: 'Operational Excellence',
        score: 10,
        recommendations: [
          {
            description: 'Add components to architecture',
            severity: 'critical',
            component: 'None',
          },
        ],
      },
      {
        name: 'Security',
        score: 10,
        recommendations: [
          {
            description: 'Add security components',
            severity: 'critical',
            component: 'None',
          },
        ],
      },
      {
        name: 'Reliability',
        score: 10,
        recommendations: [
          {
            description: 'Add reliability components',
            severity: 'critical',
            component: 'None',
          },
        ],
      },
      {
        name: 'Performance Efficiency',
        score: 10,
        recommendations: [],
      },
      {
        name: 'Cost Optimization',
        score: 10,
        recommendations: [],
      },
      {
        name: 'Sustainability',
        score: 10,
        recommendations: [],
      },
    ],
  },
};

export const mockValidationErrorCases = {
  invalidArchitecture: {
    components: null,
    relationships: null,
    patterns: null,
  },
  malformedArchitecture: {
    components: [{ name: null, type: null }],
    relationships: [{ source: null, target: null }],
    patterns: [null],
  },
  unsupportedServices: {
    components: [
      { name: 'NonExistentService', type: 'unknown', isAWSService: true },
      { name: 'AnotherFakeService', type: 'invalid', isAWSService: true },
    ],
    relationships: [],
    patterns: [],
  },
};