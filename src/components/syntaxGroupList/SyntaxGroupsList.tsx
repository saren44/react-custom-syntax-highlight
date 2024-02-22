import React from "react";
import { ListElementProps, SyntaxGroupsListProps } from "./types";


const ListElement = ({data}: ListElementProps) => {
    return (
        <div className="syntaxGrupListElement"> {data.name} </div>
    )
}


export const SyntaxGroupsList = ({data}: SyntaxGroupsListProps) => {

    const generateListElements = () => {
        let elements: React.ReactNode[] = []
        data.forEach(el => {
            elements.push(<ListElement  data={el}/>)
        })
        return elements;
    }

    return (
        <div className="syntaxGroupsListContainer">
            <div className="syntaxGroupsListWrapper">
            
            {
                generateListElements()
            }
            </div>
        </div>
    )
} 