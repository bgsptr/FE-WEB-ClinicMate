import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertDialog = (props: {
  popup: boolean;
  setPopup: (isClosed: boolean) => void;
}) => {
  const { popup, setPopup } = props;
  //   const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setPopup(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={popup}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sukses Menambahkan Dokter"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
