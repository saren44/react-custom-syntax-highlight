import React from "react";
import { InputProps } from "./types";



export const ColorInput = ({
    label,
    defaultValue,
    callback
} : InputProps) => {

    return (
        <div className="inputContainer">
            <input type="color" className="textInput" value={defaultValue ?? defaultValue} onChange={(e) => callback(e.target.value)}/>
            <p className="textInput"> {label} </p>
        </div>
    )
}