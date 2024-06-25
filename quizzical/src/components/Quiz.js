import React from "react";

export default function Quiz({ data, id, options, selectedOption, handleClick }) {
    const optionValues = options.map((val, index) => {
        const isSelected = selectedOption === val;
        const styles = {
            backgroundColor: isSelected ? "green" : "white"
        };
        return (
            <div 
                key={index} 
                className="options-info" 
                onClick={() => handleClick(id, val)} 
                style={styles}
            >
                {val}
            </div>
        );
    });

    return (
        <div className="questions-block">
            <h3 className="que">{data.question}</h3>
            <div className="options">
                {optionValues}
            </div>
            <hr />
        </div>
    );
}
