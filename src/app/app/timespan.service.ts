import { Injectable } from '@angular/core';
import { TimeCollection } from '../core/collections/timespan.collection';
import { TimeSpan, MomentTimeSpan } from './timespan';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRepository } from '../repo/timespan.repo';
import { PendingParams } from './app.model';
import { NotificationService } from '../core/notifications/notification.service';

@Injectable({
  providedIn: 'root',
})
export class TimespanService {

  private collection: TimeCollection<TimeSpan>;

  private pending = {pending: false } as PendingParams;

  private bs = new BehaviorSubject<TimeSpan[]>([]);
  private durationBs = new BehaviorSubject<string>('');
  private dateBs = new BehaviorSubject<Date>(null);
  private collectionBs = new BehaviorSubject<TimeCollection<TimeSpan>>(null);
  private pendingBs = new BehaviorSubject<PendingParams>(this.pending);

  public data$ = this.bs.asObservable();
  public duration$ = this.durationBs.asObservable();
  public date$ = this.dateBs.asObservable();
  public collection$ = this.collectionBs.asObservable();
  public pending$ = this.pendingBs.asObservable();

  constructor(private repo: LocalStorageRepository, private ns: NotificationService) {
    this.init();
  }

  addSpan(t: TimeSpan) {
    try {
      this.collection.insert(t);
      this.repo.save(this.collection);
      this.next();
      this.ns.default('Time added!');
    } catch (error) {
      console.error(error);
      this.ns.default('Error :(');
    }

  }

  removeSpan(t: TimeSpan) {
    try {
      this.collection.remove(t);
      this.repo.save(this.collection);
      this.next();
      this.ns.default('Time removed!');
    } catch (error) {
      console.error(error);
      this.ns.default('Error :(');
    }
  }

  startPending(time: string) {
    if (!this.pending.pending) {
    !time ? this.pending = {pending: true, start: this.nowString()} as PendingParams
      : this.pending = {pending: true, start: time} as PendingParams;
    } else {
      throw new Error('already pending');
    }
    this.pendingBs.next(this.pending);
  }

  endPending() {
    if (!this.pending.pending) {
      throw new Error('Cannot end pending while isn\'t even started');
    }
    const ts = new MomentTimeSpan(this.pending.start, this.nowString());
    this.addSpan(ts);
    this.pending = {pending: false} as PendingParams;
    this.pendingBs.next(this.pending);
  }

  clear() {
    this.collection = new TimeCollection<MomentTimeSpan>(new Date());
    this.next();
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
    this.collectionBs.next(this.collection);
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

