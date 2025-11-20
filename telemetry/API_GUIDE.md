# API Documentation Guide

## Quick Reference

### Core Types

- `TimeSeries` - Main data structure for time series
- `AnomalyDetector` - Detect anomalies in time series data
- `Forecaster` - Trait for forecasting models
- `FeatureExtractor` - Extract features from time series
- `Decomposer` - Decompose time series into components

### Error Handling

All operations return `Result<T, TelemetryError>`:

```rust
use avila_telemetry::{TimeSeries, TelemetryError};

fn example() -> Result<(), TelemetryError> {
    let ts = TimeSeries::new(vec![1.0, 2.0, 3.0]);
    let ma = ts.moving_average(2)?;
    Ok(())
}
```

## TimeSeries

### Creation

```rust
use avila_telemetry::TimeSeries;
use chrono::Utc;

// Simple time series
let ts = TimeSeries::new(vec![1.0, 2.0, 3.0]);

// With name
let ts = TimeSeries::new(data).with_name("my_series");

// With timestamps
let timestamps = vec![Utc::now(); 3];
let ts = TimeSeries::with_timestamps(data, timestamps)?;
```

### Operations

```rust
// Moving average
let ma = ts.moving_average(window_size)?;

// Exponential moving average
let ema = ts.exponential_moving_average(alpha)?;

// First difference
let diff = ts.diff();

// Percentage change
let pct = ts.pct_change();

// Statistics
let stats = ts.statistics();
println!("Mean: {}, StdDev: {}", stats.mean, stats.std_dev);

// Slice
let subset = ts.slice(start, end)?;
```

## Anomaly Detection

### Basic Usage

```rust
use avila_telemetry::{TimeSeries, AnomalyDetector};

let ts = TimeSeries::new(data);
let detector = AnomalyDetector::default();

// Z-score method
let anomalies = detector.detect_zscore(&ts)?;

// IQR method
let anomalies = detector.detect_iqr(&ts)?;

// Ensemble method
let anomalies = detector.detect_ensemble(&ts)?;

// Custom parameters
let detector = AnomalyDetector::new(z_threshold, iqr_multiplier);
```

### Anomaly Structure

```rust
pub struct Anomaly {
    pub index: usize,      // Position in time series
    pub value: f64,        // Anomalous value
    pub anomaly_type: AnomalyType,
    pub score: f64,        // Anomaly score
}
```

## Forecasting

### Exponential Smoothing

```rust
use avila_telemetry::{TimeSeries, Forecaster, ExponentialSmoothing};

let ts = TimeSeries::new(historical_data);
let mut model = ExponentialSmoothing::new(0.3)?;

// Fit the model
model.fit(&ts)?;

// Forecast
let forecast = model.forecast(steps)?;
println!("Predictions: {:?}", forecast.predictions);

// With confidence intervals
let forecast = model.forecast_with_confidence(steps, 0.95)?;
println!("Lower: {:?}", forecast.lower_bound);
println!("Upper: {:?}", forecast.upper_bound);
```

### Moving Average Forecaster

```rust
use avila_telemetry::{Forecaster, MovingAverageForecaster};

let mut model = MovingAverageForecaster::new(window)?;
model.fit(&ts)?;
let forecast = model.forecast(steps)?;
```

### ARIMA

```rust
use avila_telemetry::models::ARIMA;
use avila_telemetry::Forecaster;

let mut model = ARIMA::new(p, d, q);
model.fit(&ts)?;
let forecast = model.forecast(steps)?;
```

## Feature Engineering

### Lag Features

```rust
use avila_telemetry::FeatureExtractor;

let lags = FeatureExtractor::create_lag_features(&ts, &[1, 2, 3])?;
// lags[0] is lag-1, lags[1] is lag-2, etc.
```

### Rolling Statistics

```rust
let stats = FeatureExtractor::rolling_statistics(&ts, window)?;
println!("Means: {:?}", stats.means);
println!("Stds: {:?}", stats.stds);
println!("Mins: {:?}", stats.mins);
println!("Maxs: {:?}", stats.maxs);
```

### Trend Features

```rust
let trends = FeatureExtractor::trend_features(&ts, window)?;
// Returns slope for each window
```

### Rate of Change

```rust
let roc = FeatureExtractor::rate_of_change(&ts, periods)?;
// Returns percentage change over specified periods
```

## Time Series Decomposition

### Usage

```rust
use avila_telemetry::{Decomposer, DecompositionType};

// Additive: Y = Trend + Seasonal + Residual
let decomposer = Decomposer::new(DecompositionType::Additive, period)?;

// Multiplicative: Y = Trend × Seasonal × Residual
let decomposer = Decomposer::new(DecompositionType::Multiplicative, period)?;

let result = decomposer.decompose(&ts)?;
println!("Trend: {:?}", result.trend);
println!("Seasonal: {:?}", result.seasonal);
println!("Residual: {:?}", result.residual);
```

## Complete Example

```rust
use avila_telemetry::{
    TimeSeries, AnomalyDetector, Forecaster,
    ExponentialSmoothing, FeatureExtractor,
    Decomposer, DecompositionType,
};

fn analyze_time_series(data: Vec<f64>) -> Result<(), Box<dyn std::error::Error>> {
    // Create time series
    let ts = TimeSeries::new(data).with_name("sensor_data");

    // Basic statistics
    let stats = ts.statistics();
    println!("Mean: {:.2}, Std: {:.2}", stats.mean, stats.std_dev);

    // Detect anomalies
    let detector = AnomalyDetector::default();
    let anomalies = detector.detect_ensemble(&ts)?;
    println!("Found {} anomalies", anomalies.len());

    // Create features
    let lags = FeatureExtractor::create_lag_features(&ts, &[1, 2, 3])?;
    let rolling = FeatureExtractor::rolling_statistics(&ts, 5)?;

    // Decompose
    let decomposer = Decomposer::new(DecompositionType::Additive, 7)?;
    let decomposition = decomposer.decompose(&ts)?;

    // Forecast
    let mut forecaster = ExponentialSmoothing::new(0.3)?;
    forecaster.fit(&ts)?;
    let forecast = forecaster.forecast_with_confidence(10, 0.95)?;

    println!("10-step forecast: {:?}", forecast.predictions);

    Ok(())
}
```

## Best Practices

1. **Error Handling**: Always use `?` or proper error handling
2. **Data Validation**: Check for sufficient data before operations
3. **Parameter Selection**: Start with default parameters and tune
4. **Feature Scaling**: Consider normalizing data for some operations
5. **Cross-Validation**: Validate forecasts on held-out data

## Common Patterns

### Pipeline Pattern

```rust
fn build_pipeline(data: Vec<f64>) -> Result<Vec<f64>, TelemetryError> {
    let ts = TimeSeries::new(data);
    let smoothed = ts.exponential_moving_average(0.3)?;
    let ts_smoothed = TimeSeries::new(smoothed);
    let forecast_result = forecast(&ts_smoothed, 5)?;
    Ok(forecast_result)
}
```

### Batch Processing

```rust
fn process_multiple_series(series: Vec<Vec<f64>>) {
    for data in series {
        let ts = TimeSeries::new(data);
        // Process each series
    }
}
```

## Performance Tips

1. Use appropriate window sizes (smaller = faster)
2. Reuse `AnomalyDetector` instances
3. Consider sampling for very large datasets
4. Use `Vec::with_capacity` for known sizes
5. Profile with `cargo bench` for optimization
