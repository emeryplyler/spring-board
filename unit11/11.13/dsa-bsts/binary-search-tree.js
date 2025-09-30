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

  insertRecursively(val, currentNode = this.root) {
    // added another argument to hold the current node. added a default value so that it's optional
    // will still work when called without specified currentNode
    
    if (!this.root) { // empty tree case
      this.root = new Node(val);
      return this;
    }

    
    if (currentNode.val > val) {
      if (!currentNode.left) {
        // base case: current node has an open slot in the correct place
        currentNode.left = new Node(val); // insert on the left
        return this;
      } else {
        // recursive case: need to check the left child instead
        return this.insertRecursively(val, currentNode.left);
      }
    } else if (currentNode.val < val) {
      if (!currentNode.right) {
        currentNode.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, currentNode.right);
      }
    } else {
      // edge case: value is already in the tree, don't insert
      return this;
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    // similar to insert
    let currentNode = this.root; // start at the root

    while (currentNode) {
      if (currentNode.val === val) return currentNode;
      // eventually, if the value doesn't exist in the tree, the search will check a non-existent child node
      // because currentNode no longer exists, the while loop will end
      // because there is no return value set after the while loop, it will return undefined which is correct

      if (currentNode.val > val) {
        currentNode = currentNode.left; // check left child
      } else {
        currentNode = currentNode.right; // must be less than; check right child
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    // similar to recursive insert

    if (!currentNode) return undefined; // non-existent node

    if (currentNode.val > val) {
      // recursive cases
      // these calls can return one of two things:
      // undefined, if it kept searching and couldn't find it
      // or a node, which will get passed up the callstack chain back to here
      // then it will get returned
      return this.findRecursively(val, currentNode.left); // check left side
    } else if (currentNode.val < val) {
      return this.findRecursively(val, currentNode.right);
    } else {
      // found the node!
      return currentNode;
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // need a helper function, because visited must persist
    let visited = [];

    // recursive helper function
    function preOrderHelper(current) {
      if (!current) return; // non-existent node
      visited.push(current.val); // add this node to the list
      preOrderHelper(current.left); // continue on to left child
      preOrderHelper(current.right); // continue on to right child
    }

    preOrderHelper(this.root); // populate visited array
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];
    // for in order traversal, go all the way to the left, then add self, then add right
    // it's a bunch of carrot-shaped trios ^

    function inOrderHelper(current) {
      if (!current) return;
      inOrderHelper(current.left); // go to left child first
      visited.push(current.val); // add this node to the list
      inOrderHelper(current.right); // do right child last
    }
    
    inOrderHelper(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];
    // for post order traversal, traverse left, then right, then self
    // both children are visited before self

    function postOrderHelper(current) {
      if (!current) return;
      postOrderHelper(current.left); // go to left child first
      postOrderHelper(current.right); // then go to the right
      visited.push(current.val); // now add the current node
    }

    postOrderHelper(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // bfs visits each row in order, siblings and cousins, left to right
    // since it's row by row, may be easier to iterate than use recursion

    if (!this.root) return [];

    // queue method recommended to me by geeksforgeeks and medium.com,
    // code implementation is my own

    let visited = [];
    let queue = [];

    queue.push(this.root);
    
    while (queue.length > 0) {
      let currentNode = queue.at(0); // retrieve item at index 0
      queue.splice(0, 1); // remove the item at one from the queue
      if (currentNode) {
        visited.push(currentNode.val); // add current node to visited (if it exists)
        queue.push(currentNode.left); // queue up the two children and visit them next
        queue.push(currentNode.right);
      }
    }

    return visited;

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
