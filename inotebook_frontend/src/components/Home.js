import React from "react";

import Notes from "./Notes";


export const Home = (props) => {
   
  return (
    <div>
    <Notes  mode={props.mode} showAlert={props.showAlert}/>
    </div>
  );
};


