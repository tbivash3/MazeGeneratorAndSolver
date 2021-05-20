import { Injectable } from '@angular/core';
import { NodePath } from '../utility/Node';

@Injectable({ providedIn: 'root' })
export class Utility {

    constructor() { }

    createNodeGraph(traversalArray: number[][]) {

        let graph = new Map();

        traversalArray.forEach((data) => {
            if (data.length == 4) {

                const node = data[0];
                const nextNode = data[1];
                let direction = data[2];

                if (graph.has(node)) {
                    const nodePath: NodePath = { node, nextNode, direction };
                    graph.get(node).push(nodePath);

                } else {
                    graph.set(node, []);
                    const nodePath: NodePath = { node, nextNode, direction };
                    graph.get(node).push(nodePath)
                }

                direction = direction + 2;

                if (direction > 4) {
                    direction = direction - 4;
                }

                if (graph.has(nextNode)) {
                    const nodePath: NodePath = { node: nextNode, nextNode: node, direction };
                    graph.get(nextNode).push(nodePath);

                } else {
                    graph.set(nextNode, []);
                    const nodePath: NodePath = { node: nextNode, nextNode: node, direction };
                    graph.get(nextNode).push(nodePath)
                }

            }
        })

        return graph;
    }
}