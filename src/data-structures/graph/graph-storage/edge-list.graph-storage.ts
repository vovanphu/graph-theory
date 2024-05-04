import { GraphStorage_Interface } from './graph-storage.interface';

export class Edge {
  static DEFAULT_WEIGHT = 1;
  public source: number;
  public destination: number;
  protected _weight: number = Edge.DEFAULT_WEIGHT;

  constructor(source: number, destination: number, weight?: number) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }

  set weight(value: number | undefined) {
    this._weight = value ?? Edge.DEFAULT_WEIGHT;
  }

  get weight(): number {
    return this._weight;
  }
}

export class EdgeList_GraphStorage implements GraphStorage_Interface {
  protected vertices: number;
  protected edges: Array<Edge>;

  constructor(size?: number) {
    this.vertices = 0;
    this.edges = new Array<Edge>();

    if (size !== undefined) {
      this.vertices = size as number;
    }
  }

  size(): number {
    return this.vertices;
  }

  setVertex(vertex: number): void {
    if (vertex < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    const existEdgeIndex = this.edges.findIndex(
      (edge) => edge.source === vertex && edge.destination === vertex,
    );

    if (existEdgeIndex < 0) {
      const newEdge = new Edge(vertex, vertex, 0);
      this.edges.push(newEdge);
    }

    this.vertices = Math.max(this.vertices, vertex + 1);
  }

  setEdge(source: number, destination: number, weight?: number): void {
    if (source < 0 || destination < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    this.setVertex(source);
    this.setVertex(destination);

    const existEdgeIndex = this.edges.findIndex(
      (edge) => edge.source === source && edge.destination === destination,
    );

    if (existEdgeIndex > -1) {
      this.edges[existEdgeIndex].weight = weight;
    } else {
      const newEdge = new Edge(source, destination, weight);
      this.edges.push(newEdge);
    }

    this.vertices = Math.max(this.vertices, source + 1, destination + 1);
  }

  weight(source: number, destination: number): number {
    const lastIndex = this.size() - 1;

    if (source > lastIndex || destination > lastIndex) {
      throw new Error('Out of graph bound');
    }

    const existEdge = this.edges.find(
      (edge) => edge.source === source && edge.destination === destination,
    );

    if (existEdge === undefined) return Infinity;
    return existEdge.weight as number;
  }

  neighbors(vertex: number): number[] {
    const lastIndex = this.size() - 1;

    if (vertex > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return this.edges.flatMap((edge) => {
      return edge.source === vertex ? edge.destination : [];
    });
  }
}
