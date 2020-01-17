import { Injectable } from '@angular/core';

import { ITimeCollection } from '../../core/domain/model/interfaces/timespan';
import { TimeCollectionRepository } from '../../core/domain/repo/timecollection.repo';
import { TimeCollectionDto } from './repo.model';
import { DtoMapper } from './time-dto.serializer';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageRepository extends TimeCollectionRepository<ITimeCollection> {

  private readonly PREFIX = 'WORKDAYAPP-';
  private mapper = new DtoMapper();

  saveCollection(collection: ITimeCollection): void {
    const dto: TimeCollectionDto = this.mapper.mapFrom(collection);
    this.setItem('collection', dto);
  }

  getCollection(): ITimeCollection {
    const item = this.getItem('collection');
    if (!item) {
      return null;
    }
    return this.mapper.mapTo(item);
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
