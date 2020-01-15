import { ITimeCollection } from '../core/collections/ITimeCollection';
import { ICollection } from '../core/collections/ICollection';

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
