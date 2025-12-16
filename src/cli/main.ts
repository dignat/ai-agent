/**
 * AWS Architecture Agent CLI - Main Entry Point
 *
 * This is the main entry point for the AWS Architecture Agent CLI application.
 * It initializes and runs the comprehensive CLI interface.
 */
import { AWSArchitectureCLI } from './index';

async function main() {
  console.log('AWS Architecture Agent CLI - Starting...');

  try {
    // Create and run the CLI
    const cli = new AWSArchitectureCLI();
    await cli.run();

    console.log('AWS Architecture Agent CLI - Completed');
  } catch (error) {
    console.error('AWS Architecture Agent CLI - Error:', error);
    process.exit(1);
  }
}

// Run the main function
main();