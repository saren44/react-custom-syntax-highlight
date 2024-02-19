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
]


export const CodeBox = () => {
	const editable = React.useRef<HTMLElement>();
	const [value, setValue] = React.useState<string>('');

	const syntaxGroups: SyntaxGroupType[] = mockData.sort((a, b) => b.priority - a.priority);


	const generateKeywordsMap = (sgs: SyntaxGroupType[]) => {
		let newMap = new Map<Array<string>, SyntaxGroupType>();
		sgs.forEach(sg => {
			newMap.set(sg.keywords, sg);
		})
		return newMap;
	}


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
			if (index !== keywords.length - 1){
				newLine += ' '
			}
			index += 1
		})
		return newLine;
	}

	const parseLine = (line: string) => {
		let newLine = line
		syntaxGroups.forEach(sg => {
			console.log(sg.name)
			sg.keywords.forEach(keyword => {
				let currentPos = 0;
				let f = newLine.indexOf(keyword, currentPos)
				while (f > -1) {
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
						break
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