import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [shown, setShown] = useState(false);
  const ref = useRef();

  const CloseMenu = () => {
    setShown(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (shown && ref.current && !ref.current.contains(e.target)) {
        CloseMenu();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    document.addEventListener("keydown", (e) => {
      if (shown && e.key == "Escape") {
        CloseMenu();
      }
    });

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [shown]);

  return (
    <div>
      <div className="menu" ref={ref}>
        <div onClick={setShown(!shown)}>...</div>
        <div>
          <ul style={shown ? {} : { display: "none" }}>
            <Link to="/my-profile">
              <li>Item1</li>
            </Link>
            <Link to="#">
              <li>Item2</li>
            </Link>
            <Link to="#">
              <li>Item3</li>
            </Link>
            <Link to="#">
              <li>Item3</li>
            </Link>
            <hr></hr>
            <a>
              <span>
                <li> Last Item</li>
              </span>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
