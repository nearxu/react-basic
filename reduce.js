const data = [
  {
    a: [1, 2, 3, 4],
    b: [11, 22, 33, 44],
  },
  {
    a: [101, 202, 302, 404],
    b: [1111, 2222, 3333, 4444],
  },
];

// how {a:[],b:[]}

const combineData = (data, key, key2) => {
  return data.reduce((pre, cur) => {
    let clone = pre;
    if (cur[key]) {
      if (clone[key]) {
        pre[key] = [...cur[key], ...clone[key]];
      } else {
        pre[key] = [...cur[key]];
      }
    }
    if (cur[key2]) {
      if (clone[key2]) {
        pre[key2] = [...cur[key2], ...clone[key2]];
      } else {
        pre[key2] = [...cur[key2]];
      }
    }
    return clone;
  }, {});
};

console.log(combineData(data, "a", "b"));

const data1 = [
  {
    a: [],
    b: [],
  },
  {
    a: [101, 202, 302, 404],
    b: [1111, 2222, 3333, 4444],
  },
];

console.log(combineData(data1, "a", "b"));

const data2 = [
  {
    a: [],
    b: [],
  },
  {
    a: [],
    b: [1111, 2222, 3333, 4444],
  },
];

console.log(combineData(data2, "a", "b"));
