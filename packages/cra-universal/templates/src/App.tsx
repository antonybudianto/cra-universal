import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import { ReactComponent as ReactSVG } from './react.svg';
import LazyContent1 from './Content/lazy1';
// import LazyContent2 from './Content/lazy2';

const ErrorFallback = (e: any) => {
  return <div>Error!</div>;
};

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
      {/**
       * @TODO
       * Uncomment when react@18.2.0 released.
       * Currently this caused hydration warnings.
       */}
      {/* <LazyContent2 /> */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading, please wait...</div>}>
          <LazyContent1 />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

App.defaultProps = {
  streaming: true,
};

export default App;
