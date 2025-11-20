# Project Structure

## Overview

`avila-telemetry` is a Rust library for time series analysis, telemetry, and forecasting. The library is designed to be modular, efficient, and easy to use.

## Directory Structure

```
telemetry/
├── src/                    # Source code
│   ├── lib.rs             # Library entry point and public API
│   ├── time_series.rs     # Core TimeSeries data structure
│   ├── anomaly.rs         # Anomaly detection algorithms
│   ├── forecasting.rs     # Forecasting models interface
│   ├── features.rs        # Feature engineering utilities
│   ├── decomposition.rs   # Time series decomposition
│   ├── models.rs          # Statistical models module
│   └── models/
│       └── arima.rs       # ARIMA model implementation
├── examples/              # Example programs
│   ├── basic_operations.rs
│   ├── anomaly_detection.rs
│   ├── forecasting.rs
│   ├── feature_engineering.rs
│   └── decomposition.rs
├── tests/                 # Integration tests
│   └── integration_test.rs
├── benches/              # Performance benchmarks
│   └── time_series_bench.rs
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI pipeline
├── Cargo.toml            # Package manifest
├── README.md             # Main documentation
├── CHANGELOG.md          # Version history
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE-MIT           # MIT license
└── LICENSE-APACHE        # Apache 2.0 license
```

## Module Organization

### Core Modules

- **`time_series`**: Core data structure for representing time series data
  - `TimeSeries` struct with values and optional timestamps
  - Basic operations (moving average, EMA, diff, pct_change)
  - Statistical calculations

- **`anomaly`**: Anomaly detection algorithms
  - Z-score based detection
  - IQR (Interquartile Range) method
  - Moving average deviation
  - Ensemble detection combining multiple methods

- **`forecasting`**: Time series forecasting
  - `Forecaster` trait defining the interface
  - Exponential smoothing implementation
  - Moving average forecaster
  - Confidence interval support

- **`features`**: Feature engineering utilities
  - Lag feature creation
  - Rolling statistics (mean, std, min, max)
  - Trend extraction
  - Rate of change calculations

- **`decomposition`**: Time series decomposition
  - Additive decomposition (Y = T + S + R)
  - Multiplicative decomposition (Y = T × S × R)
  - Trend, seasonal, and residual components

- **`models`**: Statistical models
  - ARIMA (AutoRegressive Integrated Moving Average)
  - Future: SARIMA, Prophet-like models

## Design Principles

1. **Modularity**: Each module is self-contained and can be used independently
2. **Type Safety**: Strong typing with custom error types
3. **Performance**: Efficient memory usage and minimal allocations
4. **Usability**: Clean API with builder patterns and sensible defaults
5. **Extensibility**: Trait-based design allows for custom implementations

## Data Flow

```
Raw Data → TimeSeries
           ↓
    ┌─────┴─────┬──────────┬────────────┐
    ↓           ↓          ↓            ↓
Anomaly    Features   Forecasting   Decomposition
Detection                              
    ↓           ↓          ↓            ↓
Results    Feature     Predictions   Components
           Matrix
```

## Extension Points

### Adding New Forecasting Models

1. Implement the `Forecaster` trait
2. Add the model to `src/models/`
3. Export from `src/models.rs`
4. Add tests and examples

### Adding New Anomaly Detection Methods

1. Add method to `AnomalyDetector` struct in `src/anomaly.rs`
2. Return `Vec<Anomaly>` with detected anomalies
3. Add unit tests
4. Update documentation

### Adding New Feature Engineering Functions

1. Add static method to `FeatureExtractor` in `src/features.rs`
2. Accept `&TimeSeries` and return appropriate type
3. Add comprehensive tests
4. Document the feature and its use cases

## Testing Strategy

- **Unit Tests**: In each module file (`#[cfg(test)]` sections)
- **Integration Tests**: In `tests/` directory
- **Examples**: In `examples/` directory (also serve as smoke tests)
- **Benchmarks**: In `benches/` directory for performance tracking

## Dependencies

- **Core**: `serde`, `chrono` for serialization and time handling
- **Numerical**: `ndarray`, `num-traits` for numerical computing
- **Statistics**: `statrs` for statistical functions
- **Optional**: `rustfft` for frequency domain analysis

## Future Directions

- Real-time streaming support
- GPU acceleration via `cuda` or `opencl`
- More advanced ML-based models
- Integration with data visualization libraries
- Support for multivariate time series
- Distributed computing support
