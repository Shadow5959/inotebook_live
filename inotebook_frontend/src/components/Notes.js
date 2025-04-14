import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    // Revert to using localStorage for auth token
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note updated successfully", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const textColor = props.mode === "dark" ? "white" : "black";
  // Modal & input styles based on mode
  const modalStyle = {
    backgroundColor: props.mode === "dark" ? "#7e7e7e6b" : "white",
    color: props.mode === "dark" ? "white" : "black",
  };

  const inputStyle = {
    backgroundColor: "#7e7e7e6b",
    color: textColor,
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} mode={props.mode} />
      {/* Hidden button to trigger modal */}
      <button
        ref={ref}
        type="button"
        className={`btn btn-${props.mode === "dark" ? "success" : "primary"} d-none`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={modalStyle}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    style={inputStyle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    style={inputStyle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={inputStyle}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">
                Close
              </button>
              <button
                disabled={note.etitle.length < 3 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className={`btn btn-${props.mode === "dark" ? "success" : "primary"}`}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 style={{ color: props.mode === "dark" ? "white" : "black" }}>Your Notes</h2>
        <div className="container mx-2">{notes.length === 0 && "No notes to display."}</div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
              mode={props.mode}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
