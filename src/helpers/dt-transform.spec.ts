import { transformMember, transformFamily } from './dt-transform';
// fixture
const sampleFamily = {
  name: 'King Richard',
  spouse: 'Bonnie',
  gender: 'male',
  children: [
    {
      name: 'John',
      gender: 'male',
      spouse: 'Jane',
      parents: ['King Richard', 'Bonnie'],
      siblings: [],
      children: [
        {
          name: 'Spencer',
          gender: 'male',
          children: [
            { name: 'Jatin', gender: 'male' },
            { name: 'Lalit', gender: 'female' },
          ],
        },
        {
          name: 'Judie',
          gender: 'female',
          children: [
            { name: 'Art', gender: 'male' },
            { name: 'Simon', gender: 'female' },
          ],
        },
      ],
    },
  ],
};

describe('transformMember', () => {
  it('should transform member with complete data', () => {
    const transformed = transformMember(sampleFamily.children[0], sampleFamily);

    expect(transformed).toEqual({
      name: 'John',
      gender: 'male',
      spouse: 'Jane',
      parents: ['King Richard', 'Bonnie'],
      siblings: [],
      children: ['Spencer', 'Judie'],
      grandchildren: ['Jatin', 'Lalit', 'Art', 'Simon'],
      relatives: {
        uncles: [],
        aunts: [],
        nephews: [],
        nieces: [],
      },
    });
  });

  it('should transform member with missing data', () => {
    const member = {
      name: 'John',
    };

    const transformed = transformMember(member, sampleFamily);

    expect(transformed).toEqual({
      name: 'John',
      gender: undefined,
      spouse: null,
      parents: [],
      siblings: [],
      children: [],
      grandchildren: [],
      relatives: {
        uncles: [],
        aunts: [],
        nieces: [],
        nephews: [],
      },
    });
  });

  it('should handle members with the same name', () => {
    const family = {
      name: 'King Richard',
      spouse: null,
      gender: null,
      children: [
        {
          name: 'John',
          gender: 'male',
          spouse: 'Jane',
          parents: ['Father', 'Mother'],
          siblings: [],
          children: [
            { name: 'Child1', gender: 'male', children: [{ name: 'Grandchild1', gender: 'male' }] },
            { name: 'John', gender: 'female', children: [{ name: 'Grandchild2', gender: 'female' }] }, // Member with the same name
          ],
        },
      ],
    };

    const transformed = transformMember(family.children[0], family);

    expect(transformed).toEqual({
      name: 'John',
      gender: 'male',
      spouse: 'Jane',
      parents: ['Father', 'Mother'],
      siblings: [],
      children: ['Child1', 'John'], // Both members with the same name should be included
      grandchildren: ['Grandchild1', 'Grandchild2'], // All grandchildren should be included
      relatives: {
        uncles: [],
        aunts: [],
        nieces: [],
        nephews: [],
      },
    });
  });

  it('should handle duplicate children', () => {
    const member = {
      name: 'John',
      gender: 'male',
      spouse: 'Jane',
      parents: ['Father', 'Mother'],
      siblings: ['Sibling1', 'Sibling2'],
      children: [
        { name: 'Child1', gender: 'male', children: [{ name: 'Grandchild1', gender: 'male' }] },
        { name: 'Child2', gender: 'female', children: [{ name: 'Grandchild2', gender: 'female' }] },
        { name: 'Child1', gender: 'male', children: [{ name: 'Grandchild3', gender: 'male' }] }, // Duplicate child name
      ],
    };

    const transformed = transformMember(member, sampleFamily);

    expect(transformed).toEqual({
      name: 'John',
      gender: 'male',
      spouse: 'Jane',
      parents: ['Father', 'Mother'],
      siblings: ['Sibling1', 'Sibling2'],
      children: ['Child1', 'Child2', 'Child1'], // Duplicate child name should be included
      grandchildren: ['Grandchild1', 'Grandchild2', 'Grandchild3'], // All grandchildren should be included
      relatives: {
        uncles: [],
        aunts: [],
        nieces: [],
        nephews: [],
      },
    });
  });

  // Add more test cases to cover other scenarios and edge cases...
});

describe('transformFamily', () => {
  it('should transform family with children', () => {
    const family = {
      name: 'King Richard',
      spouse: null,
      gender: null,
      children: [
        {
          name: 'John',
          gender: 'male',
          spouse: 'Jane',
          parents: ['Father', 'Mother'],
          siblings: [],
          children: [
            { name: 'Child1', gender: 'male', children: [{ name: 'Grandchild1', gender: 'male' }] },
            { name: 'Child2', gender: 'female', children: [{ name: 'Grandchild2', gender: 'female' }] },
          ],
        },
      ],
    };

    const transformed = transformFamily(family);

    expect(transformed).toEqual([
      {
        name: 'John',
        gender: 'male',
        spouse: 'Jane',
        parents: ['Father', 'Mother'],
        siblings: [],
        children: ['Child1', 'Child2'],
        grandchildren: ['Grandchild1', 'Grandchild2'],
        relatives: {
          uncles: [],
          aunts: [],
          nieces: [],
          nephews: [],
        },
      },
    ]);
  });

  it('should transform family with empty children', () => {
    const family = { name: 'King Richard', spouse: null, gender: null, children: [] };

    const transformed = transformFamily(family);

    expect(transformed).toEqual([]);
  });

  // Add more test cases to cover other scenarios and edge cases...
});
