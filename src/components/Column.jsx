import PropTypes from "prop-types";
import React, { Component } from "react";
import UIkit from "uikit";

import InfoCard from "./InfoCard";

import "../../node_modules/uikit/src/less/uikit.theme.less";

/**
 * An Column component
 */
class Column extends Component {
  /**
   * Initialize the React element
   * @param {props} props React element properties
   */
  constructor(props) {
    super(props);
    this.state = { newData: {} };
  }
  /**
   * @summary Support actions for when the Alphabet Component is first mounted
   * @returns {none} returns nothing
   */
  componentDidMount() {
    const { callback, title } = this.props;
    const id = title.toLowerCase().replace(/\s/g, "");
    UIkit.util.on(`#${id}`, "added", function (event) {
      // when card been added into a group
      const groupID = event.detail[0].target.id;
      const nodes = event.detail[0].target.childNodes;
      const newList = [];
      nodes.forEach((d) => {
        newList.push(d.id);
      });
      callback(newList, groupID);
    });

    UIkit.util.on(`#${id}`, "stop", function (event) {
      // when card order changed inside a group or removed from a group
      const groupID = event.detail[0].target.id;
      const nodes = event.detail[0].target.childNodes;
      const newList = [];
      nodes.forEach((d) => {
        newList.push(d.id);
      });
      callback(newList, groupID);
    });
  }

  /**
   * Renders a Column component
   * @returns {JSX} returns React element
   */
  render() {
    const { data, title } = this.props;

    return (
      <div className="column">
        <div className="uk-section uk-section-muted">
          <h4 className="uk-text-center">{title}</h4>
          <div
            className="sortable"
            uk-sortable="group: sortable-group"
            id={title.toLowerCase().replace(/\s/g, "")}
          >
            {data && data.length > 0
              ? data.map((d, i) => {
                  return (
                    <InfoCard
                      title={d.title}
                      description={d.description}
                      key={`${d.title.toLowerCase()}${i}`}
                      id={d.id} //`${title.toLowerCase().replace(/\s/g, "")}-${i}`
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

Column.defaultProps = {
  data: [
    { title: "Date Aug 01", description: "Today is sunny" },
    { title: "Date Aug 02", description: "Today is cloudy" },
  ],
  title: "Column - 1",
  callback: () => {},
};

Column.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  callback: PropTypes.func,
};

export default Column;
