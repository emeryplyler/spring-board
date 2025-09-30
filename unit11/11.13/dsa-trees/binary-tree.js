/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0; // empty tree
    // need a recursive function
    function minHelper(node) {
      // a node is a leaf if left and right are both null
      if (node.left === null && node.right === null) {
        return 1; // this is the start of the count

      } else if (node.left === null && node.right != null) {
          // only a right side exists; repeat the process on the right side
          // add one to include the current node in the count
        return minHelper(node.right) + 1;

      } else if (node.left != null && node.right === null) {
        return minHelper(node.left) + 1; // must traverse left side
      }
      // if the node has both a left and right child, compare which one is shorter

      let l = minHelper(node.left); // call func on left side
      let r = minHelper(node.right);

      return Math.min(l, r) + 1 // add one again, to include current node
    }

    return minHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0; // empty tree

    // same as minDepth, except taking the larger number
    function maxHelper(node) {
      if (node.left === null && node.right === null) {
        return 1;

      } else if (node.left === null && node.right != null) {
        return maxHelper(node.right) + 1;

      } else if (node.left != null && node.right === null) {
        return maxHelper(node.left) + 1;
      }

      let l = maxHelper(node.left);
      let r = maxHelper(node.right);

      return Math.max(l, r) + 1 // take the larger of the two
    }

    return maxHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;
    
    // the path can go up and down the tree and doesn't need to start at the root
    // may need to check the maximum between left node, right node, and parent? but nodes can't be traversed twice
    let sum = 0;

    function sumHelper(node) {
      if (!node) return 0; // node doesn't exist, return its sum (0)
      
      if (node.left === null && node.right === null) {
        return node.val; // when reaching a leaf, return the leaf's value
      }

      // otherwise, check children
      const left = sumHelper(node.left); // if either one of these is null, it will just return 0
      const right = sumHelper(node.right);

      // compare; which is greater, the sum, or all three of them?
      sum = Math.max(sum, node.val + left + right);
      // if the three of them are the largest sum, then sum will never change again

      // Important!: we set the sum here, but we return only the larger value of the left or right path, NOT the all three
      // since using all three would end the path

      return Math.max(node.val + left, node.val + right);
    }

    sumHelper(this.root);
    return sum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
