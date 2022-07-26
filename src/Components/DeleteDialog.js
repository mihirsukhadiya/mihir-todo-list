import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";

const DeleteDialog = ({
  onClose,
  open,
  setIsDelete,
  deletedataBase,
  totalData,
  setTotalData,
}) => {
  const deleteData2 = () => {
    let tempdataa = totalData;
    tempdataa.map((da) => {
      if (da.day === deletedataBase.dat.day) {
        da.alltasks.splice(deletedataBase.index, 1);
      }
    });
    setTotalData(tempdataa);
    localStorage.setItem("mainData", JSON.stringify(tempdataa));
    setIsDelete(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="project-dialog-title"
      >
        <DialogTitle id="project-dialog-title">Delete Data</DialogTitle>
        <DialogContent>
          <h1>Are you sure want to delete this data</h1>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={deleteData2}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
