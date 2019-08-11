import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { Theme } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { SnackbarContent } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = ({palette, spacing}: Theme) => createStyles(
  {  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: amber[700],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {
  open : boolean,
  message : string,
  variant: keyof typeof variantIcon,
  onCloseSnackbar() : void
}

const CustomSnackbarContent = withStyles(styles)(
class CustomSnackbarContent2 extends React.Component<Props, any> {

  render() {
    const variant = this.props.variant;
    const Icon = variantIcon[variant];
    const classes = this.props.classes;

    return (
      <SnackbarContent
          className={clsx(classes[variant])}
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {this.props.message}
            </span>
          }
        />
    );
  }
});

const CustomSnackbar = withStyles(styles)(
class CustomSnackbar2 extends React.Component<Props, any> {

  render() {

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        autoHideDuration={2000}
        onClose={this.props.onCloseSnackbar}
        open={this.props.open}
      >
      <CustomSnackbarContent
        {...this.props}
      />
      </Snackbar>
    );
  }
});

export default withStyles(styles)(CustomSnackbar);
