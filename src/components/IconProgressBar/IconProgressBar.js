import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IconProgressBar.css";

function IconProgressBar({ icons, currentPage }) {
  const [progress, setProgress] = useState("15");

  useEffect(() => {
    icons.forEach((icon, index) => {
      if (currentPage === icon.pageTitle) {
        setProgress(
          Math.floor(parseInt(icons.length) / parseInt(index)).toString()
        );
      }
    });
  }, []);

  const containerStyles = {
    height: 10,
    width: "90vw",
    backgroundColor: "#c4c4c4",
    borderRadius: 50,
    margin: 50,
    position: "relative",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#63c4ab",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
      <div className="iconProgressBarContainer">
        {icons.map((icon, index) => (
          <div
            key={index}
            style={
              currentPage === icon.pageTitle
                ? { color: "#63c4ab", borderColor: "#63c4ab" }
                : {}
            }
            className="iconProgressBarItem"
          >
            <FontAwesomeIcon className={icon.class} icon={icon.name} />
            <p className="iconPageTitle">{icon.pageTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconProgressBar;
