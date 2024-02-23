import { SyntaxGroupType } from "../codeBox/types";

export interface SyntaxGroupsListProps {
    data: SyntaxGroupType[];
    callback: (sg: SyntaxGroupType) => void;
    highlightName?: string;
}

export interface ListElementProps {
    data: SyntaxGroupType;
    callback: (sg: SyntaxGroupType) => void;
    highlight: boolean;
}