import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';

@Injectable({ providedIn: 'root' })
export class BreadthFirstSearch {
    constructor() {}

    findPath(source: number, destination:number, traversalArray: number[][]) {

        let graph = this.createNodeGraph(traversalArray);        
        return this.search(graph, source, destination);
    }

    search(graph: Map<number, NodePath[]>, source: number, destination: number) {
        let frontier: NodePath[][] = [];
        let searchPath: NodePath[] = [];

        let sourceNodePaths = graph.get(source) || [];

        sourceNodePaths.forEach(path => {
          frontier.push([path]);
        })

        let index = 0;

        while (index < frontier.length) {

            let nodePath = frontier[index];

            searchPath.push(nodePath[0]);

            if (nodePath[0].node === destination) break;

            let adjacentNodes = graph.get(nodePath[0].nextNode) || [];

            for(let i = 0; i < adjacentNodes.length; i++) {
                
                frontier.push([adjacentNodes[i], ...nodePath]);

            }
            index++;
        }

        const bestPath = frontier[index];

        const paths = {searchPath, bestPath};

        return paths;
    }
    
    createNodeGraph(traversalArray: number[][]) {

        let graph = new Map();
    
        traversalArray.forEach((data) => {
          if(data.length == 4) {
    
            const node = data[0];
            const nextNode = data[1];
            const direction = data[2];
    
            if(graph.has(node)) {
              const nodePath: NodePath = {node, nextNode, direction};
              graph.get(node).push(nodePath);
    
            } else {
              graph.set(node, []);
              const nodePath: NodePath = {node, nextNode, direction};
              graph.get(node).push(nodePath)
            }
    
          }
        })
    
        return graph;
      }
}
