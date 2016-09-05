import React from 'react';
import Row from './Row';
import Col from './Col';

class PlayGrid extends React.Component {

	constructor(props) {
		super(props);

		const { rows, cols } = this.props;

		const emptyGrid = this.createVirtualGrid(rows, cols);

		const initialGrid = this.addRandomTiles(emptyGrid, rows, cols, 2);

		this.state = {
			grid: initialGrid,
			moved: false
		};

		this.handleMove = this.handleMove.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.addRandomTiles = this.addRandomTiles.bind(this);
	}

	createVirtualGrid(rows, cols) {

		const grid = [];

		for (let i=0; i<rows; i++) {
			const row = [];

			for (let j=0; j<cols; j++) {
				row.push(0);
			}
			grid.push(row);
		}

		return grid;

	}

	chooseRandom(number) {
		return Math.floor(Math.random() * number);
	}

	componentWillMount() {
		document.addEventListener('keydown', this.handleMove);
	}

	componentWillUnmount() {
		document.removeEventListner('keydown', this.handleMove);
	}

	handleMove(e) {

		// left
		if (e.keyCode === 37) {
			this.moveLeft();
		// up
		} else if (e.keyCode === 38) {
			this.moveUp();
		// right
		} else if (e.keyCode === 39) {
			this.moveRight();
		// down
		} else if (e.keyCode === 40) {
			this.moveDown();
		}

	}

	moveUp() {
		const { grid } = this.state;
		const updatedGrid = grid.slice(0);
		let moved = false;

		for (let i=0; i<updatedGrid.length; i++) {
			for (let j=0; j<updatedGrid[i].length; j++) {
				const value = updatedGrid[i][j];
				const posX = i;
				const posY = j;

				// If the value is 0, we won't move it
				if (value === 0) { continue; }

				// If we're at the top of the grid, so we can't move up
				if (posX === 0) { continue; }

				// Get the above value
				const valueAbove = updatedGrid[posX-1][posY];

				// If the above value is the same as the current value or 0, we can move.
				if (valueAbove === 0 || valueAbove === value) {
					updatedGrid[posX-1][posY] = valueAbove + value;
					updatedGrid[posX][posY] = 0;

					let addedValue = valueAbove !== 0;

					for (let k=posX-1; k>=0; k--) {
						const newValue = updatedGrid[k][posY];

						if (!addedValue) {

							if (k-1 < 0 || (updatedGrid[k-1][posY] !== newValue && updatedGrid[k-1][posY] !== 0)) {
								break;
							}

							updatedGrid[k-1][posY] = updatedGrid[k-1][posY] + newValue;
							updatedGrid[k][posY] = 0;

							addedValue = updatedGrid[k-1][posY] !== newValue;

						} else {

							if (k-1 < 0 || updatedGrid[k-1][posY] !== 0){
								break;
							}

							updatedGrid[k-1][posY] = newValue;
							updatedGrid[k][posY] = 0;

						}
					}

					moved = true;
				}

			}
		}

		this.setState({
			grid: updatedGrid,
			moved
		});
	}

	moveDown() {
		const { grid } = this.state;
		const updatedGrid = grid.slice(0);
		let moved = false;

		for (let i=updatedGrid.length-1; i>=0; i--) {
			for (let j=0; j<updatedGrid[i].length; j++) {
				const value = updatedGrid[i][j];
				const posX = i;
				const posY = j;

				// If the value is 0, we won't move it
				if (value === 0) { continue; }

				// If we're at the bottom of the grid, we can't move down
				if (posX === updatedGrid.length-1) { continue; }

				// Get the above value
				const valueBelow = updatedGrid[posX+1][posY];

				// If the above value is the same as the current value or 0, we can move.
				if (valueBelow === 0 || valueBelow === value) {
					updatedGrid[posX+1][posY] = valueBelow + value;
					updatedGrid[posX][posY] = 0;

					let addedValue = valueBelow !== 0;

					for (let k=posX+1; k<updatedGrid.length; k++) {
						const newValue = updatedGrid[k][posY];

						if (!addedValue) {

							if (k+1 >= updatedGrid.length || (updatedGrid[k+1][posY] !== newValue && updatedGrid[k+1][posY] !== 0)) {
								break;
							}

							updatedGrid[k+1][posY] = updatedGrid[k+1][posY] + newValue;
							updatedGrid[k][posY] = 0;

							addedValue = updatedGrid[k+1][posY] !== newValue;

						} else {

							if (k+1 >= updatedGrid.length || updatedGrid[k+1][posY] !== 0){
								break;
							}

							updatedGrid[k+1][posY] = newValue;
							updatedGrid[k][posY] = 0;

						}
					}

					moved = true;

				}

			}
		}

		this.setState({
			grid: updatedGrid,
			moved
		});
	}

	moveRight() {
		const { grid } = this.state;
		const { rows, cols } = this.props;
		const updatedGrid = grid.slice(0);
		let moved = false;

		for (let j=cols-1; j>=0; j--) {
			for (let i=0; i<rows; i++) {
				const value = updatedGrid[i][j];
				const posX = i;
				const posY = j;

				// If the value is 0, we won't move it
				if (value === 0) { continue; }

				// If we're at the far right of the grid, we can't move left
				if (posY === cols-1) { continue; }

				// Get the right value
				const valueRight = updatedGrid[posX][posY+1];

				// If the right value is the same as the current value or 0, we can move.
				if (valueRight === 0 || valueRight === value) {
					updatedGrid[posX][posY+1] = valueRight + value;
					updatedGrid[posX][posY] = 0;

					let addedValue = valueRight !== 0;

					for (let k=posY+1; k<cols; k++) {
						const newValue = updatedGrid[posX][k];

						if (!addedValue) {

							if (k+1 > cols || (updatedGrid[posX][k+1] !== newValue && updatedGrid[posX][k+1] !== 0)) {
								break;
							}

							updatedGrid[posX][k+1] = updatedGrid[posX][k+1] + newValue;
							updatedGrid[posX][k] = 0;

							addedValue = updatedGrid[posX][k+1] !== newValue;


						} else {

							if (k+1 > rows || updatedGrid[posX][k+1] !== 0) {
								break;
							}

							updatedGrid[posX][k+1] = newValue;
							updatedGrid[posX][k] = 0;

						}
					}

					moved = true;

				}

			}
		}

		this.setState({
			grid: updatedGrid,
			moved
		});
	}

	moveLeft() {
		const { grid } = this.state;
		const { rows, cols } = this.props;
		const updatedGrid = grid.slice(0);
		let moved = false;

		for (let j=0; j<cols; j++) {
			for (let i=0; i<rows; i++) {
				const value = updatedGrid[i][j];
				const posX = i;
				const posY = j;

				// If the value is 0, we won't move it
				if (value === 0) { continue; }

				// If we're at the far left of the grid, we can't move left
				if (posY === 0) { continue; }

				// Get the above value
				const valueLeft = updatedGrid[posX][posY-1];

				// If the left value is the same as the current value or 0, we can move.
				if (valueLeft === 0 || valueLeft === value) {
					updatedGrid[posX][posY-1] = valueLeft + value;
					updatedGrid[posX][posY] = 0;

					let addedValue = valueLeft !== 0;

					for (let k=posY-1; k>=0; k--) {
						const newValue = updatedGrid[posX][k];

						if (!addedValue) {

							if (k-1 < 0 || (updatedGrid[posX][k-1] !== newValue && updatedGrid[posX][k-1] !== 0)) {
								break;
							}

							updatedGrid[posX][k-1] = updatedGrid[posX][k-1] + newValue;
							updatedGrid[posX][k] = 0;

							addedValue = updatedGrid[posX][k-1] !== newValue;


						} else {

							if (k-1 < 0 || updatedGrid[posX][k-1] !== 0) {
								break;
							}

							updatedGrid[posX][k-1] = newValue;
							updatedGrid[posX][k] = 0;

						}
					}

					moved = true;

				}

			}
		}

		this.setState({
			grid: updatedGrid,
			moved
		});
	}


	componentDidUpdate() {
		const { grid, moved } = this.state;
		const { cols, rows } = this.props;

		if (moved) {
			const updatedGrid = this.addRandomTiles(grid, cols, rows);

			this.setState({
				grid: updatedGrid,
				moved: false
			});
		}
	}

	addRandomTiles(grid, cols, rows, number=1) {

		let newGrid = grid.slice(0);

		for (let i=0; i<number; i++) {

			const randomCol = this.chooseRandom(cols);
			const randomRow = this.chooseRandom(rows);

			if (newGrid[randomRow][randomCol] === 0) {
				newGrid[randomRow][randomCol] = 2;
				continue;
			}

			newGrid = this.addRandomTiles(grid, cols, rows);

		}

		return newGrid;

	}

	render() {

		const { grid } = this.state;

		const width = 600;

		const style = {
			width: `${width}px`,
			margin: 'auto'
		};

		let x=0;
		let y=0;

		return (
			<div style={style} onKeyDown={this.handleMove}>
				{ grid.map((row) => {
					return (
						<Row key={`row-${x++}`}>
							{ row.map((col) => {
								return (
									<Col key={`col-${y++}-${col}`} value={col} size={width/row.length} />
								);					
							})}
						</Row>
					);
				})}
			</div>
		);
	}

}

export default PlayGrid;