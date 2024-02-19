import React from "react";
import { ButtonProps } from "./types";

export const Button = ({
    label,
    callback
}: ButtonProps) => {


    return (
        <button onClick={callback}> {label} </button>
    )
}