import React from "react";
import PropTypes from "prop-types";
import "./ErrorValidator.css";

export default function ErrorValidator(props) {
  if (props.message) {
    return <span className="error">{props.message}</span>;
  }
  return <></>;
}

ErrorValidator.propTypes = {
  message: PropTypes.string,
};