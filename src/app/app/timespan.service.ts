import { Injectable } from '@angular/core';
import { TimeCollection } from '../core/collections/timespan.collection';
import { TimeSpan, MomentTimeSpan } from './timespan';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRepository } from '../repo/timespan.repo';

@Injectable({
  providedIn: 'root',
})
export class TimespanService {

  private collection: TimeCollection<TimeSpan>;

  private bs = new BehaviorSubject<TimeSpan[]>([]);
  private durationBs = new BehaviorSubject<string>('');
  private dateBs = new BehaviorSubject<Date>(null);

  public data$ = this.bs.asObservable();
  public duration$ = this.durationBs.asObservable();
  public date$ = this.dateBs.asObservable();

  constructor(private repo: LocalStorageRepository) {
    this.init();
  }

  addSpan(t: TimeSpan) {
    try {
      this.collection.insert(t);
      this.repo.save(this.collection);
      this.next();
    } catch (error) {
      console.error(error);
    }

  }

  removeSpan(t: TimeSpan) {
    try {
      this.collection.remove(t);
      this.repo.save(this.collection);
      this.next();
    } catch (error) {
      console.error(error);
    }
  }

  private init() {
    const data: TimeCollection<TimeSpan> = this.repo.load();

    if (!data || !this.isSameDay(data.day(), new Date())) {
      // new instance
      this.collection = new TimeCollection<MomentTimeSpan>(new Date());
      this.repo.save(this.collection);
    } else {
      this.collection = data;
    }
    this.next();
    this.dateBs.next(this.collection.day());
  }

  private next(): void {
    this.bs.next(this.collection.getAll());
    this.durationBs.next(this.collection.getDurationAsString());
  }

  private isSameDay(first: Date, second: Date): boolean {
    return new Date(first).getDay() === new Date(second).getDay();
  }


}

