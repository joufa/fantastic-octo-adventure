import { Injectable } from '@angular/core';
import { TimeCollection } from '../model/time.collection';
import { PendingParams } from './pending.params';
import { BehaviorSubject } from 'rxjs';
import { ITimeSpan, ITimeCollection } from '../model/interfaces/timespan';
import { TimeCollectionRepository } from '../repo/timecollection.repo';
import { MomentTimeSpan } from '../model/moment-timespan';
import { WdError } from '../base/wd-error';

@Injectable({
  providedIn: 'root',
})
export class TimespanService {

  private collection: ITimeCollection;

  private pending = { pending: false } as PendingParams;

  private dataSubject = new BehaviorSubject<ITimeSpan[]>([]);
  private durationSubject = new BehaviorSubject<string>('');
  private dateSubject = new BehaviorSubject<Date>(null);
  private collectionSubject = new BehaviorSubject<ITimeCollection>(null);
  private pendingSubject = new BehaviorSubject<PendingParams>(this.pending);

  public data$ = this.dataSubject.asObservable();
  public duration$ = this.durationSubject.asObservable();
  public date$ = this.dateSubject.asObservable();
  public collection$ = this.collectionSubject.asObservable();
  public pending$ = this.pendingSubject.asObservable();

  constructor(private repo: TimeCollectionRepository<ITimeCollection>) {
    this.init();
  }

  addSpan(t: ITimeSpan) {
    try {
      this.collection.insert(t);
      this.repo.saveCollection(this.collection);
      this.next();
    } catch (error) {
      throw new WdError('Cannot add new timespan!');
    }
  }

  removeSpan(t: ITimeSpan) {
    try {
      this.collection.remove(t);
      this.repo.saveCollection(this.collection);
      this.next();
    } catch (error) {
      throw new WdError('Cannot remove timespan!');
    }
  }

  startPending(time: string) {
    if (!this.pending.pending) {
    !time ? this.pending = {pending: true, start: this.nowString()} as PendingParams
      : this.pending = {pending: true, start: time} as PendingParams;
    } else {
      throw new WdError('Already pending!');
    }
    this.pendingSubject.next(this.pending);
  }

  endPending() {
    if (!this.pending.pending) {
      throw new WdError('Cannot end pending while isn\'t even started!');
    }
    const ts = new MomentTimeSpan(this.pending.start, this.nowString());
    this.addSpan(ts);
    this.pending = {pending: false} as PendingParams;
    this.pendingSubject.next(this.pending);
  }

  clear() {
    this.collection = new TimeCollection<MomentTimeSpan>(new Date());
    this.repo.clear();
    this.next();
  }

  private init() {
    const data: ITimeCollection = this.repo.getCollection();

    if (!data || !this.isSameDay(data.day(), new Date())) {
      // new instance
      this.collection = new TimeCollection<MomentTimeSpan>(new Date());
      this.repo.saveCollection(this.collection);
    } else {
      this.collection = data;
    }
    this.next();
    this.dateSubject.next(this.collection.day());
  }

  private next(): void {
    this.dataSubject.next(this.collection.getAll());
    this.durationSubject.next(this.collection.getDurationAsString());
    this.collectionSubject.next(this.collection);
  }

  private isSameDay(first: Date, second: Date): boolean {
    return new Date(first).getDay() === new Date(second).getDay();
  }

  private nowString() {
    const now: Date = new Date();
    const hours: string = (now.getHours() > 9) ? now.getHours().toString() : `0${now.getHours()}`;
    const minutes: string = (now.getMinutes() > 9) ? now.getMinutes().toString() : `0${now.getMinutes()}`;
    return `${hours}.${minutes}`;
  }
}
