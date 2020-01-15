import { TimeSpan } from '../../app/timespan';

export interface Node<T extends TimeSpan> {
  previous: Node<T>;
  next: Node<T>;
  data: T;
}
