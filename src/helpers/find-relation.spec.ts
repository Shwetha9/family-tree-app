import { TransformedMember } from './dt-transform';
import { findRelation } from './find-relation'; // Adjust the path as needed

describe('findRelation', () => {
  const transformedFamily: { [name: string]: TransformedMember } = {
    Chit: {
      name: 'Chit',
      gender: 'male',
      spouse: 'Ambi',
      parents: ['King Shan', 'Queen Anga'],
      children: ['Drita', 'Vrita'],
      grandchildren: ['Jata'],
      siblings: ['Ish', 'Vich', 'Satya'],
      relatives: { uncles: [], aunts: [], nieces: ['Jata'], nephews: [] },
    },
  };

  it('should find parents correctly', () => {
    expect(findRelation(transformedFamily, 'Chit', 'parents')).toEqual(['King Shan', 'Queen Anga']);
  });

  it('should find children correctly', () => {
    expect(findRelation(transformedFamily, 'Chit', 'children')).toEqual(['Drita', 'Vrita']);
  });

  it('should find siblings correctly', () => {
    expect(findRelation(transformedFamily, 'Chit', 'siblings')).toEqual(['Ish', 'Vich', 'Satya']);
  });

  it('should find grandchildren correctly', () => {
    expect(findRelation(transformedFamily, 'Chit', 'grandchildren')).toEqual(['Jata']);
  });

  it('should throw an error for unsupported relation', () => {
    expect(() => findRelation(transformedFamily, 'Chit', 'unknown')).toThrowError('Unsupported relation: unknown');
  });

  it('should throw an error if the member is not found', () => {
    expect(() => findRelation(transformedFamily, 'Unknown', 'parents')).toThrowError('No person named Unknown in the family');
  });
});
