import { Injectable } from '@angular/core';
import { TimeCollection } from '../model/time.collection';
import { PendingParams } from './pending.params';
import { BehaviorSubject } from 'rxjs';
import { ITimeSpan, ITimeCollection } from '../model/interfaces/timespan';
import { TimeCollectionRepository } from '../repo/timecollection.repo';
import { MomentTimeSpan } from '../model/moment-timespan';
import { WdError } from '../base/wd-error';
import { ITimeApplicationService } from '../model/interfaces/time.application.service';
import { WdErrorCodes } from '../model/error.codes';

@Injectable({
  providedIn: 'root',
})
export class TimespanService implements ITimeApplicationService<ITimeSpan> {

  private collection: ITimeCollection;

  private pending = { pending: false } as PendingParams;

  private dataSubject = new BehaviorSubject<ITimeSpan[]>([]);
  private durationSubject = new BehaviorSubject<string>('');
  private dateSubject = new BehaviorSubject<Date>(null);
  private collectionSubject = new BehaviorSubject<ITimeCollection>(null);
  private pendingSubject = new BehaviorSubject<PendingParams>(this.pending);
  private selectedSubject = new BehaviorSubject<ITimeSpan>(null);

  public data$ = this.dataSubject.asObservable();
  public duration$ = this.durationSubject.asObservable();
  public date$ = this.dateSubject.asObservable();
  public collection$ = this.collectionSubject.asObservable();
  public pending$ = this.pendingSubject.asObservable();
  public selected$ = this.selectedSubject.asObservable();

  constructor(private repo: TimeCollectionRepository<ITimeCollection>) {
    this.init();
  }

  addSpan(t: ITimeSpan) {
    try {
      this.collection.insert(t);
      this.repo.saveCollection(this.collection);
      this.next();
    } catch (error) {
      throw new WdError(WdErrorCodes.CANNOT_ADD_TIMESPAN);
    }
  }

  removeSpan(t: ITimeSpan | number) {
    try {
      let item: ITimeSpan;
      if (typeof(t) === 'number') {
        item = this.collection.getAll()[t - 1];
      } else {
        item = t;
      }
      this.collection.remove(item);
      if (this.selectedSubject.value.isSame(item)) {
        this.selectedSubject.next(null);
      }
      this.repo.saveCollection(this.collection);
      this.next();
    } catch (error) {
      throw new WdError(WdErrorCodes.CANNOT_REMOVE_TIMESPAN);
    }
  }

  startPending(time: string) {
    if (!this.pending.pending) {
    !time ? this.pending = {pending: true, start: this.nowString()} as PendingParams
      : this.pending = {pending: true, start: time} as PendingParams;
    } else {
      throw new WdError(WdErrorCodes.ALREADY_PENDING);
    }
    this.pendingSubject.next(this.pending);
  }

  endPending() {
    if (!this.pending.pending) {
      throw new WdError(WdErrorCodes.CANNOT_END_PENDING);
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

  select(idx: number): void {
    const span = this.getByIndex(idx);
    if (!span) {
      throw new WdError(WdErrorCodes.TIMESPAN_NOT_FOUND);
    }
    this.selectedSubject.next(span);
  }

  unselect() {
    this.selectedSubject.next(null);
  }

  merge(start: number, end: number): void {
    //
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

  private getByIndex(idx: number): ITimeSpan {
    return this.collection.getAll()[idx - 1];
  }
}
