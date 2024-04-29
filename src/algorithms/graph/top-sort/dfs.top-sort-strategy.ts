import { DirectedGraph } from '@root/data-structures';
import { TopSortStrategy_Interface } from './top-sort-strategy.interface';

export class Dfs_TopSortStrategy implements TopSortStrategy_Interface {
  /**
   * Construct topology order using depth first search
   * Warning: This algorithm may not work properly if there is a cycle
   * in the directed graph
   * @param graph
   * @returns The topology order
   */
  execute(graph: DirectedGraph): number[] {
    // Variables for calculate result
    const order: number[] = Array.from({ length: graph.size() });
    let currentIndex = graph.size() - 1;

    // Variables for traversal
    const visited: boolean[] = Array.from(
      { length: graph.size() },
      () => false,
    );

    // Calculate top order
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      if (visited[vertex]) continue;
      visited[vertex] = true;

      currentIndex = this.topSort(graph, vertex, visited, order, currentIndex);
    }

    return order;
  }

  /**
   * Helper function
   * @param graph
   * @param vertex
   * @param visited
   * @param order
   * @param currentIndex
   * @returns new value of the currentIndex
   */
  protected topSort(
    graph: DirectedGraph,
    vertex: number,
    visited: boolean[],
    order: number[],
    currentIndex: number,
  ): number {
    for (const neighbor of graph.neighbors(vertex)) {
      if (visited[neighbor]) continue;
      visited[neighbor] = true;

      currentIndex = this.topSort(
        graph,
        neighbor,
        visited,
        order,
        currentIndex,
      );
    }

    order[currentIndex] = vertex;

    return currentIndex - 1;
  }
}
