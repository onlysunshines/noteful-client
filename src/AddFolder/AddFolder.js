import React, { Component } from "react";
import { BASE_URL } from "../config.js";
import NotefulContext from "../NotefulContext/NotefulContext.js";
import ErrorValidator from "../ErrorValidation/ErrorValidator.js";
import "./AddFolder.css";

export default class AddFolder extends Component {
  state = {
    folder: {
      name: " ",
      touched: false,
    },
  };

  static contextType = NotefulContext;

  updateFolderName(name) {
    this.setState({ folder: { name: name, touched: true } });
  }

  validateFolderName() {
    //The trim() method removes whitespace from both ends of a string.
    const name = this.state.folder.name.trim();
    if (name.length === 0) {
      return "(name is required)";
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { folder } = this.state;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(folder),
    };

    try {
      const folderResponse = await fetch(BASE_URL + "/folders", options);

      if (!folderResponse.ok) {
        throw new Error("Something went wrong adding the folder.");
      }

      const folder = await folderResponse.json();

      this.context.addFolder(folder);
      this.props.history.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const folderError = this.validateFolderName();
    //console.log(folderError);
    return (
      <section className="AddFolder">
        <form
          className="AddFolder__form"
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <label htmlFor="folderName">
            <h2>
              Folder Name:
              <span className="required"> * </span>
              {this.state.folder.touched && (
                <ErrorValidator message={folderError} />
              )}
            </h2>
          </label>
          <input
            type="text"
            id="folderName"
            name="folderName"
            aria-required="true"
            aria-invalid={folderError}
            value={this.state.folder.name}
            onChange={(e) => {
              this.updateFolderName(e.target.value);
            }}
          />
          <button type="submit" disabled={this.validateFolderName()}>
            Add Folder
          </button>
        </form>
      </section>
    );
  }
}