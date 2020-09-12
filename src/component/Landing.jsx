import React, { Component } from "react";
import axios from "axios";
import MissionComponent from "./MissionComponent";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missionData: [],
      launch_year: "",
      landing_success: "",
      launch_success: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get("https://api.spaceXdata.com/v3/launches", {
        params: {
          limit: 100,
          launch_success: this.state.launch_success,
          landing_success: this.state.landing_success,
          launch_year: this.state.launch_year,
        },
      })
      .then((res) => {
        if (res && res.data) {
          this.setState({ missionData: res.data });
        }
      });
  };
  handleYear = (year) => {
    this.setState({ launch_year: year }, () => this.getData());
  };
  handleLanding = (data) => {
    this.setState({ landing_success: data }, () => this.getData());
  };
  handleLaunching = (data) => {
    this.setState({ launch_success: data }, () => this.getData());
  };
  handleRemoveFilter = () => {
    this.setState(
      { launch_success: "", landing_success: "", launch_year: "" },
      () => this.getData()
    );
  };
  render() {
    let {
      missionData,
      launch_success,
      landing_success,
      launch_year,
    } = this.state;
    let years = [
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ];
    return (
      <div className="container-fluid">
        <h1>SpaceX Lunch Programs</h1>
        <div className="row">
          <div className="col-sm-2 mt-3 ">
            <div className="card">
              <div className="card-body">
                <h4>Filters</h4>
                {(launch_success !== "" ||
                  landing_success !== "" ||
                  launch_year !== "") ? (
                    <span
                      className="remove-filter"
                      onClick={this.handleRemoveFilter}
                    >
                      Clear filter
                    </span>
                  ):""}
                <div className="text-center text-primary textdecoration">Launch Year</div>
                {years.map((data, index) => {
                  return (
                    <button
                      className="btn btn-success m-1"
                      key={index}
                      onClick={() => this.handleYear(data)}
                    >
                      {data}
                    </button>
                  );
                })}

                <div className="text-center text-primary textdecoration">
                  Successful Launch
                </div>
                <div>
                  <button
                    className="btn btn-success m-1"
                    onClick={() => this.handleLaunching(true)}
                  >
                    True
                  </button>
                  <button
                    className="btn btn-success m-1"
                    onClick={() => this.handleLaunching(false)}
                  >
                    False
                  </button>
                </div>
                <div className="text-center text-primary textdecoration">
                  Successful Landing
                </div>
                <div>
                  <button
                    className="btn btn-success m-1"
                    onClick={() => this.handleLanding(true)}
                  >
                    True
                  </button>
                  <button
                    className="btn btn-success m-1"
                    onClick={() => this.handleLanding(false)}
                  >
                    False
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10 ">
            <div className="row">
              {missionData &&
                missionData.length > 0 &&
                missionData.map((data, index) => {
                  return (
                    <div className="col-sm-3 mt-3" key={index}>
                      <MissionComponent data={data} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
