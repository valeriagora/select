import React, { useCallback, useReducer, useState } from 'react';
import { Button, LinearProgress, Typography, Avatar, Grid, styled, useTheme } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import { Field, Form } from 'react-final-form';
import { useRouter } from 'next/router';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { errorSnack } from '../common/snackbars/Snackbar';
import { FinalFormInput } from '../common/form-inputs';
import { requestAccessToken } from './requests';
import { reducer as loginReducer, initialState, LoginMode, requestLogin, loginFailure } from './slice';
import { handleUserLoggedIn } from '../../utils/auth';
import { composeValidators, emailValidator, requiredValidator } from '../../utils/form';

const LoginWrapper = styled('div')(({ theme }) => ({
  margin: `${theme.spacing(8)} ${theme.spacing(4)}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const LoginForm = (props: { email?: string }) => {
  const { email } = props;
  const router = useRouter();
  const theme = useTheme();

  const { t: getLabel } = useTranslation();

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [mode] = useState<LoginMode>('password');

  const loginUser = useCallback(
    (formValues: any) => {
      dispatch(requestLogin());
      requestAccessToken(formValues, mode).then(
        (accessToken) => {
          handleUserLoggedIn(accessToken, router)
            .then((res) => console.log(res))
            .catch((err) => console.warn(err));
        },
        (message) => {
          dispatch(loginFailure(message));
        },
      );
    },
    [dispatch, mode, router],
  );

  const required = useCallback(requiredValidator(getLabel('validation.required')), [getLabel('validation.required')]);
  const validateEmail = useCallback(emailValidator(getLabel('validation.email')), [getLabel('validation.email')]);

  const loginForm = (
    <LoginWrapper>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ marginBottom: '40px' }}>
        {getLabel('login.heading')}
      </Typography>
      <Form onSubmit={loginUser}>
        {({ invalid, handleSubmit }) => (
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: email ? 'none' : undefined,
                  marginBottom: theme.spacing(3),
                }}
              >
                <Field
                  name="email"
                  validate={composeValidators(required, validateEmail)}
                  component={FinalFormInput}
                  initialValue={email}
                  label={getLabel('login.form.email')}
                  id="email"
                  autoComplete="email"
                  aria-describedby="email-error-text"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginBottom: theme.spacing(3),
                }}
              >
                {mode === 'password' && (
                  <Field
                    name="password"
                    validate={required}
                    component={FinalFormInput}
                    label={getLabel('login.form.password')}
                    id="password"
                    type="password"
                    autoComplete="password"
                    aria-describedby="password-error-text"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  id="submit-login"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={state.isFetching || invalid}
                  sx={{ marginTop: theme.spacing(1) }}
                >
                  {getLabel('login.form.loginButton')}
                </Button>
              </Grid>
              {state.isFetching && (
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              )}

              {state.errorMessage && (
                <Grid item xs={12}>
                  {errorSnack(state.errorMessage)}
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Form>
    </LoginWrapper>
  );

  return loginForm;
};

export default LoginForm;
