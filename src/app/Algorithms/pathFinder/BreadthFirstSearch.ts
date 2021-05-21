import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';
import { Utility } from './Utility';

@Injectable({ providedIn: 'root' })
export class BreadthFirstSearch {
  constructor(private utility: Utility) { }

  findPath(source: number, destination: number, traversalArray: number[][]) {

    let graph = this.utility.createNodeGraph(traversalArray);

    return this.search(graph, source, destination);
  }

  search(graph: Map<number, NodePath[]>, source: number, destination: number) {
    let frontier: NodePath[][] = [];
    let searchPath: NodePath[] = [];
    let visited: Set<number> = new Set();


    let sourceNodePaths = graph.get(source) || [];

    sourceNodePaths.forEach(path => {
      frontier.push([path]);
    })

    let index = 0;

    while (index < frontier.length) {

      let nodePath = frontier[index];

      searchPath.push(nodePath[0]);

      if (nodePath[0].node === destination) break;

      visited.add(nodePath[0].node);

      let adjacentNodes = graph.get(nodePath[0].nextNode) || [];

      for (let i = 0; i < adjacentNodes.length; i++) {

        if (!visited.has(adjacentNodes[i].node)) {
          frontier.push([adjacentNodes[i], ...nodePath]);
        }

      }
      index++;
    }

    const bestPath = frontier[index].splice(1,);

    const paths = { searchPath, bestPath };

    return paths;
  }


}
