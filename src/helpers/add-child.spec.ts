import { familyData } from '../fixtures/family-data';
import { Family, Member } from '../models/family-member';
import { getEligibleMothers, addChild } from './add-child';

describe('getEligibleMothers', () => {
  it('should return all eligible mothers from the family data', () => {
    const familyCopy = JSON.parse(JSON.stringify(familyData)); // Clone familyData
    const mothers = getEligibleMothers(familyCopy);
    expect(mothers).toEqual(['Ambi', 'Jaya', 'Lika', 'Jnki', 'Lavanya', 'Kpila', 'Satya', 'Satyv', 'Krpi', 'Mina']);
  });

  it('should handle an empty data', () => {
    const data: Family = { name: '', spouse: null, children: [] };
    expect(getEligibleMothers(data)).toEqual([]);
  });
});

describe('addChild', () => {
  it('should add a child to the specified mother', () => {
    const familyCopy: Family = JSON.parse(JSON.stringify(familyData)); // Clone familyData
    addChild(familyCopy, 'Lika', 'NewChild', 'female');
    const testCase: Member | undefined = familyCopy.children?.find((item) => item.spouse?.toLowerCase() === 'lika');
    expect(testCase?.children![2].name).toBe('NewChild');
  });

  it('should throw an error if the mother is not eligible', () => {
    expect(() => addChild(familyData, 'NonExistentMother', 'NewChild', 'female')).toThrowError();
  });
});
