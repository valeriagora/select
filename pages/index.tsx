import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { useTranslation } from '../hooks/useTranslation';
import { useUser } from '@auth0/nextjs-auth0/client';

const HomeWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#1A1A25',
});

const ImageWrapper = styled('div')({
  position: 'relative',
});

export default function Home(): JSX.Element {
  const { t: getLabel } = useTranslation();
  const { user, error, isLoading } = useUser();
  console.log(user, error, isLoading);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (user) {
    return (
      <>
        <h1>Welcome, {user.name}</h1>
        <a href={'/api/auth/logout'}>Log out</a>
      </>
    );
  }
  return (
    // <a href="/api/auth/login">Log in</a>
    <HomeWrapper>
      <Navbar />
      <ImageWrapper>
        {/* eslint-disable */}
        <img src={`/${'logo_long'}.svg`} width="600" alt="Wantent logo" />
        <Typography variant="h5" sx={{ position: 'absolute', bottom: 0, right: 0, fontWeight: 500 }}>
          {getLabel('general.testingPartner')}
        </Typography>
      </ImageWrapper>
    </HomeWrapper>
  );
}
