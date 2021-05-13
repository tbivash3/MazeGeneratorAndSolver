import { Injectable } from '@angular/core';
import { Helper } from '../utility/helper';

@Injectable({ providedIn: 'root' })
export class RandomizedKruskal {
  constructor() {}

  groupArray: any;

  createMaze(width: number, height: number, traversalArray: number[][]) {
    let edgeArray = this.generateEdgeArray(width, height);

    this.groupArray = this.groupArray = Array.from(
      new Array<number>(width * height),
      (_, index) => index
    );

    while (edgeArray.length > 0) {
      let lengthOfEdgeArray = edgeArray.length;

      let randomEdgeNumber = Math.floor(Math.random() * lengthOfEdgeArray);

      let randomEdge = edgeArray[randomEdgeNumber];
      const node1Group = this.findGroup(randomEdge[0]);
      const node2Group = this.findGroup(randomEdge[1]);

      if (node1Group !== node2Group) {
        traversalArray.push(randomEdge);
        traversalArray.push([...randomEdge, 1]);
        this.updateGroupArray(node1Group, node2Group);
      }

      edgeArray.splice(randomEdgeNumber, 1);
    }
  }

  findGroup(node: number) {
    while (this.groupArray[node] !== node) {
      node = this.groupArray[node];
    }

    return node;
  }

  updateGroupArray(groupOne: number, groupTwo: number) {
    if (groupOne < groupTwo) {
      this.groupArray[groupTwo] = groupOne;
    } else {
      this.groupArray[groupOne] = groupTwo;
    }
  }

  //   updateGroupArray(edge: number[]) {
  //     const node1 = edge[0];
  //     const node2 = edge[1];

  //     if (this.groupArray[node1] === -1 && this.groupArray[node2] === -1) {
  //       const minNode = Math.min(node1, node2);
  //       const maxNode = Math.max(node1, node2);

  //       this.groupArray[minNode] = minNode;
  //       this.groupArray[maxNode] = minNode;
  //     } else if (this.groupArray[node1] === -1) {
  //       this.groupArray[node1] = this.groupArray[node2];
  //     } else if (this.groupArray[node2] === -1) {
  //       this.groupArray[node2] = this.groupArray[node1];
  //     } else {
  //       let node1Group = this.findGroup(node1);
  //       let node2Group = this.findGroup(node2);

  //       if (node1Group < node2Group) {
  //         this.groupArray[node2Group] = node1Group;
  //       } else {
  //         this.groupArray[node1Group] = node2Group;
  //       }
  //     }
  //   }

  generateEdgeArray(width: number, height: number) {
    const totalNodes = width * height;

    let edgeArray: number[][] = [];

    for (let i = 0; i < totalNodes; i++) {
      const adjacentNodes = Helper.getAdjacentCells(i, width, height);

      adjacentNodes.forEach((node) => {
        const direction = Helper.findDirection(i, node, width);
        edgeArray.push([i, node, direction]);
      });
    }

    return edgeArray;
  }
}
