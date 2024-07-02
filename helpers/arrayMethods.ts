// unique key for all items should have name of id
// key should be called id because database being used is mongodb

// remove item from array
export const removeFromArray = (
  arr: Array<{
    id: string;
  }>,
  key: string
) => {
  const new_array = arr.filter((item: { id: string }) => item.id !== key);
  return new_array;
};

// add any item to the array
export const addToArray = (arr: any[], newItem: any) => {
  const new_arr = [...arr, newItem];
  return new_arr;
};

// add to array if it doesnt exist
export const addUniqueToArray = (arr: any[], key: string, newItem: any) => {
  const existItem = arr.find((item: { id: string }) => item.id === key); // check if item already exists
  const new_array = existItem
    ? arr.map((item: { id: string }) => (item.id === key ? newItem : item))
    : [...arr, newItem]; // add if its not tehre
  return new_array;
};

// check if item already exists in array
export const doesItemExist = (arr: any[], key: string) => {
  const newitem = arr.find((item) => item.id === key);
  const exists = newitem ? true : false;
  return exists;
};

// find one item from array
export const findFromArray = (arr: any[], key: string | number) => {
  const newitem = arr.find((item) => item.id === key);
  // const exists = newitem ? true : false;
  return newitem;
};
