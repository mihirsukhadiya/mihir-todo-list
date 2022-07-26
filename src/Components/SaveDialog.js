import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";

const SaveDialog = ({
  onClose,
  open,
  addData,
  isEdit,
  editDatas,
  setTotalData,
  totalData,
}) => {
  const [taskName, setTaskName] = useState(isEdit ? editDatas.taskName : "");
  const [descriptionName, setDescriptionName] = useState(
    isEdit ? editDatas.description : ""
  );
  const [dates, setDates] = useState(isEdit ? editDatas.due : new Date());
  const saveTask = () => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let d = new Date(dates);
    let dayName = days[d.getDay()];
    let arrayVal = {
      taskName: taskName,
      description: descriptionName,
      due: new Date(),
      status: "Pending",
    };
    let mainData = {
      day: dayName,
      alltasks: arrayVal,
    };
    addData(mainData);
    onClose();
  };

  const editTask = () => {
    let dataBaseData = totalData;
    dataBaseData.map((database) => {
      if (database.day === editDatas.day) {
        database.alltasks.map((vals) => {
          if (
            vals.taskName === editDatas.taskName &&
            vals.description === editDatas.description
          ) {
            vals.taskName = taskName;
            vals.description = descriptionName;
          }
        });
      }
    });
    setTotalData(dataBaseData);
    localStorage.setItem("mainData", JSON.stringify(dataBaseData));
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="project-dialog-title"
      >
        <DialogTitle id="project-dialog-title">Add New Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            autoFocus
            fullWidth={true}
            id="taskName"
            label="Task Name"
            name="taskName"
            autoComplete="given-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth={true}
            id="description"
            label="Description"
            name="description"
            autoComplete="given-name"
            value={descriptionName}
            onChange={(e) => setDescriptionName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            disabled={isEdit}
            type="date"
            fullWidth={true}
            id="due"
            name="due"
            autoComplete="given-name"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            disabled
            fullWidth={true}
            id="status"
            label="Status"
            name="status"
            autoComplete="given-name"
            value={isEdit ? editDatas.status : "Pending"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={isEdit ? editTask : saveTask}
          >
            {isEdit ? "Edit" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveDialog;
