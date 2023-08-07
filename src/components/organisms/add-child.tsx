import { useContext, useState } from 'react';
import { Family } from '../../models/family-member';
import { addChild } from '../../helpers/add-child';
import { FamilyContext } from '../templates/family-tree';

interface SubmitFormProps {
  family: Family | null;
  setFamily: React.Dispatch<React.SetStateAction<Family>>;
}

export const SubmitForm = ({ family, setFamily }: SubmitFormProps): JSX.Element => {
  family = useContext(FamilyContext);
  const [mother, setMother] = useState('');
  const [childName, setChildName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(''); // state to handle error message
  const [success, setSuccess] = useState(''); // added state to handle success message

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFamily: Family = JSON.parse(JSON.stringify(family));
      const isAdded = addChild(updatedFamily, mother, childName, gender);
      if (isAdded) {
        setFamily(updatedFamily);
        setError(''); // clear error message upon successful add
        setSuccess(`Child ${childName} has been added successfully!`); // set success message
      } else {
        setError('Unable to add child. Please check your inputs.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setSuccess(''); // clear success message upon error
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' value={mother} onChange={(e) => setMother(e.target.value)} placeholder="Mother's Name" />
        <input type='text' value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child's Name" />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value=''>--Select Gender--</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <button type='submit'>Add Child</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};
