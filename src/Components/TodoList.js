import React, { useState, useEffect } from "react";
import "./index.css";
import AddLogo from "./IconAdd.png";
import Delete from "./Delete.png";
import Edit from "./Edit.png";
import SaveDialog from "./SaveDialog";
import DeleteDialog from "./DeleteDialog";

const mainData = [
  {
    day: "Monday",
    alltasks: [
      {
        taskName: "Is1sue A Cheque",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Pl2an a dinner",
        description: "Have to do this",
        due: new Date(),
        status: "Done",
      },
      {
        taskName: "Go3 for Park",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Visit3 the factory",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Go H4ome",
        description: "Have to do this",
        due: new Date(),
        status: "Done",
      },
    ],
  },
  {
    day: "Tuesday",
    alltasks: [
      {
        taskName: "Issu1e A Cheque",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Plan 3a dinner",
        description: "Have to do this",
        due: new Date(),
        status: "Done",
      },
      {
        taskName: "Go for4 Park",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Visit t12he factory",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Go 3Home",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
    ],
  },
  {
    day: "Thursday",
    alltasks: [
      {
        taskName: "Issue A C5heque",
        description: "Have to do this",
        due: new Date(),
        status: "Done",
      },
      {
        taskName: "Plan a d34inner",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Go for54 Park",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
      {
        taskName: "Visit t4he factory",
        description: "Have to do this",
        due: new Date(),
        status: "Done",
      },
      {
        taskName: "Go 45Home",
        description: "Have to do this",
        due: new Date(),
        status: "Pending",
      },
    ],
  },
];
const TodoList = () => {
  const [totalData, setTotalData] = useState(mainData);
  const [isChecked, setIsChecked] = useState();
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [editDatas, setEditDatas] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deletedataBase, setDeleteDataBase] = useState({});

  useEffect(() => {
    if (localStorage.getItem("mainData") !== null) {
      let datas = localStorage.getItem("mainData");
      setTotalData(JSON.parse(datas));
    }
  }, []);

  const ChangeStatus = (value, isChecked) => {
    let tempData = totalData;
    tempData.map((datas) => {
      datas.alltasks.map((values) => {
        if (
          values.taskName == value.taskName &&
          values.description == value.description &&
          values.due == value.due
        ) {
          if (isChecked) {
            values.status = "Done";
            setIsChecked({ taskName: values.taskName, istrue: true });
          } else {
            values.status = "Pending";
            setIsChecked({ taskName: values.taskName, istrue: false });
          }
        }
      });
    });
    setTotalData(tempData);
    localStorage.setItem("mainData", JSON.stringify(tempData));
  };
  const checkIsChecked = (data) => {
    if (isChecked?.taskName === data || data.status === "Done") {
      return true;
    } else {
      return false;
    }
  };
  const handleCloseBox = () => {
    setOpenSaveDialog(false);
    setIsEdit(false);
    setIsDelete(false);
  };
  const handleAddData = ({ day, alltasks }) => {
    let tempdataa = totalData;
    let isOtherDays = false;
    tempdataa.map((da) => {
      if (da.day === day) {
        da.alltasks = [...da.alltasks, alltasks];
        isOtherDays = false;
      } else {
        isOtherDays = true;
      }
    });
    if (isOtherDays) {
      tempdataa.push({ day, alltasks: [alltasks] });
    }
    setTotalData(tempdataa);
    localStorage.setItem("mainData", JSON.stringify(tempdataa));
    setIsEdit(false);
    setIsDelete(false);
  };

  const editTask = (allData, subData) => {
    let newDatas = {
      day: allData.day,
      taskName: subData.taskName,
      description: subData.description,
      status: subData.status,
    };
    setEditDatas(newDatas);
    setIsEdit(true);
    setIsDelete(false);
    setOpenSaveDialog(true);
  };

  return (
    <>
      {openSaveDialog && (
        <SaveDialog
          onClose={handleCloseBox}
          open={openSaveDialog}
          isEdit={isEdit}
          totalData={totalData}
          setTotalData={setTotalData}
          isDelete={isDelete}
          editDatas={editDatas}
          addData={handleAddData}
        />
      )}
      {isDelete && (
        <DeleteDialog
          onClose={handleCloseBox}
          open={isDelete}
          totalData={totalData}
          setTotalData={setTotalData}
          setIsDelete={setIsDelete}
          deletedataBase={deletedataBase}
        />
      )}
      <div className="titleBar">
        <h1>Add New Task</h1>
        <div className="imgeAdd">
          <img
            src={AddLogo}
            width="50px"
            onClick={() => {
              setOpenSaveDialog(true);
              setIsEdit(false);
              setIsDelete(false);
            }}
            height="50px"
            alt="AddLogo"
          />
        </div>
      </div>
      <div className="taskDetails">
        {totalData?.map((dat, ind) => {
          return (
            <div className="mainContainer" key={`ind${ind}`}>
              <div className="contentDiv">
                <div className="title">
                  <div>
                    <h3>{dat.day}</h3>
                  </div>
                </div>
                <div className="cardList">
                  <div className="CardBox">
                    <div className="oneList">
                      <ul>
                        {dat?.alltasks?.map((val, index) => {
                          return (
                            <li key={`index${index}`} className="listItems">
                              <div>
                                <input
                                  type="checkbox"
                                  id={`data${index}${ind}`}
                                  style={{ marginRight: "10px" }}
                                  name={`data${index}${ind}`}
                                  value={val.status}
                                  checked={checkIsChecked(val)}
                                  onChange={(e) => {
                                    let valueTr = e.target.checked;
                                    ChangeStatus(val, valueTr);
                                  }}
                                />
                                <label htmlFor={`data${index}${ind}`}>
                                  {val.taskName}
                                </label>
                              </div>
                              <div className="iconsClass">
                                <div style={{ marginRight: "5px" }}>
                                  <img
                                    src={Edit}
                                    width="50px"
                                    className="editDelete"
                                    onClick={() => editTask(dat, val)}
                                    height="50px"
                                    alt="Edit"
                                  />
                                </div>{" "}
                                <div>
                                  <img
                                    src={Delete}
                                    width="50px"
                                    className="editDelete"
                                    onClick={() => {
                                      setIsDelete(true);
                                      setDeleteDataBase({ dat, index });
                                    }}
                                    height="50px"
                                    alt="Delete"
                                  />
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;
