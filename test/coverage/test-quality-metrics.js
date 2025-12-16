/**
 * Test Quality Metrics Script
 *
 * Script to analyze and report test quality metrics
 */
const fs = require('fs');
const path = require('path');

class TestQualityMetrics {
  constructor() {
    this.testFiles = [];
    this.totalTests = 0;
    this.totalAssertions = 0;
    this.coverageData = null;
  }

  async analyzeTestQuality() {
    console.log('🔍 Analyzing Test Quality Metrics...');

    try {
      // Find all test files
      await this.findTestFiles();

      // Analyze test files
      await this.analyzeTestFiles();

      // Load coverage data if available
      await this.loadCoverageData();

      // Generate report
      this.generateQualityReport();

      console.log('✅ Test quality analysis completed successfully');
      return true;
    } catch (error) {
      console.error('❌ Error analyzing test quality:', error);
      return false;
    }
  }

  async findTestFiles() {
    const testDirs = ['test', 'src', 'validation', 'diagrams', 'docs'];

    for (const dir of testDirs) {
      if (fs.existsSync(dir)) {
        const files = this.findFilesRecursively(dir, '.test.ts');
        this.testFiles.push(...files);
      }
    }

    console.log(`📁 Found ${this.testFiles.length} test files`);
  }

  findFilesRecursively(dir, extension) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.findFilesRecursively(fullPath, extension));
      } else if (item.endsWith(extension)) {
        files.push(fullPath);
      }
    }

    return files;
  }

  async analyzeTestFiles() {
    for (const file of this.testFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const fileMetrics = this.analyzeTestFileContent(content);
        this.totalTests += fileMetrics.tests;
        this.totalAssertions += fileMetrics.assertions;

        console.log(`📄 ${path.basename(file)}: ${fileMetrics.tests} tests, ${fileMetrics.assertions} assertions`);
      } catch (error) {
        console.error(`❌ Error analyzing ${file}:`, error.message);
      }
    }
  }

  analyzeTestFileContent(content) {
    const tests = (content.match(/it\(|test\(/g) || []).length;
    const assertions = (content.match(/expect\(/g) || []).length;

    return { tests, assertions };
  }

  async loadCoverageData() {
    const coveragePath = path.join('coverage', 'coverage-summary.json');

    if (fs.existsSync(coveragePath)) {
      try {
        const coverageContent = fs.readFileSync(coveragePath, 'utf8');
        this.coverageData = JSON.parse(coverageContent);
        console.log('📊 Coverage data loaded successfully');
      } catch (error) {
        console.error('❌ Error loading coverage data:', error.message);
      }
    } else {
      console.log('ℹ️  Coverage data not found - run tests with coverage to generate');
    }
  }

  generateQualityReport() {
    console.log('\n📈 Test Quality Metrics Report');
    console.log('='.repeat(50));

    // Test Quantity Metrics
    console.log('📊 Test Quantity Metrics:');
    console.log(`  Total Test Files: ${this.testFiles.length}`);
    console.log(`  Total Tests: ${this.totalTests}`);
    console.log(`  Total Assertions: ${this.totalAssertions}`);
    console.log(`  Average Assertions per Test: ${(this.totalAssertions / this.totalTests).toFixed(2)}`);

    // Coverage Metrics
    if (this.coverageData) {
      console.log('\n🎯 Coverage Metrics:');
      console.log(`  Lines: ${this.coverageData.total.lines.pct}%`);
      console.log(`  Functions: ${this.coverageData.total.functions.pct}%`);
      console.log(`  Branches: ${this.coverageData.total.branches.pct}%`);
      console.log(`  Statements: ${this.coverageData.total.statements.pct}%`);
    }

    // Quality Indicators
    console.log('\n✨ Quality Indicators:');
    const assertionDensity = this.totalAssertions / this.totalTests;
    const qualityScore = this.calculateQualityScore();

    console.log(`  Assertion Density: ${assertionDensity.toFixed(2)}`);
    console.log(`  Quality Score: ${qualityScore.toFixed(2)}/100`);

    // Recommendations
    console.log('\n💡 Recommendations:');
    this.generateRecommendations(qualityScore);

    console.log('='.repeat(50));
  }

  calculateQualityScore() {
    let score = 0;

    // Test quantity contributes 30% of score
    const testQuantityScore = Math.min(100, (this.totalTests / 100) * 30);
    score += testQuantityScore;

    // Assertion density contributes 20% of score
    const assertionDensity = this.totalAssertions / this.totalTests;
    const assertionScore = Math.min(100, (assertionDensity * 10) * 20);
    score += assertionScore;

    // Coverage contributes 50% of score
    if (this.coverageData) {
      const coverageScore =
        (this.coverageData.total.lines.pct +
          this.coverageData.total.functions.pct +
          this.coverageData.total.branches.pct +
          this.coverageData.total.statements.pct) /
        4;
      score += coverageScore * 0.5;
    }

    return Math.min(100, Math.max(0, score));
  }

  generateRecommendations(qualityScore) {
    if (qualityScore >= 90) {
      console.log('  🎉 Excellent test quality! Keep up the good work.');
    } else if (qualityScore >= 80) {
      console.log('  👍 Good test quality. Consider adding more edge case tests.');
    } else if (qualityScore >= 70) {
      console.log('  ⚠️  Adequate test quality. Focus on increasing coverage and test depth.');
    } else if (qualityScore >= 60) {
      console.log('  ⚠️  Test quality needs improvement. Add more comprehensive tests.');
    } else {
      console.log('  ❌ Poor test quality. Significant testing improvements needed.');
    }

    if (this.totalAssertions / this.totalTests < 2) {
      console.log('  📈 Consider adding more assertions per test for better validation.');
    }

    if (this.coverageData && this.coverageData.total.lines.pct < 80) {
      console.log('  🎯 Focus on increasing line coverage to at least 80%.');
    }
  }

  async generateHtmlReport(outputPath = 'test-quality-report.html') {
    try {
      const htmlContent = this.generateHtmlContent();
      fs.writeFileSync(outputPath, htmlContent);
      console.log(`📄 HTML report generated: ${outputPath}`);
      return true;
    } catch (error) {
      console.error('❌ Error generating HTML report:', error.message);
      return false;
    }
  }

  generateHtmlContent() {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Test Quality Metrics Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
    .metrics { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .quality-indicator { font-size: 24px; font-weight: bold; margin: 20px 0; }
    .good { color: #27ae60; }
    .warning { color: #f39c12; }
    .bad { color: #e74c3c; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #3498db; color: white; }
    tr:hover { background-color: #f5f5f5; }
  </style>
</head>
<body>
  <h1>🧪 Test Quality Metrics Report</h1>

  <div class="metrics">
    <h2>📊 Test Quantity Metrics</h2>
    <table>
      <tr>
        <th>Metric</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Total Test Files</td>
        <td>${this.testFiles.length}</td>
      </tr>
      <tr>
        <td>Total Tests</td>
        <td>${this.totalTests}</td>
      </tr>
      <tr>
        <td>Total Assertions</td>
        <td>${this.totalAssertions}</td>
      </tr>
      <tr>
        <td>Average Assertions per Test</td>
        <td>${(this.totalAssertions / this.totalTests).toFixed(2)}</td>
      </tr>
    </table>
  </div>

  ${this.coverageData ? `
  <div class="metrics">
    <h2>🎯 Coverage Metrics</h2>
    <table>
      <tr>
        <th>Type</th>
        <th>Coverage</th>
      </tr>
      <tr>
        <td>Lines</td>
        <td>${this.coverageData.total.lines.pct}%</td>
      </tr>
      <tr>
        <td>Functions</td>
        <td>${this.coverageData.total.functions.pct}%</td>
      </tr>
      <tr>
        <td>Branches</td>
        <td>${this.coverageData.total.branches.pct}%</td>
      </tr>
      <tr>
        <td>Statements</td>
        <td>${this.coverageData.total.statements.pct}%</td>
      </tr>
    </table>
  </div>
  ` : ''}

  <div class="metrics">
    <h2>✨ Quality Indicators</h2>
    <div class="quality-indicator">
      Quality Score: <span class="${this.calculateQualityScore() >= 80 ? 'good' : this.calculateQualityScore() >= 60 ? 'warning' : 'bad'}">
        ${this.calculateQualityScore().toFixed(2)}/100
      </span>
    </div>
    <p>Assertion Density: ${(this.totalAssertions / this.totalTests).toFixed(2)}</p>
  </div>

  <div class="metrics">
    <h2>💡 Recommendations</h2>
    <ul>
      ${this.generateHtmlRecommendations()}
    </ul>
  </div>

  <div class="metrics">
    <h2>📁 Test Files</h2>
    <ul>
      ${this.testFiles.map(file => `<li>${path.relative(process.cwd(), file)}</li>`).join('')}
    </ul>
  </div>
</body>
</html>
`;
  }

  generateHtmlRecommendations() {
    const qualityScore = this.calculateQualityScore();
    const recommendations = [];

    if (qualityScore >= 90) {
      recommendations.push('<li>🎉 Excellent test quality! Keep up the good work.</li>');
    } else if (qualityScore >= 80) {
      recommendations.push('<li>👍 Good test quality. Consider adding more edge case tests.</li>');
    } else if (qualityScore >= 70) {
      recommendations.push('<li>⚠️  Adequate test quality. Focus on increasing coverage and test depth.</li>');
    } else if (qualityScore >= 60) {
      recommendations.push('<li>⚠️  Test quality needs improvement. Add more comprehensive tests.</li>');
    } else {
      recommendations.push('<li>❌ Poor test quality. Significant testing improvements needed.</li>');
    }

    if (this.totalAssertions / this.totalTests < 2) {
      recommendations.push('<li>📈 Consider adding more assertions per test for better validation.</li>');
    }

    if (this.coverageData && this.coverageData.total.lines.pct < 80) {
      recommendations.push('<li>🎯 Focus on increasing line coverage to at least 80%.</li>');
    }

    return recommendations.join('');
  }
}

// Run the analysis if this script is executed directly
if (require.main === module) {
  const metrics = new TestQualityMetrics();
  metrics.analyzeTestQuality().then(() => {
    metrics.generateHtmlReport();
  });
}

module.exports = TestQualityMetrics;