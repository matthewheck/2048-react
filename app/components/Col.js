import React from 'react';

class Col extends React.Component {

	render() {

		const { size, value } = this.props;

		const borderSize = 5;

		let color = '#DDDDDD';

		switch(value) {
		case 2:
			color = '#001F3F';
			break;
		case 4:
			color = '#0074D9';
			break;
		case 8:
			color = '#7FDBFF';
			break;
		case 16:
			color = '#39CCCC';
			break;
		case 32:
			color = '#3D9970';
			break;
		case 64:
			color = '#2ECC40';
			break;
		case 128:
			color = '#01FF70';
			break;
		case 256:
			color = '#FFDC00';
			break;
		case 512:
			color = '#FF851B';
			break;
		case 1024:
			color = '#FF4136';
			break;
		case 2048:
			color = '#85144B';
			break;
		case 4096:
			color = '#F012BE';
			break;
		case 8192:
			color = '#B10DC9';
			break;
		case 16384:
			color = '#111111';
			break;
		default:
			color = 'grey';
		}

		const style = {
			width: `${size-(borderSize*2)}px`,
			height: `${size-(borderSize*2)}px`,
			float: 'left',
			border: `${borderSize}px solid orange`,
			borderRadius: '10px',
			backgroundColor: color,
			lineHeight: `${size-(borderSize*2)}px`,
			textAlign: 'center',
			position: 'relative'
		};

		const valueStyle = {
			color: '#FFF',
			fontSize: '64px',
			verticalAlign: 'middle',

		};

		let valueDisplay;

		if (value !== 0){
			valueDisplay = value;
		}

		return (

			<div style={style}>
				<span style={valueStyle}>
					{valueDisplay}
				</span>
			</div>
		);

	}

}

export default Col;