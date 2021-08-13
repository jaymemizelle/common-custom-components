import React, { useState } from "react";
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