import React, { Component } from "react";
import axios from "axios";

import Column from "./components/Column";

import "../node_modules/uikit/src/less/uikit.theme.less";

/**
 * A Board Page component
 */
class BoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      newData: {},
      newBoat: { title: "", description: "" },
    };
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputAdd = this.handleInputAdd.bind(this);
    this.getFormField = this.getFormField.bind(this);
  }

  /**
   * @summary Fetch sample data when Component is first mounted
   * @returns {none} returns nothing
   */
  componentDidMount() {
    // fetch(`//0.0.0.0:${process.env.PORT || 5000}/posts`)
    // fetch("./data.json")
    fetch("https://murmuring-brushlands-11465.herokuapp.com/posts")
      .then((response) => response.json())
      .then((result) => this.setState({ dataSource: result, newData: result }));
  }

  /**
   * @summary Handle the data change when card moved
   * @param {array} newList list of card ids in the current group
   * @param {string} groupID id of the current group
   * @returns {none} null
   */
  handleDataChange = (newList, groupID) => {
    const { dataSource, newData } = this.state;
    const newRecord = [];

    newList.forEach((id, i) => {
      Object.keys(dataSource.data).forEach((key) => {
        if (id.includes(key)) {
          const find = dataSource.data[key].filter((d) => d.id === id);
          newRecord.push(find[0]);
        }
      });
    });

    newRecord.forEach((record, i) => {
      record.id = `${groupID}-${i}`;
    });

    this.setState(
      {
        newData: {
          ...newData,
          data: { ...newData.data, [groupID]: newRecord },
        },
      },
      () => {
        axios
          .post(
            `//0.0.0.0:${process.env.PORT || 5000}/update`,
            // "https://murmuring-brushlands-11465.herokuapp.com/update",
            this.state.newData
          )
          .then((res) => {
            // response status
            console.log(res.statusText);
          });
      }
    );
  };

  /**
   * @summary Update the state value when input value change
   * @param {object} event form input value change event
   * @returns {none} null
   */
  handleInputChange = (event) => {
    const { newBoat } = this.state;
    this.setState({
      newBoat: { ...newBoat, [event.target.name]: event.target.value },
    });
  };

  /**
   * @summary Add a newe boat
   * @returns {none} null
   */
  handleInputAdd = () => {
    const { newBoat, newData } = this.state;
    const leftMost = newData.category[0].toLowerCase().replace(/\s/g, "");
    const newList = [...newData.data[leftMost]];
    newBoat.id = `${leftMost}-${newList.length}`;
    newList.push(newBoat);
    this.setState(
      {
        newData: { ...newData, data: { ...newData.data, [leftMost]: newList } },
      },
      () => {
        axios
          .post(
            `//0.0.0.0:${process.env.PORT || 5000}/update`,
            // "https://murmuring-brushlands-11465.herokuapp.com/update",
            this.state.newData
          )
          .then((res) => {
            // response status
            console.log(res.statusText);
          });
      }
    );
  };

  /**
   * @summary Reusable function to get form question and field
   * @param {string} label question label
   * @param {string} name identity of the question
   * @returns {JSX} returns React element
   */
  getFormField(label, name) {
    return (
      <div className="uk-margin">
        <label className="uk-form-label">{label}</label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            id={`input${name}`}
            ref="textInput"
            name={name}
            type="text"
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }

  /**
   * Renders a board page component
   * @returns {JSX} returns React element
   */
  render() {
    const { dataSource } = this.state;
    console.log(dataSource);
    return (
      <div className="boardpage">
        <div className="uk-inline boardpage-button">
          <button className="uk-button uk-button-default" type="button">
            Add Boat
          </button>
          <div uk-dropdown="mode: click">
            {this.getFormField("Boat Name", "title")}
            {this.getFormField("Boat Note", "description")}
            <button
              className="uk-button uk-button-default uk-align-right"
              type="button"
              style={{ marginTop: 10 }}
              onClick={this.handleInputAdd}
            >
              Add
            </button>
          </div>
        </div>
        <div
          className="boardpage-content uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
          uk-grid=""
        >
          {dataSource.category && dataSource.category.length > 0
            ? dataSource.category.map((d) => {
                return (
                  <Column
                    data={dataSource.data[d.toLowerCase().replace(/\s/g, "")]}
                    title={d}
                    key={d.toLowerCase().replace(/\s/g, "")}
                    callback={this.handleDataChange}
                  />
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
export default BoardPage;
