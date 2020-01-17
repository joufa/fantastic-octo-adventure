import { ITimeCollection } from '../model/interfaces/timespan';

export abstract class TimeCollectionRepository<T extends ITimeCollection> {
  abstract saveCollection(collection: T): void;
  abstract getCollection(): T;
  // TODO: For debugging
  abstract clear(): void;
}
