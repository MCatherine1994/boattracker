import PropTypes from "prop-types";
import React, { Component } from "react";

import "../../node_modules/uikit/src/less/uikit.theme.less";

/**
 * An InfoCard component
 */
class InfoCard extends Component {
  /**
   * Renders a InfoCard component
   * @returns {JSX} returns React element
   */
  render() {
    const { title, description, id } = this.props;

    return (
      <div className="uk-card uk-card-default infocard" id={id}>
        <h5
          style={{
            paddingLeft: 10,
            paddingTop: 6,
            marginBottom: 0,
            paddingBottom: 6,
            fontWeight: "bold",
          }}
        >
          {title}
        </h5>
        <hr style={{ marginTop: 0, marginBottom: 0 }} />
        <p
          style={{
            marginTop: 0,
            paddingTop: 6,
            paddingLeft: 10,
            paddingBottom: 6,
          }}
        >
          {description}
        </p>
      </div>
    );
  }
}

InfoCard.defaultProps = {
  description: "Hello World!",
  title: "Title",
  id: "infocard",
};

InfoCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
};

export default InfoCard;
