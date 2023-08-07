import { Family } from '../../models/family-member';
import { familyData } from '../../fixtures/family-data';
import { SubmitForm } from '../organisms/add-child';
import { useState } from 'react';
import { FindMember } from '../organisms/find-member';
import React from 'react';
import './family-tree.scss';
export const FamilyContext = React.createContext<Family | null>(null);

export default function FamilyTree() {
  const [family, setFamily] = useState<Family>(() => familyData);
  return (
    <FamilyContext.Provider value={family}>
      <section className='ft-app-home'>
        <FindMember />
        <SubmitForm family={family} setFamily={setFamily} />
      </section>
    </FamilyContext.Provider>
  );
}
