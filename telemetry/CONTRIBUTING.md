# Contributing to avila-telemetry

Thank you for your interest in contributing to avila-telemetry! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please read and follow it in all your interactions with the project.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected
- Include code samples and test cases if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any alternatives you've considered

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature or bugfix
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass with `cargo test`
6. Run `cargo fmt` to format your code
7. Run `cargo clippy` to check for common mistakes
8. Commit your changes with a clear commit message
9. Push to your fork and submit a pull request

#### Pull Request Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Include tests for new functionality
- Update documentation as needed
- Keep pull requests focused on a single feature or fix

## Development Setup

### Prerequisites

- Rust 1.70 or later
- Cargo

### Building the Project

```bash
# Clone the repository
git clone https://github.com/avilaops/telemetry.git
cd telemetry

# Build the project
cargo build

# Run tests
cargo test

# Run examples
cargo run --example basic_operations
```

### Running Tests

```bash
# Run all tests
cargo test

# Run tests with output
cargo test -- --nocapture

# Run a specific test
cargo test test_name
```

### Code Style

- Use `cargo fmt` to format code
- Use `cargo clippy` to catch common mistakes
- Follow Rust naming conventions
- Add documentation comments for public APIs
- Keep functions focused and concise

## Project Structure

```
telemetry/
├── src/
│   ├── lib.rs              # Library entry point
│   ├── time_series.rs      # Core time series structure
│   ├── anomaly.rs          # Anomaly detection
│   ├── forecasting.rs      # Forecasting models
│   ├── features.rs         # Feature engineering
│   ├── decomposition.rs    # Time series decomposition
│   ├── models.rs           # Statistical models
│   └── models/
│       └── arima.rs        # ARIMA implementation
├── examples/               # Example programs
├── tests/                  # Integration tests
└── benches/               # Benchmarks
```

## Testing

- Write unit tests in the same file as the code being tested
- Write integration tests in the `tests/` directory
- Aim for high test coverage
- Test edge cases and error conditions

## Documentation

- Add rustdoc comments for all public APIs
- Include examples in documentation
- Keep the README.md up to date
- Update CHANGELOG.md for notable changes

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing!
