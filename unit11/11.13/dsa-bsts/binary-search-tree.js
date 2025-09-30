class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // if empty tree, make this the root
    if (!this.root) {
      this.root = new Node(val); // make new node
      return this; // return self
    }

    let currentNode = this.root; // start at root
    while (true) {
      if (currentNode.val > val) {
        if (currentNode.left === null) { // currentNode has an open space on the left
          currentNode.left = new Node(val); // insert here
          break;
        } else {
          // currentNode already has a left node; check that left node and keep looking for an open spot
          currentNode = currentNode.left;
        }
      } else if (currentNode.val < val) {
        if (currentNode.right === null) {
          currentNode.right = new Node(val); // insert on the right
          break;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        // there's a small chance that currentNode.val and val will be equivalent
        // in this situation, to keep the order of the tree, just don't insert the value
        break;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
