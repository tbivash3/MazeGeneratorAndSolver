import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreadthFirstSearch {
    constructor() {}

    findPath(source: number, destination:number, traversalArray: number[][]) {

        let graph = this.createNodeGraph(traversalArray);

        return this.search(graph, source, destination);
    }
    search(graph: Map<number, number[]>, source: number, destination: number) {
        

        let frontier: number[][] = [];

        frontier.push([source, -1]);

        let index = 0;

        while (index < frontier.length) {

            let node = frontier[index][0];

            if (node === destination) break;

            let adjacentNodes = graph.get(node) || [];

            for(let i = 0; i < adjacentNodes.length; i++) {
                
                if(i % 2 == 0) {
                    frontier.push([adjacentNodes[i], adjacentNodes[i + 1], ...frontier[index]]);
                }

            }

            index++;

        }

        return frontier[index];


    }

    
    createNodeGraph(traversalArray: number[][]) {

        let graph = new Map();
    
        traversalArray.forEach((data) => {
          if(data.length == 4) {
    
            const fromNode = data[0];
            const toNode = data[1];
            const direction = data[2];
    
            if(graph.has(fromNode)) {
              graph.get(fromNode).push(toNode);
              graph.get(fromNode).push(direction);
            } else {
              graph.set(fromNode, []);
              graph.get(fromNode).push(toNode);
              graph.get(fromNode).push(direction);
            }
    
          }
        })
    
        return graph;
      }
}
