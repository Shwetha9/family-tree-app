import { Family, Member, Relative } from '../models/family-member';
export type ExtendedMember = Member & { parents: string[] };
// Interface as provided
export interface TransformedMember {
  name: string;
  gender?: string | undefined;
  spouse?: string | null;
  parents?: string[];
  children?: string[];
  grandchildren: string[];
  siblings?: string[];
  relatives?: Relative;
}

export const transformMember = (member: Member, family: Family): TransformedMember => {
  const parents = member.parents || [];
  const parentsWithSiblings = parents.flatMap((parent) => {
    const parentData = family.children?.find((child) => child.name === parent);
    return parentData?.siblings || [];
  });

  const uncles = parentsWithSiblings
    .filter((uncle) => family.children?.find((child) => child.name === uncle)?.gender === 'male')
    .map((uncle) => uncle);

  const aunts = parentsWithSiblings
    .filter((aunt) => family.children?.find((child) => child.name === aunt)?.gender === 'female')
    .map((aunt) => aunt);

  const nieces =
    parentsWithSiblings.length > 0
      ? member.children?.flatMap(
          (child) => child.children?.filter((grandChild) => grandChild.gender === 'female').map((niece) => niece.name) || []
        ) || []
      : [];

  const nephews =
    parentsWithSiblings.length > 0
      ? member.children?.flatMap(
          (child) => child.children?.filter((grandChild) => grandChild.gender === 'male').map((nephew) => nephew.name) || []
        ) || []
      : [];

  const grandchildren = member.children?.flatMap((child) => child.children?.map((grandChild) => grandChild.name) || []) || [];

  return {
    name: member.name,
    gender: member.gender,
    spouse: member.spouse || null,
    parents,
    siblings: member.siblings || [],
    children: member.children?.map((child) => child.name) || [],
    grandchildren,
    relatives: {
      uncles,
      aunts,
      nieces: parentsWithSiblings.length > 0 ? nieces.filter((name): name is string => Boolean(name)) : [],
      nephews: parentsWithSiblings.length > 0 ? nephews.filter((name): name is string => Boolean(name)) : [],
    },
  };
};

export const transformFamily = (family: Family): TransformedMember[] => {
  return family.children ? family.children.map((child) => transformMember(child, family)) : [];
};
