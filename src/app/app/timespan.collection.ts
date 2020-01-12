import { TimeSpan } from './timespan';
import { Observable, BehaviorSubject } from 'rxjs';
import { MomentService } from './moment.service';

export interface ICollection<T> {
  getAll(): T[];
  insert(item: T): void;
  remove(item: T): void;
  length(): number;
  isEmpty(): boolean;
  getDurationAsString(): string;
}

export class TimeCollection<T extends TimeSpan> implements ICollection<T> {

  private head: Node<T>;
  private tail: Node<T>;
  private size = 0;
  private moment = new MomentService().get();

  private bs = new BehaviorSubject<T[]>(this.getAll());
  private durationBs = new BehaviorSubject<string>('');


  asObservable(): Observable<T[]> {
   return this.bs.asObservable();
  }

  durationObservable(): Observable<string> {
    return this.durationBs.asObservable();
  }

  getAll(): T[] {

    const items: T[] = [];
    if (this.isEmpty()) {
      return items;
    }
    if (this.length() === 1) {
      items.push(this.head.data);
      return items;
    }

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
      this.next();
      return;
    }

    // TODO: Refactor this
    if (this.conflicts(node)) {
      throw new Error('Time conflict');
    }

    if (node.data.isBefore(this.head.data)) {

      node.next = this.head;
      node.next.previous = node;
      this.head = node;

    } else if (node.data.isAfter(this.tail.data)) {
      node.previous = this.tail;
      node.previous.next = node;
      this.tail = node;

    } else {

      let current = this.head.next;
      while (current) {
        if (current.data.isAfter(node.data)) {
          node.next = current;
          node.previous = current.previous;

          current.previous.next = node;
          current.previous = node;
          break;
        }
        current = current.next;
      }

    }

    this.size++;
    this.next();
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

  getDurationAsString(): string {
    let duration = 0;
    const data = this.getAll();
    data.forEach(item => {
      duration = duration + item.duration();
    });
    return this.moment.duration(duration).toJSON();
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
  private next(): void {
    this.bs.next(this.getAll());
    this.durationBs.next(this.getDurationAsString());
  }
}

export interface Node<T extends TimeSpan> {
  previous: Node<T>;
  next: Node<T>;
  data: T;
}
