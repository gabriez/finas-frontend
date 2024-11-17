import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
// import { dataset } from './basicDataset';

export default function GridDemo({
  dataset
}) {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: 'mes', scaleType: 'point' }]}
      series={[{ dataKey: 'finalizados', area: true, color: "#2B9528" }]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}