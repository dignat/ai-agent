/**
 * Utility Functions
 *
 * Common helper functions used throughout the application
 */

export function formatAWSResourceName(name: string): string {
  return name.replace(/\s+/g, '-').toLowerCase();
}

export function validateAWSServiceType(type: string): boolean {
  const validServices = ['ec2', 's3', 'lambda', 'rds', 'dynamodb', 'api-gateway', 'cloudfront'];
  return validServices.includes(type.toLowerCase());
}
