import _ from 'lodash';

const getTreeChanges = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.map((key) => {
    if (!_.has(before, key)) {
      return {
        key, state: 'added', value: after[key],
      };
    }
    if (!_.has(after, key)) {
      return {
        key, state: 'deleted', value: before[key],
      };
    }
    if (!_.isEqual(before[key], after[key])) {
      return {
        key,
        state: 'changed',
        value: {
          oldValue: before[key], newValue: after[key],
        },
      };
    }
    return {
      key, state: 'unchanged', value: before[key],
    };
  });
};
export default getTreeChanges;