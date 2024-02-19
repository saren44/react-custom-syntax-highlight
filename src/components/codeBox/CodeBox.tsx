import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React from "react";
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import { SyntaxGroupType } from "./types";


const mockData: SyntaxGroupType[] = [
	{
		name: 'types',
		priority: 0,
		keywords: ['int', 'string', 'bool', 'float'],
		textColor: 'green',
		highlightColor: 'white'
	},
	{
		name: 'declarations',
		priority: 1,
		keywords: ['class', 'function', 'const'],
		textColor: 'red',
	}
]


export const CodeBox = () => {
	const editable = React.useRef<HTMLElement>();
	const [value, setValue] = React.useState<string>('');

	const syntaxGroups: SyntaxGroupType[] = mockData;

	const colors = ['red', 'green', 'blue', 'yellow', 'black']

	const sanitizeConf = {
		allowedTags: ['pre']
	}

	const sanitize = (newVal: string) => {
		return sanitizeHtml(newVal, sanitizeConf)
	}

	const wrapText = (text: string, textColor?: string, highlightColor?: string) => {
		return `<span style="${textColor ? `color: ${textColor}` : ''}; ${highlightColor ? `background-color: ${highlightColor}` : ''}">` + text + '</span>'
	}

	const parseKeywordsInLine = (line: string) => {
		let newLine = ''
		let keywords = line.split(' ');
		let index = 0;
		keywords.forEach(word => {
			let found = false;
			syntaxGroups.forEach(sg => {
				if (sg.keywords.indexOf(word) > -1) {
					newLine += wrapText(word, sg.textColor, sg.highlightColor);
					found = true;
				}
			})
			if (!found) {
				newLine += word;
			}
			if (index != keywords.length - 1){
				newLine += ' '
			}
			index += 1
		})
		return newLine;
	}


	const colorValue = (newVal: string) => {
		let newerVal = ''
		const lines =  newVal.split('\n');
		for (let i = 0; i < lines.length - 1; i++){
			newerVal += parseKeywordsInLine(lines[i]) + '\n';
		}
		newerVal += parseKeywordsInLine(lines[lines.length - 1])
		return newerVal;
	}

	const handleChange = (e: any) => {
		console.log(e.target.value)
		let newVal = sanitize(e.target.value);
		newVal = colorValue(newVal)
		//console.log(newVal);
		setValue(newVal);

	}


	return (<ContentEditable 
						innerRef={editable as React.RefObject<HTMLElement>}
						html={value}
						disabled={false}
						onChange={handleChange}
						className="editable"
						tagName="pre"
	/>)
}