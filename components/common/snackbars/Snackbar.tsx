import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme, styled, SxProps, Theme } from '@mui/material/styles';
import { green, amber } from '@mui/material/colors';

const icons = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Span = styled('span')({
  display: 'flex',
  alignItems: 'center',
});

interface ISnackbarViewProps {
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void;
  sx?: SxProps<Theme>;
  message: string;
  content?: JSX.Element;
  variant: Variant;
}

type Variant = 'success' | 'warning' | 'error' | 'info';

export const Snackbar = (props: ISnackbarViewProps): JSX.Element => {
  const { message, variant, content, sx, ...other } = props;
  const Icon = icons[variant];
  const theme = useTheme();
  const colors = {
    success: green[600],
    error: theme.palette.error.dark,
    info: theme.palette.primary.dark,
    warning: amber[700],
  };
  return (
    <SnackbarContent
      sx={{
        width: '100%',
        background: colors[variant],
        message: { width: '100%' },
        ...sx,
      }}
      aria-describedby="client-snackbar"
      message={
        <div>
          <Span id="client-snackbar">
            <Icon
              sx={{
                fontSize: '20px',
                opacity: 0.9,
                marginRight: theme.spacing(1),
              }}
            />
            {message}
          </Span>
          {content}
        </div>
      }
      {...other}
    />
  );
};

export const errorSnack = (message: string, sx?: SxProps<Theme>, content?: JSX.Element): JSX.Element => {
  return <Snackbar variant="error" sx={sx} message={message} content={content} />;
};

export const successSnack = (message: string, sx?: SxProps<Theme>, content?: JSX.Element): JSX.Element => {
  return <Snackbar variant="success" sx={sx} message={message} content={content} />;
};
export const infoSnack = (message: string, sx?: SxProps<Theme>, content?: JSX.Element): JSX.Element => {
  return <Snackbar variant="info" sx={{ boxSizing: 'border-box', ...sx }} message={message} content={content} />;
};

export const warningSnack = (message: string, sx?: SxProps<Theme>, content?: JSX.Element): JSX.Element => {
  return <Snackbar variant="warning" sx={sx} message={message} content={content} />;
};
