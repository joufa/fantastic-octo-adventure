import { ITimeCollection } from '../app/timespan.collection';
import { ICollection } from '../app/ICollection';

export interface TimeSpanDto {
  start: string;
  end: string;
}

export interface TimeCollectionDto {
  day: Date;
  spans: TimeSpanDto[];
}

export interface TimeRepository<T extends SerializableTimeCollection> {
  save(item: T): void;
  load(): T;
  clear(): void;
}

export interface SerializableTimeCollection extends ICollection<any>, ITimeCollection {

}
