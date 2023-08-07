import { useState, useContext } from 'react';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { Card } from '../molecules/search-results';
import { findRelation } from '../../helpers/find-relation';
import { FamilyContext } from '../templates/family-tree';
import { Family } from '../../models/family-member';
import './organisms.scss';

export const FindMember = (): JSX.Element => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState(''); // added state to handle error message
  const family = useContext(FamilyContext);

  const findFamilyMember = () => {
    if (name === '' || relation === '') {
      setError('Both fields must be filled out.');
      return;
    }

    try {
      const relatives = findRelation(family as Family, name, relation) || [];
      if (relatives?.length > 0) {
        setResult(relatives);
      } else {
        setError(`No ${relation} found!`);
      }
    } catch (error) {
      setResult([]);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <section className='ft-app-find-member'>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
      <Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder='Enter relationship' />
      <Button onClick={findFamilyMember} text='Find Relatives' />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* display error message */}
      {result.length > 0 && (
        <Card title='Result'>
          <ul>
            {result.map((relative, index) => (
              <li key={index} className='ft-app-relatives-list'>
                {relative}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
};
