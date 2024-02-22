import React from "react";
import { CheckBoxInput, TextInput } from "../inputs";
import { ColorInput } from "../inputs/colorInput";
import { Button } from "../button";
import { SyntaxGroupType } from "../codeBox/types";
import { SyntaxGroupBoxProps } from "./types";


export const SyntaxGroupBox = ({initialDisplay, callback}: SyntaxGroupBoxProps) => {
    const [groupState, setGroupState] = React.useState<SyntaxGroupType>(initialDisplay)

    const handleChangeNameInput = (e: string) => {
        setGroupState({...groupState, name: e })
    }

    const handleChangeRegexSourceInput = (e: string) => {
        setGroupState({...groupState, regex: new RegExp(e, groupState.regex.flags) })
    }

    const handleChangeRegexFlagsInput = (e: string) => {
        setGroupState({...groupState, regex: new RegExp(groupState.regex.source, e) })
    }

    const handleChangePriorityInput = (e: string) => {
        setGroupState({...groupState, priority: +e })
    }

    const handleChangeTextColorInput = (e: string) => {
        setGroupState({...groupState, textColor: e })
    }

    const handleChangeHighlightColorInput = (e: string) => {
        setGroupState({...groupState, highlightColor: e })
    }
    

    return <div className="syntaxGroupBox">
        <TextInput label="group name" callback={handleChangeNameInput} defaultValue={groupState.name === initialDisplay.name ? initialDisplay.name : undefined} placeholder="myCoolName123"/>
        <TextInput label="regex source" callback={handleChangeRegexSourceInput} defaultValue={groupState.regex.source === initialDisplay.regex.source ? initialDisplay.regex.source.toString() : undefined} placeholder="class,int,void..." />
        <TextInput label="regex flags" callback={handleChangeRegexFlagsInput} defaultValue={groupState.regex.flags === initialDisplay.regex.flags ? initialDisplay.regex.flags.toString() : undefined} placeholder="class,int,void..." />
        <TextInput label="priority" callback={handleChangePriorityInput} defaultValue={groupState.priority === initialDisplay.priority ? initialDisplay.priority.toString() : undefined} placeholder="0" />
        <ColorInput label="font color" callback={handleChangeTextColorInput} defaultValue={groupState.textColor === initialDisplay.textColor ? initialDisplay.textColor : undefined}/>
        <ColorInput label="highlight color" callback={handleChangeHighlightColorInput} defaultValue={groupState.highlightColor === initialDisplay.highlightColor ? initialDisplay.highlightColor : undefined}/>
        <Button callback={() => callback(groupState)} label="add group"/>
    </div>
}