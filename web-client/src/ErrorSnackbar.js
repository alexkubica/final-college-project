import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export default function ErrorSnackbar({ error, onDismiss }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={error}
      autoHideDuration={6000}
      onClose={onDismiss}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{error}</span>}
      action={[
        <Button
          key="dismiss"
          color="secondary"
          size="small"
          onClick={onDismiss}
        >
          DISMISS
        </Button>
      ]}
    />
  );
}

ErrorSnackbar.propTypes = {
  error: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};
