# avila-telemetry

[![Crates.io](https://img.shields.io/crates/v/avila-telemetry.svg)](https://crates.io/crates/avila-telemetry)
[![Documentation](https://docs.rs/avila-telemetry/badge.svg)](https://docs.rs/avila-telemetry)
[![License](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue.svg)](README.md#license)

Time series analysis, telemetry, and forecasting library for Rust.

## Features

- **Time Series Analysis**
  - ARIMA, SARIMA models
  - State Space Models
  - Moving averages (SMA, EMA)
  - Differencing and transformations

- **Anomaly Detection**
  - Statistical anomaly detection (Z-score, IQR)
  - ML-based detection methods
  - Real-time monitoring capabilities
  - Ensemble detection methods

- **Forecasting**
  - Multi-step ahead prediction
  - Probabilistic forecasting with confidence intervals
  - Exponential smoothing
  - Moving average forecasting

- **Feature Engineering**
  - Lag features creation
  - Rolling statistics (mean, std, min, max)
  - Seasonality decomposition
  - Trend extraction

## Installation

Add this to your `Cargo.toml`:

```toml
[dependencies]
avila-telemetry = "0.1"
```

## Quick Start

```rust
use avila_telemetry::{TimeSeries, AnomalyDetector, Forecaster, ExponentialSmoothing};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a time series
    let data = vec![1.0, 2.0, 3.0, 2.0, 1.0, 100.0, 2.0, 3.0];
    let ts = TimeSeries::new(data);

    // Detect anomalies
    let detector = AnomalyDetector::default();
    let anomalies = detector.detect_zscore(&ts)?;
    println!("Found {} anomalies", anomalies.len());

    // Forecast future values
    let mut forecaster = ExponentialSmoothing::new(0.3)?;
    forecaster.fit(&ts)?;
    let forecast = forecaster.forecast(5)?;
    println!("Predictions: {:?}", forecast.predictions);

    Ok(())
}
```

## Examples

### Moving Average

```rust
use avila_telemetry::TimeSeries;

let ts = TimeSeries::new(vec![1.0, 2.0, 3.0, 4.0, 5.0]);
let ma = ts.moving_average(3)?;
println!("Moving average: {:?}", ma);
```

### Anomaly Detection

```rust
use avila_telemetry::{TimeSeries, AnomalyDetector};

let data = vec![1.0, 2.0, 3.0, 2.0, 1.0, 100.0, 2.0, 3.0];
let ts = TimeSeries::new(data);

let detector = AnomalyDetector::default();
let anomalies = detector.detect_ensemble(&ts)?;

for anomaly in anomalies {
    println!("Anomaly at index {}: value = {}, score = {}",
             anomaly.index, anomaly.value, anomaly.score);
}
```

### Feature Engineering

```rust
use avila_telemetry::{TimeSeries, FeatureExtractor};

let ts = TimeSeries::new(vec![1.0, 2.0, 3.0, 4.0, 5.0]);

// Create lag features
let lags = FeatureExtractor::create_lag_features(&ts, &[1, 2, 3])?;

// Calculate rolling statistics
let stats = FeatureExtractor::rolling_statistics(&ts, 3)?;
println!("Rolling means: {:?}", stats.means);
```

### Time Series Decomposition

```rust
use avila_telemetry::{TimeSeries, Decomposer, DecompositionType};

let ts = TimeSeries::new(seasonal_data);
let decomposer = Decomposer::new(DecompositionType::Additive, 4)?;
let result = decomposer.decompose(&ts)?;

println!("Trend: {:?}", result.trend);
println!("Seasonal: {:?}", result.seasonal);
println!("Residual: {:?}", result.residual);
```

## Architecture

The library is organized into several modules:

- `time_series`: Core time series data structure and operations
- `anomaly`: Anomaly detection algorithms
- `forecasting`: Forecasting models and interfaces
- `features`: Feature engineering utilities
- `decomposition`: Time series decomposition methods
- `models`: Statistical models (ARIMA, etc.)

## Performance

The library is designed for performance with:
- Efficient memory usage with `Vec<f64>` backing
- Minimal allocations in hot paths
- Optional FFT support for frequency domain analysis

## Roadmap

- [ ] SARIMA (Seasonal ARIMA) implementation
- [ ] Prophet-like forecasting
- [ ] More ML-based anomaly detection
- [ ] GPU acceleration support
- [ ] Streaming/online algorithms
- [ ] Time series clustering

## Dependencies

Part of the `avila-*` ecosystem:
- Built on top of standard Rust numerical libraries
- Can integrate with `avila-ml` for ML-based methods
- Uses `avila-signal` for signal processing features

## License

Licensed under either of:

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE))
- MIT license ([LICENSE-MIT](LICENSE-MIT))

at your option.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

#### 12. **avila-forensics** (Análise Forense)
```
Análise forense de imagens e vídeos
```
- **Image Forensics**
  - Copy-move detection
  - Splicing detection
  - Deepfake detection
  - EXIF analysis

- **Video Forensics**
  - Frame tampering
  - Video authenticity

- **Steganography**
  - Hidden data detection
  - Watermark extraction

**Depende de**: avila-image, avila-vision
**Usado por**: Investigações, segurança

---
