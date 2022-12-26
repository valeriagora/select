import React, { FC } from 'react';
import { Grid, Paper, CssBaseline } from '@mui/material';
import LoginForm from '../components/LoginForm';

interface ILoginProps {
  email: string;
}

const Login: FC<ILoginProps> = (props) => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/login-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <LoginForm email={props.email} />
      </Grid>
    </Grid>
  );
};

export default Login;
