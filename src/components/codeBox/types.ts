export {};


export type SyntaxGroupType = {
    name: string;
    priority: number;
    keywords: Array<string>;
    textColor?: string;
    highlightColor?: string;
    fullWord: boolean;
    fullLine: boolean;
}

export const newGroupTemplate: SyntaxGroupType = {
    name: '',
    priority: 0,
    keywords: [],
    textColor: '#000000',
    highlightColor: '#ffffff',
    fullWord: true,
    fullLine: false
}

export interface CodeBoxProps {
    syntaxGroups: Array<SyntaxGroupType>
}