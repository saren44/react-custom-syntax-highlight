import React from "react";
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import { CodeBoxProps, SyntaxGroupType } from "./types";


export const mockData: SyntaxGroupType[] = [
	{
		name: 'types',
		priority: 0,
		keywords: ['int', 'string', 'bool', 'float'],
		textColor: 'green',
		highlightColor: 'white',
		fullWord: true,
		fullLine: false,
	},
	{
		name: 'declarations',
		priority: 1,
		keywords: ['class', 'function', 'const'],
		textColor: 'red',
		fullWord: true,
		fullLine: false,
	},
	{
		name: 'comments',
		priority: 2,
		keywords: ['//'],
		textColor: 'gray',
		fullWord: false,
		fullLine: true,
	},
	{
		name: 'toDo',
		priority: 3,
		keywords: ['ToDo'],
		textColor: 'yellow',
		fullWord: false,
		fullLine: false,
	},
]


export const CodeBox = ({syntaxGroups}: CodeBoxProps) => {
	const editable = React.useRef<HTMLElement>();
	const [value, setValue] = React.useState<string>('');



	const sanitizeConf = {
		allowedTags: ['pre']
	}

	const sanitize = (newVal: string) => {
		return sanitizeHtml(newVal, sanitizeConf)
	}

	const wrapText = (text: string, textColor?: string, highlightColor?: string) => {
		return `<span style="${textColor ? `color: ${textColor}` : ''}; ${highlightColor ? `background-color: ${highlightColor}` : ''}">` + text + '</span>'
	}


	const parseLine = (line: string) => {
		let newLine = line;
		let ignoreFromBack = 0;
		syntaxGroups.forEach(sg => {
			console.log(sg.name)
			sg.keywords.forEach(keyword => {
				let currentPos = 0;
				let f = newLine.indexOf(keyword, currentPos)
				while (f > -1 && f < newLine.length - ignoreFromBack) {
					currentPos = f;
					let isMatch = false;
					if (sg.fullWord && ((newLine.at(currentPos - 1) === ' ' && newLine.at(currentPos + keyword.length) === ' ') || (newLine.at(currentPos - 1) === ' ' && newLine.length === currentPos + keyword.length) || (currentPos === 0 && newLine.at(currentPos + keyword.length) === ' ') || (currentPos === 0 && newLine.length === currentPos + keyword.length))){
						isMatch = true;
					}
					else if (!sg.fullWord) {
						isMatch = true;
					}

					if (!isMatch) {
						f = newLine.indexOf(keyword, currentPos + 1)
						continue;
					}
					if (sg.fullLine) {
						newLine = newLine.slice(0, currentPos) + wrapText(newLine.slice(currentPos, newLine.length), sg.textColor, sg.highlightColor);
						ignoreFromBack = newLine.length - currentPos;
						break;
					}
					else {
						const left = newLine.slice(0, currentPos);
						const right = newLine.slice(currentPos + keyword.length, newLine.length);
						const center =  wrapText(newLine.slice(currentPos, currentPos + keyword.length), sg.textColor, sg.highlightColor);
					

						newLine = left + center + right;
						currentPos += center.length;
						f = newLine.indexOf(keyword, currentPos)
						//console.log(f, currentPos, newLine)
					}
				} 
			})
		})
		return newLine;
	}
	


	const colorValue = (newVal: string) => {
		let newerVal = ''
		const lines =  newVal.split('\n');
		for (let i = 0; i < lines.length - 1; i++){
			newerVal += parseLine(lines[i]) + '\n';
		}
		newerVal += parseLine(lines[lines.length - 1])
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