import { SyntaxGroupType } from "../codeBox/types";



export interface SyntaxGroupBoxProps {
    initialDisplay: SyntaxGroupType;
    callback: (sg: SyntaxGroupType) => void;
}


export const newGroupTemplate: SyntaxGroupType = {
    name: '',
    priority: 0,
    regex: new RegExp('cat', 'ig'),
    textColor: '#000000',
    highlightColor: '#ffffff',
    fullWord: true,
    fullLine: false
}