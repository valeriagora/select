import React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
// import { getCurrentUserRole } from '../utils/auth';
import { styled } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';

const Root = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
});

const TopMenuButton = (props: any) => {
  return (
    <Button size="large">
      <span style={{ color: 'rgb(255, 255, 255)' }}>{props.text}</span>
    </Button>
  );
};

const unauthenticatedButtons = (
  <div>
    <Link href="/login" color="inherit">
      <TopMenuButton text="Login" />
    </Link>
  </div>
);
// const getTopRightControls = (isAuthenticated: boolean) => {
// if (!isAuthenticated) {
//   return unauthenticatedButtons;
// } else {
// switch (getCurrentUserRole()) {
//   case Roles.FocusGroupManager:
//   case Roles.Admin:
//     return (
//       <Link href="/manager/projects">
//         <TopMenuButton text="Open app" />
//       </Link>
//     );
// case Roles.User:
// default:
//   return (
//     <Link href="/me">
//       <TopMenuButton text="Open app" />
//     </Link>
//   );
// }
// }
// };

export const NavBar: React.FC<{ children: React.ReactNode }> = (props) => {
  const toolbar = (
    <Toolbar
      sx={{
        '& .MuiToolbar-reqular': {
          minHeight: '80px',
        },
      }}
    >
      {/* eslint-disable */}
      <img src="/logo_round.svg" alt="Wantent round logo" />
      <div style={{ marginLeft: 'auto' }}>{props.children}</div>
    </Toolbar>
  );

  return (
    <Root>
      <AppBar position="static">{toolbar}</AppBar>
    </Root>
  );
};

const IndexNavBar = () => {
  // const [isAuth, setIsAuth] = useState(false);
  const { push } = useRouter();
  // useEffect(() => {
  //   const isAuthenticated = !!getAuthToken();
  //   setIsAuth(isAuthenticated);
  // }, []);
  const { user, error, isLoading } = useUser();
  // console.log('res', res);
  // console.log('user', user);
  // console.log('loading', isLoading);
  // console.log('err', error);
  // console.log('getCurrentUserRole()', getCurrentUserRole());
  const login = () => {
    push('/api/auth/login');
  };
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  // if (user) {
  //   return (
  //     <>
  //       <h1>Welcome, {user.name}</h1>
  //       <a href={'/api/auth/logout'}>Log out</a>
  //     </>
  //   );
  // }

  return (
    <NavBar>
      <Typography variant="button" onClick={login}>
        Log in
      </Typography>
      {/* {getTopRightControls(!!user)} */}
    </NavBar>
  );
};

export default IndexNavBar;
