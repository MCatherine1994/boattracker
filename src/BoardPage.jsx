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
    this.state = { dataSource: {}, newData: {} };
    this.handleDataChange = this.handleDataChange.bind(this);
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
    console.log(newList, newRecord);
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
            `http://0.0.0.0:${process.env.PORT || 5000}/update`,
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
   * @summary Fetch sample data when Component is first mounted
   * @returns {none} returns nothing
   */
  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => this.setState({ dataSource: result, newData: result }));
  }

  /**
   * Renders a board page component
   * @returns {JSX} returns React element
   */
  render() {
    const { dataSource } = this.state;
    console.log(dataSource, process.env.PORT, process.env.HOST);
    return (
      <div className="boardpage">
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
