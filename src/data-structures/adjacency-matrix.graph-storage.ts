import { GraphStorage_Interface } from './graph-storage.inferface';

export class AdjacencyMatrix_GraphStorage implements GraphStorage_Interface {
  private vertices: number;

  private adjacencyMatrix: Array<Array<number>>;

  constructor(size?: number) {
    this.vertices = 0;
    this.adjacencyMatrix = [];

    if (size !== undefined) {
      this.adjacencyMatrix = new Array(size).fill(
        new Array(size).fill(Infinity),
      );
      this.vertices = size as number;
    }
  }

  size(): number {
    return this.vertices;
  }

  setEdge(
    source: number,
    destination: number,
    weight?: number | undefined,
  ): void {
    if (source < 0 || destination < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    const lastIndex = this.size() - 1;

    if (lastIndex < source || lastIndex < destination) {
      const greaterIndex = Math.max(source, destination);

      for (let i = 0; i <= greaterIndex; i++) {
        if (i <= lastIndex) {
          for (let j = lastIndex + 1; j <= greaterIndex; j++) {
            this.adjacencyMatrix[i][j] = Infinity;
          }
        } else {
          this.adjacencyMatrix[i] = new Array(greaterIndex + 1).fill(Infinity);
        }
      }

      this.vertices = greaterIndex + 1;
    }

    if (weight !== undefined) {
      this.adjacencyMatrix[source][destination] = weight as number;
    } else {
      this.adjacencyMatrix[source][destination] = 0;
    }
  }

  weight(source: number, destination: number): number {
    const lastIndex = this.size() - 1;

    if (source > lastIndex || destination > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return this.adjacencyMatrix[source][destination];
  }

  neighbors(vertex: number): number[] {
    const lastIndex = this.size() - 1;

    if (vertex > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return this.adjacencyMatrix[vertex]
      .map((v, i) => (v !== Infinity ? i : undefined))
      .filter((i) => i !== undefined) as number[];
  }
}
