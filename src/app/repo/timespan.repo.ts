import { TimeSpan } from '../app/timespan';
import { TimeCollection } from '../core/collections/timespan.collection';
import { TimeCollectionDto, TimeRepository } from './repo.model';
import { TimeDtoSerializer } from './time-dto.serializer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageRepository implements TimeRepository<TimeCollection<TimeSpan>> {

  readonly PREFIX: string;
  ser = new TimeDtoSerializer();
  constructor() {
    this.PREFIX = 'WORKDAYAPP-';
  }

  save(item: TimeCollection<TimeSpan>) {
    const dto: TimeCollectionDto = this.ser.toDto(item);
    this.setItem('collection', dto);
  }
  load(): TimeCollection<TimeSpan> {
    const item = this.getItem('collection');
    if (!item) {
      return null;
    }
    return this.ser.toCollection(item);
  }
  clear() {
    localStorage.clear();
  }

  private setItem(key: string, value: any) {
    localStorage.setItem(`${this.PREFIX}${key}`, JSON.stringify(value));
  }

  private getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${this.PREFIX}${key}`));
  }

}
