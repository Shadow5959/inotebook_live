import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const textColor = props.mode === "dark" ? "white" : "black";
  // Define common styles for input fields
  const inputStyle = {
    backgroundColor: "#7e7e7e6b",
    color: textColor,

  };
  // Debugging line

  return (
    <div className="container my-3">
      <h2 style={{ color: props.mode === "dark" ? "white" : "black" }}>
        Add a note
      </h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{ color: props.mode === "dark" ? "white" : "black" }}>
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
            value={note.title}
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" style={{ color: props.mode === "dark" ? "white" : "black" }}>
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" style={{ color: props.mode === "dark" ? "white" : "black" }}>
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
            style={inputStyle}
          />
        </div>

        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className={`btn btn-${props.mode === "dark" ? "success" : "primary"}`}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
