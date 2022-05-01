import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);
// registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
