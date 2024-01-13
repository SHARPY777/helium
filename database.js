import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    const values = menuItems.map(({ uuid, title, price, category }) => `('${uuid}', '${title}', '${price}', '${category}')`).join(', ');
    tx.executeSql(`INSERT INTO menuitems (uuid, title, price, category) VALUES ${values};`);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const categoryCondition = activeCategories.length ? `AND category IN ('${activeCategories.join("','")}')` : '';
      tx.executeSql(
        `SELECT * FROM menuitems WHERE title LIKE ? ${categoryCondition};`,
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(new Error(`Error executing SQL transaction: ${error.message}`));
        }
      );
    });
  });
}
