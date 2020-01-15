export interface ICollection<T> {
  getAll(): T[];
  insert(item: T): void;
  remove(item: T): void;
  length(): number;
  isEmpty(): boolean;
  getFirst(): T;
  getLast(): T;
}
