import React, { useState, useEffect } from "react";
import SaveDialog from "./SaveDialog";
import "./index.css";
import { Button } from "@mui/material";

const TaskDetails = ({ mainDataTask, setMainDataTask }) => {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [editData, setEditData] = useState();

  const handleCloseBox = () => {
    setOpenSaveDialog(false);
  };
  const openSaveDialogFun = (data, index) => {
    setOpenSaveDialog(true);
    setEditData(data);
  };
  return (
    <>
      {openSaveDialog && (
        <SaveDialog
          onClose={handleCloseBox}
          open={openSaveDialog}
          isEdit={openSaveDialog}
          mainDataTask={mainDataTask}
          setMainDataTask={setMainDataTask}
          editTaskData={editData}
        />
      )}
      <div className="mainPersonDiv">
        <div className="mainDivCard">
          {mainDataTask?.map((data, index) => {
            return (
              <div
                className="mainCard"
                key={index}
                onClick={() => openSaveDialogFun(data, index)}
              >
                <div className="circleClass">{`${data.title.substr(
                  0,
                  3
                )}...`}</div>
                <div>
                  <h2>
                    {`${Math.floor(data?.totalTime / 3600)
                      .toString()
                      .padStart(2, "0")} : ${Math.floor(
                      (data?.totalTime % 3600) / 60
                    )
                      .toString()
                      .padStart(2, "0")} : ${Math.floor(data?.totalTime % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </h2>
                </div>
                <div>{data?.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
