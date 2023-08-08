import { TransformedMember } from '../helpers/dt-transform';

export const findRelation = (family: { [name: string]: TransformedMember }, name: string, relation: string): string[] | undefined => {
  // Find the target member using the name
  const targetMember = family[name];

  if (!targetMember) {
    throw new Error(`No person named ${name} in the family`);
  }

  switch (relation.toLowerCase()) {
    case 'parents':
      return targetMember.parents?.filter((parent) => parent !== name);
    case 'children':
      return targetMember.children;
    case 'grandchildren':
      return targetMember.grandchildren;
    case 'siblings':
      return targetMember.siblings?.filter((sibling) => sibling !== name);
    case 'uncles':
      return targetMember.relatives?.uncles;
    case 'aunts':
      return targetMember.relatives?.aunts;
    case 'nieces':
      return targetMember.relatives?.nieces;
    case 'nephews':
      return targetMember.relatives?.nephews;
    default:
      throw new Error(`Unsupported relation: ${relation}`);
  }
};
