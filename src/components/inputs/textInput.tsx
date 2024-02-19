import React from "react";
import { InputProps } from "./types";



export const TextInput = ({
    label,
    defaultValue,
    callback,
    placeholder
} : InputProps) => {

    return (
        <div className="inputContainer">
            <input type="text" className="textInput" placeholder={placeholder ?? placeholder} onChange={(e) => callback(e.target.value)} value={defaultValue ?? defaultValue}/>
            <p className="textInput"> {label} </p>
        </div>
    )
}