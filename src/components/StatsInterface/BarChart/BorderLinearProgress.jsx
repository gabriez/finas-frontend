import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 18,
  backgroundColor: '#d9d9d9',
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#3cac38',
    ...(theme.applyStyles && theme.applyStyles('dark', {
      backgroundColor: '#d9d9d9',
    })),
  },
}));

export default BorderLinearProgress;
