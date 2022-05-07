import { createContext, PropsWithChildren, useContext } from 'react';

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

const DataContext = createContext(null);

type DataProviderProps = {
  data: any;
};

export function DataProvider({
  children,
  data,
}: PropsWithChildren<DataProviderProps>): JSX.Element {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.
const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
];

export function useData() {
  const ctx = useContext<any>(DataContext);
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read();
  }
  return fakeData;
}

export function createData() {
  let done = false;
  let promise: Promise<void> | null = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, 5000);
      });
      throw promise;
    },
  };
}
