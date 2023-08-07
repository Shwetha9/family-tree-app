import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button = ({ onClick, text }: ButtonProps): JSX.Element => <button onClick={onClick}>{text}</button>;
