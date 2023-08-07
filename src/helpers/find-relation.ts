import { Family, Member } from '../models/family-member';

const findAuntsAndUncles = (target: Member, family: Family, relation: string): string[] => {
  const relatives: string[] = [];
  for (const parent of target.parents || []) {
    for (const child of family.children || []) {
      if (child.name === parent && child.gender) {
        if (
          (relation.toLowerCase() === 'uncles' && child.gender === 'male') ||
          (relation.toLowerCase() === 'aunts' && child.gender === 'female')
        ) {
          relatives.push(...(child.siblings || []));
        }
      }
    }
  }
  // Handle empty results
  if (relatives.length === 0) {
    throw new Error(`No ${relation} found.`);
  }
  return relatives;
};

export const findRelation = (family: Family, name: string, relation: string): string[] | undefined => {
  let targetMember: Member | undefined;

  // find the target member in the children of the family
  if (family.children?.length) {
    for (const child of family.children) {
      if (child.name.toLowerCase() === name.toLowerCase() || child.spouse?.toLowerCase() === name.toLowerCase()) {
        targetMember = child;
        break;
      }
      if (child.children?.length) {
        for (const grandchild of child.children) {
          if (grandchild.name.toLowerCase() === name.toLowerCase() || grandchild.spouse?.toLowerCase() === name.toLowerCase()) {
            targetMember = grandchild;

            break;
          }
        }
      }
    }
  }

  if (!targetMember) {
    throw new Error(`No person named ${name} in the family`);
  }

  switch (relation.toLowerCase()) {
    case 'parents':
      return targetMember.parents?.filter((parent) => parent !== name);
    case 'children':
      return targetMember.children?.map((child) => child.name);
    case 'siblings':
      return targetMember.siblings?.filter((sibling) => sibling !== name);
    case 'uncles':
    case 'aunts':
      return findAuntsAndUncles(targetMember, family, relation);
    case 'nieces':
      return targetMember.relatives?.nieces;
    case 'nephews':
      return targetMember.relatives?.nephews;
    default:
      throw new Error(`Unsupported relation: ${relation}`);
  }
};
