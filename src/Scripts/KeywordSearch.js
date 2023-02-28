import React, { useEffect, useState } from "react";
import "../Styles/KeywordsSearch.scss";
function KeywordSearch(props) {
  const [inputValue, setInputValue] = useState("");
  let keywords = props.getKeywords;



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword(inputValue.trim());
      props.update();
    }
  };

  const addKeyword = (keyword) => {
    if (keyword.length > 0 && !keywords.includes(keyword)) {
      props.setKeywords([...keywords, keyword]);
      setInputValue("");
      props.update();
    }
  };

  const removeKeyword = (keywordToRemove) => {
    props.setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    props.update();
  };
  return (
    <div className="Keyword-search-body">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="keyword-Container">
        {keywords.map((keyword) => (
          <div className="Keyword" key={keyword}>
            {keyword}
            <button onClick={() => removeKeyword(keyword)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeywordSearch;