import React from 'react';
import PlayGrid from './components/PlayGrid';

class App extends React.Component {

	render() {
		return (
			<div>
				<PlayGrid
					rows={4}
					cols={4} />
			</div>
		);
	}

}

export default App;