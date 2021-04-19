export const mergeParentToChild = ({ parents, childs, childKey, parentKey }) => {
  return parents.map((parent) => {
    let child = childs.find((e) => e[childKey] === parent[parentKey]);
    let cloneChild = {};
    if (child && Object.keys(child).length > 0) {
      cloneChild = JSON.parse(JSON.stringify(child));
      delete cloneChild[childKey];
    }

    return {
      ...parent,
      ...cloneChild,
    };
  });
};

export const mergeChildToParent = ({ parents, childs, childKey, parentKey, childName }) => {
  return parents.map((parent) => {
    let _childs = childs.filter((e) => e[childKey] === parent[parentKey]);
    parent[childName] = _childs;
    return {
      ...parent,
    };
  });
};
