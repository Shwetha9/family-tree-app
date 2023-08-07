import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps): JSX.Element => (
  <section className='ft-search'>
    <h3>{title}</h3>
    <div className='ft-search-results'>{children}</div>
  </section>
);
