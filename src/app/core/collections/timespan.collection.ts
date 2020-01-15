import { TimeSpan } from '../../app/timespan';
import { MomentService } from '../../app/moment.service';
import { ICollection } from './ICollection';
import { ITimeCollection } from './ITimeCollection';
import { Node } from './Node';

export class TimeCollection<T extends TimeSpan> implements ICollection<T>, ITimeCollection {

  private readonly initDay: Date;
  private head: Node<T>;
  private tail: Node<T>;
  private size = 0;
  // TODO
  private moment = new MomentService().get();

  constructor(day: Date) {
    if (!day) {
      throw new Error('Day cannot be null');
    }
    this.initDay = day;
  }

  day() {
    return this.initDay;
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
    const node = { previous: null, next: null, data: item } as Node<T>;

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      this.size = 1;
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
  }

  remove(item: T): void {

    if (this.isEmpty()) {
      return;
    }

    if (this.head.data.isSame(item)) {
      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
      this.size--;
      return;
    }

    if (this.tail.data.isSame(item)) {
      this.tail.previous.next = null;
      this.tail = this.tail.previous;
      this.size--;
      return;
    }

    let current = this.head.next;
    while (current) {
      if (current.data.isSame(item)) {
        current.previous.next = current.next;
        current.next.previous = current.previous;
        if (this.tail === current) {
          this.tail = current.previous;
        }
        break;

      }
      current = current.next;
    }

    if (current === null) {
      // Not found in list
      throw new Error('Item does not exist');
    }
    this.size--;

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

  debug() {
    let s = '| Collection debug view\r\n';
    s = s + `| Length: ${this.length()}, IsEmpty: ${this.isEmpty()}\r\n`;
    s = s + `| Head set: ${this.head !== null}, Tail set: ${this.tail !== null}\r\n`;
    let i = 1;
    if (this.length() === 0) {
      console.log(s);
      return;
    }
    this.getAll().forEach(item => {
      s = s + `| ${i}: ${item.toString()} `;
      if (this.head && this.head.data.isSame(item)) {
        s = s + 'H* ';
      }
      if (this.tail && this.tail.data.isSame(item)) {
        s = s + 'T* ';
      }
      s = s + '\r\n';
      i++;
    });
    console.log(s);
  }
}
