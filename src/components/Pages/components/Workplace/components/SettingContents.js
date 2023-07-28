import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/SettingContents.scss";
import Staffs from "./Staffs";
import ListProject from "./ListProjects";
import { useDispatch } from "react-redux";
import { updateWorkSpace } from "../actions/WorkplaceActionCallApi";
import Alerts from "../../../../../commons/Alert";

function SettingContent(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { settingSelect, workspace } = props;

  const [name, setName] = useState(workspace?.name || "");
  const [organizationName, setOrganizationName] = useState(
    workspace?.organization_name || ""
  );
  const [avatar, setAvatar] = useState(workspace?.avatar || "");
  const [domain, setDomain] = useState(workspace?.domain || "");
  const [description, setDescription] = useState(workspace?.description || "");

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleUpdateWorkspace = () => {
    const request = {
      name,
      organization_name: organizationName,
      domain,
      description,
    };
    dispatch(updateWorkSpace(request)).then((res) => {
      if (res) {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res);
      } else {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert("Update workspace successful !");
      }
    });
  };

  const renderGeneralSetting = () => {
    return (
      <>
        <div className="title d-flex">
          <div>Space Setting</div>
          <div>
            <i className="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div className="workplace-info mt-4">
          <div className="info-left">
            <div className="label d-flex">
              <span>Organization Name</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
            <div className="label d-flex">
              <span>Name</span>
              <span>*</span>
            </div>
            <div className="w-100">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="label d-flex">
              <span>Space logo</span>
              <span>*</span>
            </div>
            <div className="logo-company">
              <img src={ORG_IMAGE_DEFAULT || avatar}></img>
            </div>
            <div className="label d-flex">
              <span>Organization Domain</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>
          <div className="info-right">
            <div className="label d-flex">
              <span>Description</span>
            </div>
            <div>
              <textarea
                id="input-comment"
                name="w3review"
                maxLength={2000}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center save-btn">
          <button onClick={handleUpdateWorkspace}>Save</button>
        </div>
      </>
    );
  };

  return (
    <div className="setting-content-wrapper">
      {!settingSelect ? (
        renderGeneralSetting()
      ) : settingSelect === "staff" ? (
        <Staffs />
      ) : settingSelect === "projects" ? (
        <ListProject />
      ) : null}
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </div>
  );
}
export default SettingContent;
