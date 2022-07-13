import React from "react";
import { Button } from "react-bootstrap";
import SeafoamButton from "../Buttons/SeafoamButton/SeafoamButton";
import "./SlideOutMenuSectioned.css";

function SlideOutMenuFilter({
  show,
  setShow,
  menuHeader,
  actionButtonText,
  onActionButtonClick,
  firstSectionTitle,
  firstSectionContent,
  secondSectionTitle,
  secondSectionContent,
  thirdSectionTitle,
  thirdSectionContent,
  fourthSectionTitle,
  fourthSectionContent,
  clearFields,
  onClearFieldsClick,
  onCancel,
}) {
  const handleClose = () => setShow(false);

  return (
    <div className={show ? "slideOutMenu show" : "slideOutMenu hide"}>
      <div className="slideOutHeader">
        <h3>{menuHeader}</h3>
        <div className="filterCtas">
          <Button
            onClick={() => {
              onCancel();
              handleClose();
            }}
            variant="secondary"
            className="cancelBtn"
          >
            Cancel
          </Button>
          <SeafoamButton
            onClick={onActionButtonClick}
            className="actionBtn"
            text={actionButtonText}
          />
        </div>
      </div>
      {clearFields ? (
        <div onClick={onClearFieldsClick} className="clearFields">
          {clearFields}
        </div>
      ) : null}
      <hr className="divider" />
      <div className="projectSection">
        <div className="filterMenuTitle">{firstSectionTitle}</div>
        <div>{firstSectionContent}</div>
      </div>
      {secondSectionTitle ? (
        <>
          <hr className="divider" />
          <div className="statusSection">
            <div className="filterMenuTitle">{secondSectionTitle}</div>
            <div>{secondSectionContent}</div>
          </div>
        </>
      ) : null}
      {thirdSectionTitle ? (
        <>
          <hr className="divider" />
          <div className="dateEditedSection">
            <div className="filterMenuTitle">{thirdSectionTitle}</div>
            <div>{thirdSectionContent}</div>
          </div>
        </>
      ) : null}
      {fourthSectionTitle ? (
        <>
          <hr className="divider" />
          <div className="dateCreatedSection">
            <div className="filterMenuTitle">{fourthSectionTitle}</div>
            <div>{fourthSectionContent}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SlideOutMenuFilter;
