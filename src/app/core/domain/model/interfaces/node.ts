import { ITimeSpan } from './timespan';

export interface Node<T extends ITimeSpan> {
  previous: Node<T>;
  next: Node<T>;
  data: T;
}
