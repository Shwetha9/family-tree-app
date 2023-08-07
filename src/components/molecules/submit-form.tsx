// components/molecules/submit-form.tsx
import React, { ChangeEvent, FormEvent } from 'react';

interface SubmitFormProps {
  handleSubmit: (e: FormEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: {
    name: string;
    relation: string;
  };
}

export const SubmitForm = ({ handleSubmit, handleInputChange, values }: SubmitFormProps): JSX.Element => (
  <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Enter name' name='name' value={values.name} onChange={handleInputChange} />
    <input type='text' placeholder='Enter relation' name='relation' value={values.relation} onChange={handleInputChange} />
    <button type='submit'>Find Relation</button>
  </form>
);
