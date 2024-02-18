import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React from "react";
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'



export const CodeBox = () => {
	const editable = React.useRef<HTMLElement>();
	const [value, setValue] = React.useState<string>('');

	const colors = ['red', 'green', 'blue', 'yellow', 'black']

	const sanitizeConf = {
		allowedTags: ['pre']
	}

	const sanitize = (newVal: string) => {
		return sanitizeHtml(newVal, sanitizeConf)
	}


	const colorValue = (newVal: string) => {
		let newerVal = ''
		const lines =  newVal.split('\n');
		for (let i = 0; i < lines.length - 1; i++){
			newerVal += `<span style="color: ${colors[Math.floor(Math.random() * colors.length)]};">` + lines[i] + '\n' + '</span>'
		}
		newerVal += `<span style="color: ${colors[Math.floor(Math.random() * colors.length)]};">` + lines[lines.length - 1] + '</span>'
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