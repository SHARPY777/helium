import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
  {
    title: 'Appetizers',
    data: [
      {
        id: '1',
        title: 'Pasta',
        price: '10',
      },
      {
        id: '3',
        title: 'Pizza',
        price: '8',
      },
    ],
  },
  {
    title: 'Salads',
    data: [
      {
        id: '2',
        title: 'Caesar',
        price: '2',
      },
      {
        id: '4',
        title: 'Greek',
        price: '3',
      },
    ],
  },
];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
  // Assuming the data structure is similar to SECTION_LIST_MOCK_DATA
  return data.map(category => ({
    title: category.category, // Assuming each category has a "category" property
    data: category.items.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
    })),
  }));
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
