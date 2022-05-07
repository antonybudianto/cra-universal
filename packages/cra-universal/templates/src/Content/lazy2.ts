import { lazy } from 'react';

/**
 * Demonstrate "always" SSR component
 */
const LazyContent2 = lazy(() => import('./Content2'));

export default LazyContent2;
