import { Member, Family } from '../models/family-member';

export const getEligibleMothers = (family: Family | Member): string[] => {
  let mothers: string[] = [];
  // Assumption that Queen Anga is not of child bearing age
  if (family.children) {
    family.children.forEach((child) => {
      if (child.gender === 'male' && child.spouse) {
        // Check if the child is male and has a spouse
        mothers.push(child.spouse);
      } else if (child.gender === 'female') {
        // Check if the child is female
        mothers.push(child.name);
      }
      // Recursive function to handle levels deep
      mothers = mothers.concat(getEligibleMothers(child));
    });
  }

  return mothers;
};

export const addChild = (family: Family | Member, mother: string, childName: string, gender: string): boolean => {
  // Ensure the specified mother is eligible to add a child
  const eligibleMothers = getEligibleMothers(family);
  if (!eligibleMothers.includes(mother)) {
    throw new Error(`You cannot add a child to a non-family member: ${mother} does not exist in the family.`);
  }

  if (family.children) {
    for (let child of family.children) {
      if (child.spouse && child.spouse.toLowerCase() === mother.toLowerCase()) {
        const siblings = child.children ? child.children.map((child) => child.name) : [];

        // Create new member
        const newMember: Member = {
          name: childName,
          gender: gender,
          spouse: null,
          children: [],
          siblings: siblings,
          parents: [child.name, child.spouse],
        };

        // Add the new member to the children
        child.children ? child.children.push(newMember) : (child.children = [newMember]);
        return true;
      }
    }
  }

  // If no match was found, throw an error
  throw new Error(`You cannot add a child to a non-family member: ${mother} does not exist in the family.`);
};
