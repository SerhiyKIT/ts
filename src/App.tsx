import React from 'react';
import './App.css';
import AntdTable from './components/AntdTable';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const AppReact = React.createElement;

export const App = () => {
	return (
		<div className="App">
			<Provider store={store}>
				<AntdTable />
			</Provider>
		</div>
	);
};

export default App;
