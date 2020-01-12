import { TimeSpan, MomentTimeSpan } from './timespan';

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
  private size = 0;

  getAll(): T[] {
    const items: T[] = [];
    let n = this.head;
    while (n) {
      items.push(n.data);
      n = n.next;
    }
    return items;
  }

  insert(item: T): void {
    const node = {previous: null, next: null, data: item} as Node<T>;

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      this.size = 1;
      return;
    }

    if (this.conflicts(node)) {
      throw new Error('Time conflict');
    }

    let n = this.head;

    while (n) {

      if (node.data.isBefore(n.data)) {

        n.previous = node;
        node.next = n;
        if (n === this.head) {
          this.head = node;
        }
        if (n === this.tail) {
          this.tail = node;
        }
      }

      if (n === this.tail) {
        n.next = node;
        node.previous = n;
        this.tail = node;
      }
      n = n.next;
    }
    this.size++;

  }
  remove(item: T): void {
    throw new Error('Method not implemented.');
  }
  length(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }

  private conflicts(t: Node<T>): boolean {
    let node = this.head;
    while (node) {
      if (node.data.conflicts(t.data)) {
        return true;
      }
      node = node.next;
    }
    return false;
  }
}

export interface Node<T extends TimeSpan> {
  previous: Node<T>;
  next: Node<T>;
  data: T;
}
