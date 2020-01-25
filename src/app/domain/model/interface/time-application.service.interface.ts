import { ITimeSpan } from './timespan';

export interface ITimeApplicationService<T extends ITimeSpan> {
  addSpan(span: T): void;
  removeSpan(span: T | number): void;
  startPending(time: string): void;
  endPending(): void;
  clear(): void;
  select(idx: number): void;
  unselect(): void;
  merge(): void;
}
