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
  const uncles =
    member.parents?.flatMap(
      (parent) =>
        family.children?.filter((sibling) => sibling.name !== parent && sibling.gender === 'male').map((uncle) => uncle.name) || []
    ) || [];

  const aunts =
    member.parents?.flatMap(
      (parent) =>
        family.children?.filter((sibling) => sibling.name !== parent && sibling.gender === 'female').map((aunt) => aunt.name) || []
    ) || [];

  const nieces =
    member.children?.flatMap(
      (child) => child.children?.filter((grandChild) => grandChild.gender === 'female').map((niece) => niece.name) || []
    ) || [];

  const nephews =
    member.children?.flatMap(
      (child) => child.children?.filter((grandChild) => grandChild.gender === 'male').map((nephew) => nephew.name) || []
    ) || [];

  const grandchildren = member.children?.flatMap((child) => child.children?.map((grandChild) => grandChild.name) || []) || [];

  return {
    name: member.name,
    gender: member.gender,
    spouse: member.spouse || null,
    parents: member.parents || [],
    siblings: member.siblings || [],
    children: member.children?.map((child) => child.name) || [],
    grandchildren,
    relatives: {
      uncles: uncles.filter((name): name is string => Boolean(name)),
      aunts: aunts.filter((name): name is string => Boolean(name)),
      nieces: nieces.filter((name): name is string => Boolean(name)),
      nephews: nephews.filter((name): name is string => Boolean(name)),
    },
  };
};

export const transformFamily = (family: Family): TransformedMember[] => {
  return family.children ? family.children.map((child) => transformMember(child, family)) : [];
};
