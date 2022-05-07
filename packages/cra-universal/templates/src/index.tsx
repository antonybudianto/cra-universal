import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { createData, DataProvider } from './data';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <DataProvider data={createData()}>
    <App />
  </DataProvider>
);
// registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
