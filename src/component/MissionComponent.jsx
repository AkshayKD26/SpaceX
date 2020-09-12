import React, { Component } from "react";

class MissionComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <div className="img-container">
            <img
              src={data && data.links && data.links.mission_patch_small}
              className="mission-img"
            />
          </div>
          <div className="mission-name mt-5">{data.mission_name}</div>
          <div className="mt-2">
            <span className="mission-label">Mission Id :</span>
            <span className="mission-value ml-2">{data && data.mission_id && data.mission_id[0]}</span>
          </div>
          <div className="mt-2">
            <span className="mission-label">Launch Year:</span>
            <span className="mission-value ml-2">{data && data.launch_year}</span>
          </div>
          <div className="mt-2">
            <span className="mission-label">Successful Launch:</span>
            <span className="mission-value ml-2">{data && data.launch_success?"True":"False"}</span>
          </div>
          <div className="mt-2">
            <span className="mission-label">Successful Landing:</span>
            <span className="mission-value ml-2">{data && data.launch_success?"True":"False"}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionComponent;
