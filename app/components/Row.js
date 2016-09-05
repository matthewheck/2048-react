import React from 'react';

const style = {
	width: '100%',
	float: 'left',
	clear: 'both',
};

class Row extends React.Component {

	render() {

		const { children } = this.props;

		return (
			<div style={style}>
				{children}
			</div>
		);

	}

}

export default Row;