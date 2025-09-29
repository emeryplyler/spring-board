/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0; // empty tree; sum is 0
    }

    let sum = 0;
    // need some kind of recursive function
    // notes: javascript allows function definition inside other function definitions?
    function summer(node) {
      // if this has no children, return val
      if (!node.children || node.children.length <= 0) {
        sum += node.val; // add this node's value to sum
        return;
      }
      
      // if this has children, call sum function on all children
      for (let child of node.children) {
        summer(child);
      }
      sum += node.val; // add own value to sum
    }
    summer(this.root);
    // after running the function, sum will contain the added values of all children
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    // need to recursively traverse tree, adding to a counter value
    let evens = 0;
    function countEvensHelper(node) {
      // an even number divided by 2 has a remainder of 0
      if (node.val % 2 === 0) {
        evens++;
      }

      // check child nodes
      if (node.children.length > 0) {
        for (const child of node.children) {
          countEvensHelper(child);
        }
      }
    }
    countEvensHelper(this.root); // call function on this tree
    // countEvensHelper() will change the value of evens
    return evens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    
  }
}
let smallTree;
let nSmall = new TreeNode(1);
let nSmall2 = new TreeNode(2);
nSmall.children.push(nSmall2);
smallTree = new Tree(nSmall);
console.log(smallTree.sumValues())

module.exports = { Tree, TreeNode };
