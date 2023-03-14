import React, { useState } from "react";

import styled from "styled-components";
import {  ColorPalette } from "../Data/Context.js";

//############################################## STYLED COMPONENTS ##############################################
const KeywordSearchContainer = styled.div`
.Keyword-search-body{
.keyword-input{
    

    border-bottom: 1px solid black;
    background-color: ${ColorPalette.light};
    padding: 1%;
    border-radius: 5px;
    color: black;
    font-size: 20px;

}
.keyword-Container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .Keyword{
        margin: 1%;
        box-shadow:  4px 4px 3px 3px rgba(0,0,0,0.2);
        background-color: ${ColorPalette.medium} ;
        padding: 1%;
        border-radius: 5px;
        display: flex;
        
        button{
            background-color: red;
            color: black;
            border: none;
            border-radius: 5px;
            padding: 0%;
            padding-left: 10%;
            padding-right: 10%;
            cursor: pointer;
            
            
        }
    }
}
}

`;
//==============================================End of Styled Components==============================================

//############################################## Keyword search COMPONENT ##############################################

function KeywordSearch(props) {
  const [inputValue, setInputValue] = useState("");
  let keywords = props.getKeywords;



  /**
   * 
   * @param {event} event the event that triggered the function
   * this function is called when the user types in the input field
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  /**
   * 
   * @param {event} event the event that triggered the function 
   * this function is called when the user presses the enter key or the comma key
   */
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addKeyword(inputValue.trim());
    }
  };
  /**
   * 
   * @param {string} keyword the keyword to add to the list of keywords
   * this function adds a keyword to the list of keywords 
   */
  const addKeyword = (keyword) => {
    if (keyword.length > 0 && !keywords.includes(keyword)) {
      props.setKeywords([...keywords, keyword]);
      setInputValue("");

    }
  };

  /**
   * 
   * @param {string} keywordToRemove  the keyword to remove from the list of keywords
   * this function removes a keyword from the list of keywords
   */
  const removeKeyword = (keywordToRemove) => {
    props.setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));

  };
  return (
    <KeywordSearchContainer>
    <div className="Keyword-search-body">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add a keyword"
          className="keyword-input"
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
    </KeywordSearchContainer>
  );
}
//==============================================End of Keyword search COMPONENT==============================================
export default KeywordSearch;