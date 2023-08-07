import { Family } from '../models/family-member';

export const familyData: Family = {
  name: 'King Shan',
  spouse: 'Queen Anga',
  children: [
    {
      name: 'Ish',
      gender: 'male',
      spouse: null,
      children: [],
      siblings: ['Chit', 'Vich', 'Satya'],
      parents: ['King Shan', 'Queen Anga'],
    },
    {
      name: 'Chit',
      gender: 'male',
      spouse: 'Ambi',
      children: [
        {
          name: 'Drita',
          gender: 'male',
          spouse: 'Jaya',
          children: [{ name: 'Jata', spouse: null }],
          siblings: ['Vrita'],
          parents: ['Chit', 'Ambi'],
        },
        {
          name: 'Vrita',
          gender: 'male',
          spouse: null,
          children: [],
          siblings: ['Drita'],
          parents: ['Chit', 'Ambi'],
        },
      ],
      siblings: ['Ich', 'Vich', 'Satya'],
      parents: ['King Shan', 'Queen Anga'],
      grandChildren: [''],
    },
    {
      name: 'Vich',
      spouse: 'Lika',
      gender: 'male',
      children: [
        {
          name: 'Vila',
          gender: 'male',
          spouse: 'Jnki',
          children: [{ name: 'Lavanya', gender: 'female' }],
          siblings: ['Chika'],
          parents: ['Vich', 'Lika'],
        },
        {
          name: 'Chika',
          gender: 'male',
          spouse: 'Kpila',
          children: [],
          siblings: ['Vila'],
          parents: ['Vich', 'Lika'],
        },
      ],
      siblings: ['Ich', 'Chit', 'Satya'],
      parents: ['King Shan', 'Queen Anga'],
    },
    {
      name: 'Satya',
      spouse: 'Vyan',
      gender: 'female',
      children: [
        {
          name: 'Satyv',
          gender: 'female',
          spouse: 'Asva',
          children: [],
          siblings: ['Savya', 'Sayan'],
          parents: ['Satya', 'Vyan'],
        },

        {
          name: 'Savya',
          gender: 'male',
          spouse: 'Krpi',
          children: [],
          siblings: ['Satyv', 'Sayan'],
          parents: ['Satya', 'Vyan'],
        },
        {
          name: 'Sayan',
          gender: 'male',
          spouse: 'Mina',
          children: [],
          siblings: ['Satyv', 'Savya'],
          parents: ['Satya', 'Vyan'],
        },
      ],
      siblings: ['Ich', 'Chit', 'Vich'],
      parents: ['King Shan', 'Queen Anga'],
    },
  ],
};
