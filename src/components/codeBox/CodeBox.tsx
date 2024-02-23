import React from "react";
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import { CodeBoxProps, SyntaxGroupType } from "./types";


export const mockData: SyntaxGroupType[] = [
	{
		name: 'types',
		priority: 0,
		regex: /int|bool|float|string/,
		textColor: '#00ff00',
		highlightColor: '#ffffff',
		fullWord: true,
		fullLine: false,
	},
	{
		name: 'declarations',
		priority: 1,
		regex: /class|void|const/,
		textColor: '#ff0000',
		fullWord: true,
		fullLine: false,
	},
	{
		name: 'comments',
		priority: 2,
		regex: /\/\/.*|\/\*.*\*\//,
		textColor: '#7e7e7e',
		fullWord: false,
		fullLine: true,
	},
	{
		name: 'toDo',
		priority: 3,
		regex: /todo/i,
		textColor: '#ffff00',
		fullWord: false,
		fullLine: false,
	},
]

class ParseBounds {

	arr: Array<boolean>;

	constructor(startIndex: number, endIndex: number) {
		this.arr = new Array<boolean>(endIndex - startIndex).fill(true);
	}

	public SetBounds = (start: number, end: number) => {
		this.arr.fill(false, start, end);
	}

	public GetNextIndex = (id: number) => {
		return this.arr.indexOf(true, id);
	}

	public resizeArray = (id: number, s: number) => {
		const left = this.arr.slice(0, id);
		const right = this.arr.slice(id, this.arr.length);
		const center = new Array<boolean>(s).fill(false);
		this.arr = left.concat(center.concat(right));
		return left.length + center.length;
	}

	public isIndexAvailable = (id: number) => {
		return this.arr[id];
	}
}


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


	const newParseLine = (line: string) => {
		let newLine = line;
		let counter = 0;
		const bounds = new ParseBounds(0, newLine.length)
		syntaxGroups.forEach(sg => {
			let currentPos = bounds.GetNextIndex(0);
			let f;
			while (currentPos !== -1 && (f = sg.regex.exec(newLine.slice(currentPos, newLine.length))) !== null) {
				let foundString = f[0];
				currentPos = f.index + currentPos;

				if (!bounds.isIndexAvailable(currentPos)){
					currentPos = bounds.GetNextIndex(currentPos)
					continue;
				}

				const left = newLine.slice(0, currentPos);
				const right = newLine.slice(currentPos + foundString.length, newLine.length);
				const center = wrapText(newLine.slice(currentPos, currentPos + foundString.length), sg.textColor, sg.highlightColor)

				newLine = left + center + right;
				const res = bounds.resizeArray(left.length, center.length - foundString.length)
				bounds.SetBounds(res, res + foundString.length );
				currentPos = bounds.GetNextIndex(currentPos)
				//console.log(newLine)
				//console.log(bounds.arr, currentPos)
			}
		})

		return newLine;
	}
	


	const colorValue = (newVal: string) => {
		let newerVal = ''
		const lines =  newVal.split('\n');
		for (let i = 0; i < lines.length - 1; i++){
			newerVal += newParseLine(lines[i]) + '\n';
		}
		newerVal += newParseLine(lines[lines.length - 1])
		return newerVal;
	}

	const handleChange = (e: any) => {
		let newVal = sanitize(e.target.value);
		newVal = colorValue(newVal)
		//console.log(newVal);
		//console.log(editable.current?.childNodes)
		//handleCaretPosition();
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