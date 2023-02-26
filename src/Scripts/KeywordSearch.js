import React, { useEffect, useState } from "react";
import "../Styles/KeywordsSearch.scss";
function KeywordSearch(props) {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState(props.getKeywords);



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword(inputValue.trim());
    }
  };

  const addKeyword = (keyword) => {
    if (keyword.length > 0 && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      props.getKeywords.push(keyword);
      
      setInputValue("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    props.getKeywords.splice(props.getKeywords.indexOf(keywordToRemove),1);
    
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