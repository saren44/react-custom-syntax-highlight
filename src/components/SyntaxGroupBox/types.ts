import { SyntaxGroupType } from "../codeBox/types";



export interface SyntaxGroupBoxProps {
    initialDisplay: SyntaxGroupBoxType;
}

export type SyntaxGroupBoxType = {
    name: string;
    priority: number;
    keywords: string;
    textColor?: string;
    highlightColor?: string;
    fullWord: boolean;
    fullLine: boolean;
}

export const newGroupTemplate: SyntaxGroupBoxType = {
    name: '',
    priority: 0,
    keywords: '',
    textColor: '#000000',
    highlightColor: '#ffffff',
    fullWord: true,
    fullLine: false
}