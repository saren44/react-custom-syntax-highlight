import React from "react";
import { ListElementProps, SyntaxGroupsListProps } from "./types";


const ListElement = ({data, callback, highlight}: ListElementProps) => {
    return (
        <div className={`syntaxGrupListElement ${highlight && 'highlighted'}`} onClick={() => callback(data)}> {data.name + ' ' + data.priority} </div>
    )
}


export const SyntaxGroupsList = ({data, callback, highlightName}: SyntaxGroupsListProps) => {

    console.log(highlightName)

    const generateListElements = () => {
        let elements: React.ReactNode[] = []
        data.forEach(el => {
            elements.push(<ListElement  data={el} callback={callback} highlight={highlightName === el.name}/>)
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