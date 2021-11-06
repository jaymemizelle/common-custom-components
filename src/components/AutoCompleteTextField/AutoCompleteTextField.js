import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./AutoCompleteText.css";

function AutoCompleteText({
  required,
  id,
  label,
  suggestionList,
  value,
  placeholder,
  monitorValue,
  setTextChanged,
  crmId,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursor, setCursor] = useState(-1);

  const ourSuggestions = suggestionList;

  const searchContainer = useRef(null);

  const showSuggestions = () => setIsVisible(true);

  const hideSuggestions = () => setIsVisible(false);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.which == "13") {
        e.preventDefault();
      }
    });
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(e.target)
    ) {
      hideSuggestions();
    }
  };

  const handleKeyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      isVisible
        ? setCursor((c) => (c < suggestions.length - 1 ? c + 1 : c))
        : showSuggestions();
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      hideSuggestions();
    }
    if (e.key === "Enter" && cursor > -1) {
      suggestionSelected(suggestions[cursor]);
      setCursor(-1);
    }
  };

  const onTextChanged = (e) => {
    showSuggestions();
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      let regexValue = value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(regexValue, "i");
      suggestions = ourSuggestions.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestions);
    setText(value);
    monitorValue(value);
    setTextChanged(true);
  };

  const suggestionSelected = (selection) => {
    setText(selection);
    monitorValue(selection);
    let suggestions = [];
    setSuggestions(suggestions);
    hideSuggestions();
  };

  const renderSuggestions = () => {
    if (isVisible === false || suggestions.length === 0 || crmId != null) {
      return null;
    }
    if (isVisible) {
      return (
        <ul
          className={`autoCompleteList ${isVisible ? "visible" : "invisible"}`}
        >
          {suggestions.map((item, i) => (
            <li
              className={cursor === i ? "isHighlighted" : ""}
              onClick={() => suggestionSelected(item)}
              key={i}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onClick={() => {
          setIsVisible(true);
          renderSuggestions();
        }}
        ref={searchContainer}
        onKeyDown={handleKeyboardNavigation}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        id={id}
        value={value}
        onChange={onTextChanged}
        type="text"
      />
      {renderSuggestions()}
    </Form.Group>
  );
}

export default AutoCompleteText;import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./AutoCompleteTextField.css";

function AutoCompleteTextField({
  fieldLabel,
  suggestionList,
  fieldText,
  monitorValue,
  setTextChanged
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState(null);

  const ourSuggestions = suggestionList;

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = ourSuggestions.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestions);
    setText(value);

    // These are callback props meant to pass the state to the parent component
    monitorValue(value);
    setTextChanged(true);
  };

  const suggestionSelected = (selection) => {
    setText(selection);
    monitorValue(selection);
    let suggestions = [];
    setSuggestions(suggestions);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="autoCompleteList">
        {suggestions.map((item, i) => (
          <li onClick={() => suggestionSelected(item)} key={i}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Form.Group>
      <Form.Label>{fieldLabel}</Form.Label>
      <input
        value={text === null ? fieldText : text}
        onChange={onTextChanged}
        className="form-control"
        type="text"
      ></input>
      {renderSuggestions()}
    </Form.Group>
  );
}

export default AutoCompleteTextField;