# AWS Architecture Agent 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

A comprehensive **AWS Architecture Agent** for analyzing, validating, and generating AWS architecture diagrams and documentation.

## 🌟 Features

- **Natural Language Processing** - Analyze AWS architecture from text descriptions
- **Diagram Generation** - Create Mermaid, PlantUML, and Graphviz diagrams
- **Architecture Validation** - Validate against AWS Well-Architected Framework
- **Comprehensive Documentation** - Generate Markdown, HTML, PDF, and code documentation
- **CLI Interface** - Powerful command-line interface for all operations

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/aws-architecture-agent.git
cd aws-architecture-agent

# Install dependencies
npm install

# Build the project
npm run build

# Start the CLI
npm run start
```

### Basic Usage

```bash
# Analyze architecture from text
aws-arch-agent analyze --text "Build a serverless e-commerce app with Lambda and DynamoDB"

# Generate architecture diagrams
aws-arch-agent generate --type mermaid --output architecture.md

# Validate architecture against best practices
aws-arch-agent validate --input architecture.json

# Generate comprehensive documentation
aws-arch-agent document --format markdown --output docs/
```

## 📚 CLI Commands

### `analyze` - Analyze AWS Architecture

Analyze AWS architecture from text descriptions or files.

```bash
aws-arch-agent analyze [options] [text]

Options:
  -f, --file <path>          Path to file containing requirements
  -j, --json <path>          Path to JSON architecture file
  -y, --yaml <path>          Path to YAML architecture file
  -o, --output <path>        Output file path for analysis results
  -f, --format <format>      Output format (json, text, markdown)
  --no-nlp                   Disable NLP processing
  --confidence-threshold <threshold>  Minimum confidence threshold
```

**Examples:**
```bash
# Analyze from text
aws-arch-agent analyze "Create a microservices architecture with ECS, RDS, and SQS"

# Analyze from file
aws-arch-agent analyze --file requirements.txt

# Analyze with output
aws-arch-agent analyze --text "Serverless app" --output analysis.json --format json
```

### `generate` - Generate Architecture Diagrams

Generate architecture diagrams and visualizations.

```bash
aws-arch-agent generate [options]

Options:
  -i, --input <path>        Input file path (JSON/YAML) or text
  -t, --type <type>         Diagram type (mermaid, plantuml, graphviz)
  -o, --output <path>       Output file path
  -f, --format <format>     Output format (svg, png, pdf)
  --title <title>           Diagram title
  --theme <theme>           Diagram theme (default, dark, light)
```

**Examples:**
```bash
# Generate from analysis
aws-arch-agent generate --input analysis.json --type mermaid --output diagram.md

# Generate with custom title
aws-arch-agent generate --text "Lambda + API Gateway" --title "Serverless Architecture"
```

### `validate` - Validate AWS Architecture

Validate AWS architecture against best practices and AWS Well-Architected Framework.

```bash
aws-arch-agent validate [options]

Options:
  -i, --input <path>        Input file path (JSON/YAML) or text
  -o, --output <path>       Output file path for validation report
  -f, --format <format>     Output format (json, text, markdown)
  --pillar <pillar>         Specific pillar to validate
  --severity <level>        Minimum severity level
```

**Validation Pillars:**
- `security` - Security best practices
- `reliability` - Reliability best practices
- `performance` - Performance efficiency
- `cost` - Cost optimization
- `operational` - Operational excellence
- `sustainability` - Sustainability

**Examples:**
```bash
# Validate all pillars
aws-arch-agent validate --input architecture.json

# Validate specific pillar
aws-arch-agent validate --input architecture.json --pillar security

# Validate with severity filter
aws-arch-agent validate --text "My architecture" --severity high
```

### `document` - Generate Comprehensive Documentation

Generate comprehensive documentation in multiple formats.

```bash
aws-arch-agent document [options]

Options:
  -i, --input <path>        Input file path (JSON/YAML) or text
  -f, --format <format>     Output format (markdown, html, pdf, code)
  -o, --output <path>       Output directory path
  -t, --template <template>  Documentation template to use
  --title <title>           Document title
  --author <author>         Document author
  --all-formats             Generate all documentation formats
```

**Examples:**
```bash
# Generate Markdown documentation
aws-arch-agent document --input analysis.json --format markdown --output docs/

# Generate all formats
aws-arch-agent document --input analysis.json --all-formats --output complete-docs/

# Generate with custom template
aws-arch-agent document --text "My architecture" --template aws-best-practices --format html
```

### `demo` - Run Demonstrations

Run demonstrations of AWS Architecture Agent capabilities.

```bash
aws-arch-agent demo [options]

Options:
  -t, --type <type>         Demo type (nlp, input-parser, documentation, all)
  -o, --output <path>       Output directory for demo results
```

**Demo Types:**
- `nlp` - Natural Language Processing demo
- `input-parser` - Input parser demo
- `documentation` - Documentation generation demo
- `all` - Run all demos

**Examples:**
```bash
# Run NLP demo
aws-arch-agent demo --type nlp

# Run all demos with output
aws-arch-agent demo --type all --output demo-results/
```

## 📁 File Formats

### Input Formats
- **Text** - Natural language descriptions
- **JSON** - Structured JSON architecture definitions
- **YAML** - YAML architecture definitions

### Output Formats
- **JSON** - Structured analysis results
- **Markdown** - Formatted documentation
- **HTML** - Web-ready documentation
- **PDF** - Print-ready documentation
- **Code** - Implementation code templates

## 🔧 Configuration

The application can be configured through:

1. **Command-line options** - As shown in the command reference
2. **Environment variables** - For system-wide configuration
3. **Configuration files** - JSON/YAML configuration files

## 📦 Project Structure

```
aws-architecture-agent/
├── src/                  # Source code
│   ├── cli/              # CLI interface
│   ├── architecture/     # Architecture analysis
│   ├── docs/             # Documentation generation
│   ├── diagrams/         # Diagram generation
│   ├── input-parser/     # Input parsing
│   ├── nlp/              # Natural Language Processing
│   └── validation/       # Architecture validation
├── types/               # Type definitions
├── utils/               # Utility functions
├── examples/            # Example architectures
├── docs/                # Documentation
└── test/                # Tests
```

## 🛠️ Development

### Build & Run

```bash
# Build the project
npm run build

# Run in development mode
npm run dev

# Start the CLI
npm run start

# Run CLI directly
npm run cli
```

### Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run validation tests
npm run test:validation
```

### Code Quality

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## 📖 Examples

### Example 1: Serverless Architecture Analysis

```bash
aws-arch-agent analyze --text "Build a serverless e-commerce platform using AWS services. It should include Lambda functions for backend processing, API Gateway for REST endpoints, DynamoDB for product data, S3 for image storage, and CloudFront for CDN. The system must be highly available, secure, and GDPR compliant."
```

### Example 2: Architecture Validation

```bash
aws-arch-agent validate --input architecture.json --pillar security --severity high
```

### Example 3: Complete Documentation

```bash
aws-arch-agent document --input analysis-results.json --all-formats --output project-docs/
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**AWS Architecture Agent** - Your comprehensive tool for AWS architecture analysis, validation, and documentation generation! 🚀