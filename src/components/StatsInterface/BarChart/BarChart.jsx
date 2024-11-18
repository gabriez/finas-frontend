import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BorderLinearProgress from './BorderLinearProgress';

const BarChart = ({dataSet}) => {
  const data = [
    { label: 'Andrés Bello', value: 20 },
    { label: 'Boconó', value: 60 },
    { label: 'Bolívar', value: 40 },
    { label: 'Candelaria', value: 80 },
    { label: 'Carache', value: 100 },
  ];

  return (
    <Box sx={{ width: '100%'}}>
      {dataSet.map((item) => (
        <Grid container alignItems="center" spacing={2} key={item.name} sx={{ marginBottom: '0.5rem' }}>
          <Grid item xs={3}>
            <Typography variant="h6" component="h2" className="capitalize" sx={{
              fontSize: {
                lg: '16px',
                xs: '14px'
              }
            }} >
              {item.name.toLowerCase()} 
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <BorderLinearProgress variant="determinate" value={item.chartValue} />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" color="textSecondary">
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default BarChart;
