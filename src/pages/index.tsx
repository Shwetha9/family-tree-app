import FamilyTree from '../components/templates/family-tree';
import './index.scss';
const HomePage = (): JSX.Element => {
  return (
    <main className='ft-app'>
      <h1>The Family Tree Project</h1>
      <FamilyTree></FamilyTree>
    </main>
  );
};

export default HomePage;
