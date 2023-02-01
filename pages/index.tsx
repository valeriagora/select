import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
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
  const { push } = useRouter();
  const logout = () => {
    push('/api/auth/logout')
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err));
  };
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
        <div style={{ color: 'cornflowerblue' }} onClick={logout}>
          Log out
        </div>
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
