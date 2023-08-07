import React from 'react';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input = ({ value, onChange, placeholder }: InputProps): JSX.Element => (
  <input type='text' value={value} onChange={onChange} placeholder={placeholder} />
);
