import { TimeSpan } from './timespan';

export interface ICollection<T> {
  getAll(): T[];
  insert(item: T): void;
  remove(item: T): void;
  length(): number;
  isEmpty(): boolean;
}

export class TimeCollection<T extends TimeSpan> implements ICollection<T> {
  private head: Node<T>;
  private tail: Node<T>;
  private data: Node<T>[];

  constructor() {
    this.data = [];
  }

  getAll(): T[] {
    const items: T[] = [];
    this.data.forEach(item => items.push(item.data));
    return items;
  }

  insert(item: T): void {
    const node = {previous: null, next: null, data: item} as Node<T>;
    if (this.data.length === 0) {
      this.data.push(node);
      return;
    }


  }
  remove(item: T): void {
    throw new Error('Method not implemented.');
  }
  length(): number {
    return this.data.length;
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }


}

export interface Node<T extends TimeSpan> {
  previous: Node<T>;
  next: Node<T>;
  data: T;
}
