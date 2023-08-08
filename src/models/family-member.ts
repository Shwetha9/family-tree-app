export interface Member {
  name: string;
  spouse?: string | null;
  children?: Member[]; // self-declaring
  siblings?: string[];
  parents?: string[];
  gender?: string;
  relatives?: Relative;
  grandChildren?: string[];
  isChildBearing?: boolean;
}

export interface Relative {
  uncles?: string[] | undefined;
  aunts?: string[] | undefined;
  nieces?: string[] | undefined;
  nephews?: string[] | undefined;
}

export interface Family {
  name: string;
  spouse: string | null;
  children?: Member[];
}
