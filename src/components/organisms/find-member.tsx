import { TransformedMember, transformFamily } from '../../helpers/dt-transform'; // Replace with the correct path
import { findRelation } from '../../helpers/find-relation'; // Replace with the correct path
import { useState, useContext } from 'react';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { Card } from '../molecules/search-results';
import { FamilyContext } from '../templates/family-tree';

import './organisms.scss';
import { Family } from '../../models/family-member';

export const FindMember = (): JSX.Element => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState('');
  const family = useContext(FamilyContext); // Using TransformedFamily type
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(''); // Clear the error when the name input changes
  };

  const handleRelationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRelation(e.target.value);
    setError(''); // Clear the error when the relation input changes
  };

  const findFamilyMember = () => {
    if (name === '' || relation === '') {
      setError('Both fields must be filled out.');
      return;
    }

    const transformedFamilyArray = transformFamily(family as Family);
    const familyDto: { [name: string]: TransformedMember } = Object.fromEntries(
      transformedFamilyArray.map((member) => [member.name, member])
    );

    try {
      const relatives = findRelation(familyDto, name, relation) || [];
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

  const availableRelations = ['parents', 'children', 'siblings', 'grandchildren', 'uncles', 'aunts', 'nieces', 'nephews']; // define available relations

  return (
    <section className='ft-app-find-member'>
      <Input value={name} onChange={handleNameChange} placeholder='Enter name' />
      <select value={relation} onChange={handleRelationChange} placeholder='Select relationship'>
        <option value='' disabled>
          Select relationship
        </option>
        {availableRelations.map((rel, index) => (
          <option key={index} value={rel}>
            {rel}
          </option>
        ))}
      </select>
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
