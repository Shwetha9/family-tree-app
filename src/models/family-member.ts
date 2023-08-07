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
  uncles?: string[];
  aunts?: string[];
  nieces?: string[];
  nephews?: string[];
}

export interface Family {
  name: string;
  spouse: string | null;
  children?: Member[];
}
