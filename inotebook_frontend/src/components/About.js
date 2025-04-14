import React from "react";

export default function About({ mode }) {
  const myStyle = {
    color: mode === "dark" ? "white" : "black",
    backgroundColor: mode === "dark" ? "#212529" : "white",
    border: mode === "dark" ? "1px solid white" : "1px solid black",
  };

  return (
    <div className="container" style={myStyle}>
      <h2 className="my-2">About iNotebook</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
              style={myStyle}
            >
              <strong>Project Overview</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              iNotebook is your personal digital notebook, designed to help you
              organize your thoughts, tasks, and ideas in one convenient place.
              Whether you're a student, professional, or just someone who loves
              to stay organized, iNotebook is here to make your life easier.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={myStyle}
            >
              <strong>Key Features</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <ul>
                <li>Create and manage notes effortlessly.</li>
                <li>Edit and update your notes anytime.</li>
                <li>Delete notes you no longer need.</li>
                <li>Tag your notes for better organization.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={myStyle}
            >
              <strong>Technologies & Tools</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              Built with React.js and styled using Bootstrap 5, iNotebook
              leverages modern web development technologies to deliver a
              seamless user experience. The project is also supported by
              testing frameworks such as React Testing Library and Jest,
              ensuring reliable performance and quality assurance throughout
              the development lifecycle.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}