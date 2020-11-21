import React, { Component } from "react";

export default class MainError extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Could not display the note(s).</h2>;
    }
    return this.props.children;
  }
}