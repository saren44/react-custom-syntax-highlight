import React from "react";
import { CheckBoxInput, TextInput } from "../inputs";
import { ColorInput } from "../inputs/colorInput";
import { Button } from "../button";
import { SyntaxGroupType } from "../codeBox/types";
import { SyntaxGroupBoxProps, SyntaxGroupBoxType } from "./types";


export const SyntaxGroupBox = ({initialDisplay}: SyntaxGroupBoxProps) => {
    const [groupState, setGroupState] = React.useState<SyntaxGroupBoxType>(initialDisplay)

    const handleChangeNameInput = (e: string) => {
        setGroupState({...groupState, name: e })
    }

    const handleChangeKeywordsInput = (e: string) => {
        setGroupState({...groupState, keywords: e })
    }

    const handleCHangePriorityInput = (e: string) => {
        setGroupState({...groupState, priority: +e })
    }

    const handleChangeTextColorInput = (e: string) => {
        setGroupState({...groupState, textColor: e })
    }

    const handleChangeHighlightColorInput = (e: string) => {
        setGroupState({...groupState, highlightColor: e })
    }

    const handleChangeIsFullWordInput = () => {
        setGroupState({...groupState, fullWord: !groupState.fullWord })
    }
    const handleChangeIsFullLineInput = () => {
        setGroupState({...groupState, fullLine: !groupState.fullLine })
    }
    
    

    return <div className="syntaxGroupBox">
        <TextInput label="group name" callback={handleChangeNameInput} defaultValue={groupState.name === initialDisplay.name ? initialDisplay.name : undefined} placeholder="myCoolName123"/>
        <TextInput label="keywords" callback={handleChangeKeywordsInput} defaultValue={groupState.keywords === initialDisplay.keywords ? initialDisplay.keywords.toString() : undefined} placeholder="class,int,void..." />
        <TextInput label="priority" callback={handleCHangePriorityInput} defaultValue={groupState.priority === initialDisplay.priority ? initialDisplay.priority.toString() : undefined} placeholder="class,int,void..." />
        <ColorInput label="font color" callback={handleChangeTextColorInput} defaultValue={groupState.textColor === initialDisplay.textColor ? initialDisplay.textColor : undefined}/>
        <ColorInput label="highlight color" callback={handleChangeHighlightColorInput} defaultValue={groupState.highlightColor === initialDisplay.highlightColor ? initialDisplay.highlightColor : undefined}/>
        <CheckBoxInput label="full word?" callback={handleChangeIsFullWordInput} />
        <CheckBoxInput label="full line?" callback={handleChangeIsFullLineInput} />
        <Button callback={() => console.log(groupState)} label="add group"/>
    </div>
}