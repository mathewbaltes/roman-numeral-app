// Use open telemtry to handle tracing and logging for the nodejs app

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";

const sdk = new NodeSDK({
  // We only log to console for this example
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
  metricReader: new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      // we set this to 3 seconds to see the metrics quickly
      exportIntervalMillis: 3000,
  })
});

sdk.start();