import React from "react";
import { InputProps } from "./types";


export const CheckBoxInput = ({
    label,
    defaultValue,
    callback
} : InputProps) => {

    return (
        <div className="inputContainer">
            <input type="checkbox" className="textInput" value={defaultValue ?? defaultValue} onChange={(e) => callback(e.target.value)}/>
            <p className="textInput"> {label} </p>
        </div>
    )
}