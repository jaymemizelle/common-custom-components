import React from "react";
import { Button } from "react-bootstrap";
import "./SlideOutMenu.css";

function SlideOutMenu({ show, setShow }) {

  const handleClose = () => setShow(false);

  return (
    <div className={show ? "slideOutMenu show" : "slideOutMenu hide"}>
      <div className="slideOutHeader">
        <h3>Menu Title</h3>
        <i className="fa fa-close" onClick={handleClose}></i>
      </div>
      <hr />
      <div><p>Menu Contents</p></div>
    </div>
  );
}

export default SlideOutMenu;
