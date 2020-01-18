import { ITimeCollection } from '../model/interfaces/timespan';

export abstract class TimeCollectionRepository<T extends ITimeCollection> {
  abstract saveCollection(collection: T): void;
  abstract getCollection(): T;
  abstract clear(): void;
}
