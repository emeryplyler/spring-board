class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex); // try to add the vertex to the set
    // if it's already in there, nothing will change
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (const neighbor of vertex.adjacent) {
      this.removeEdge(neighbor, vertex); // remove vertex-to-delete from other vertices' adjacency lists
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const nodeValues = [];
    const toVisit = [start];
    const seen = new Set(toVisit); // no duplicates

    nodeValues.push(start.value); // add the first node's value

    while (toVisit.length > 0) {
      // pop is okay to use because we want the last item
      // a depth-first search is easier to do using a stack, which is last-in, first-out
      // pop also removes the item from the array which we need too; don't visit the same neighbors again
      let currentNode = toVisit.pop();
      
      for (const neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          nodeValues.push(neighbor.value); // add this node's value to the array
          toVisit.push(neighbor); // visit this node's adjacents next
          seen.add(neighbor); // now we've seen this node and won't add its value to the array again
        }
      }
    }

    return nodeValues;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {}
}

module.exports = {Graph, Node}