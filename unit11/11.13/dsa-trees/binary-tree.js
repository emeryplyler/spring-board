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
    // may use similar pattern to min/maxDepth()

    function sumHelper(node) {
      if (node.left === null && node.right === null) {
        return node.val; // when reaching a leaf, return the leaf's value
      }

      if (node.left === null) {
        // only left is null, traverse right side
        return sumHelper(node.right) + node.val; // return children's values and this node's value
      }
      
      if (node.right === null) {
        return sumHelper(node.left) + node.val;
      }

      // this node has both a left and right;
      // compare left and right sums and return the larger one, plus the current node's value
      const left = sumHelper(node.left);
      const right = sumHelper(node.right);

      return Math.max(left, right) + node.val;
    }

    // like in a bracket tournament, the largest possible sum will slowly rise to the top and be returned
    return sumHelper(this.root);
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
