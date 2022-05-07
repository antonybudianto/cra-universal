import { lazy } from 'react';

/**
 * Demonstrate lazy with Suspense
 */
const LazyContent1 = lazy(() => import('./Content1'));

export default LazyContent1;
