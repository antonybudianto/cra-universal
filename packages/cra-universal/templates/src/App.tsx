import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import { ReactComponent as ReactSVG } from './react.svg';
import LazyContent1 from './Content/lazy1';
import LazyContent2 from './Content/lazy2';

const ErrorFallback = () => <div>Error</div>;

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <ReactSVG width={200} height={200} />
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <LazyContent2 />
      <Suspense fallback={<div>Loading, please wait...</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <LazyContent1 />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default App;
