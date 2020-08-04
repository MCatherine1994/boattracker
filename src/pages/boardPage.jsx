import React, { Component } from "react";

// import ArticleCard from '../components/ArticleCard';

import "../../node_modules/uikit/src/less/uikit.theme.less";

/**
 * A Board Page component
 */
class BoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  /**
   * @summary Support actions for when the Alphabet Component is first mounted
   * @returns {none} returns nothing
   */
  componentDidMount() {
    // fetch("http://localhost:8000/posts")
    //   .then((response) => response.json())
    //   .then((posts) => this.setState({ posts }));
  }

  /**
   * Renders a board page component
   * @returns {JSX} returns React element
   */
  render() {
    return <div className="boardpage">Hello World</div>;
  }
}
export default BoardPage;
