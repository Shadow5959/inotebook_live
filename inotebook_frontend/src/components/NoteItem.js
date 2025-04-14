import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  // Card style: in dark mode, use the same background color as input fields.
  const cardStyle = {
    backgroundColor: props.mode === "dark" ? "#7e7e7e6b" : "white",
    color: props.mode === "dark" ? "white" : "black",
  };

  return (
    <div className="col-md-3">
      <div className="card my-3" style={cardStyle}>
        <div className="card-body">
        <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "top",
              right: "0",
            }}
          >
            <span className={`badge rounded-pill bg-${props.mode=== "dark"? "success": "dark"}`}>{note.tag}</span>
          </div>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="far fa-trash-alt mx-2"
            title="Delete"
            style={{
              cursor: "pointer",
              color: props.mode === "dark" ? "#ff6b6b" : "red",
            }}
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="far fa-edit mx-2"
            title="Edit"
            style={{
              cursor: "pointer",
              color: props.mode === "dark" ? "#28a745" : "green",
            }}
            onClick={() => updateNote(note)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
