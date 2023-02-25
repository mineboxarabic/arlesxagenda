import React, { useState } from "react";

function KeywordSearch(props) {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    props.getKeywords(keywords);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword(inputValue.trim());
      props.getKeywords(keywords);
    }
  };

  const addKeyword = (keyword) => {
    if (keyword.length > 0 && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      props.getKeywords([...keywords, keyword]);
      
      setInputValue("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    props.getKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };
  props.getKeywords(keywords);
  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div>
        {keywords.map((keyword) => (
          <span key={keyword}>
            {keyword}
            <button onClick={() => removeKeyword(keyword)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeywordSearch;