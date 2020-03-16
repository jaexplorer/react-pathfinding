const backtrace = (node, currNode) => {
  node.parent = currNode;
  let path = [node];
  while (node.parent) {
    node = node.parent;
    path.push(node);
  }
  path.reverse();
  return path;
};

export default backtrace;
