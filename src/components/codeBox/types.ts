export {};


export type SyntaxGroupType = {
    name: string;
    priority: number;
    regex: RegExp;
    textColor?: string;
    highlightColor?: string;
    fullWord: boolean;
    fullLine: boolean;
}



export interface CodeBoxProps {
    syntaxGroups: Array<SyntaxGroupType>
}