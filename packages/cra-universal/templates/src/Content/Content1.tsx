import { useData } from '../data';

const Content1 = () => {
  const d = useData();
  console.log('useData: ', d);
  return <div>LazyContent1 - with Suspense</div>;
};

export default Content1;
