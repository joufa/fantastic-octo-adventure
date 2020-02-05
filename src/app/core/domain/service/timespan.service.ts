import { Injectable } from '@angular/core';
import { TimeCollection } from '../model/time.collection';
import { BehaviorSubject } from 'rxjs';
import { ITimeSpan, ITimeCollection } from '../model/interfaces/timespan';
import { TimeCollectionRepository } from '../repo/timecollection.repo';
import { MomentTimeSpan } from '../model/moment-timespan';
import { WdError } from '../base/wd-error';
import { ITimeApplicationService } from '../model/interfaces/time.application.service';
import { WdErrorCodes } from '../model/error.codes';
import { TimeData } from './time-data';
import { Merger } from '../model/merger';
import { TimeUtils } from './time.utils';
import * as m from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimespanService implements ITimeApplicationService<ITimeSpan> {

  private collection: ITimeCollection;
  private expectedDuration = 27000;
  private data: TimeData;

  private dataSubject = new BehaviorSubject<TimeData>(null);
  public data$ = this.dataSubject.asObservable();


  constructor(private repo: TimeCollectionRepository<ITimeCollection>) {
    this.data = new TimeData();
    this.init();
  }

  addSpan(t: ITimeSpan) {
    try {
      this.collection.insert(t);
      this.save();
      this.flushCollection();
      this.emit();
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
      if (this.data.selected.isSame(item)) {
        this.data.selected = null;
      }
      this.save();
      this.flushCollection();
      this.emit();
    } catch (error) {
      throw new WdError(WdErrorCodes.CANNOT_REMOVE_TIMESPAN);
    }
  }

  startPending(time: string) {
    if (!this.data.pending) {
      if (!time) {
        this.data.pending = true;
        this.data.pendingTime = TimeUtils.nowString();
      } else {
        this.data.pending = true;
        this.data.pendingTime = time;
      }
      this.emit();
    } else {
      throw new WdError(WdErrorCodes.ALREADY_PENDING);
    }
  }

  endPending() {
    if (!this.data.pending) {
      throw new WdError(WdErrorCodes.CANNOT_END_PENDING);
    }
    const ts = new MomentTimeSpan(this.data.pendingTime, TimeUtils.nowString());
    this.addSpan(ts);
    this.data.pending = false;
    this.data.pendingTime = null;
    this.flushCollection();
    this.emit();
  }

  interval() {
    if (this.data.pending) {
      this.endPending();
      this.startPending(null);
      this.merge();
      return;
    }
    throw new Error();
  }

  clear() {
    this.collection = new TimeCollection<MomentTimeSpan>(new Date());
    this.repo.clear();
    this.flushCollection();
    this.emit();
  }

  select(idx: number): void {
    const span = this.getByIndex(idx);
    if (!span) {
      throw new WdError(WdErrorCodes.TIMESPAN_NOT_FOUND);
    }
    this.data.selected = span;
    this.emit();
  }

  unselect() {
    this.data.selected = null;
    this.emit();
  }

  merge(): void {
    const merger = new Merger(this.collection);
    this.collection = merger.merge();
    this.save();
    this.flushCollection();
    this.emit();
  }

  private percentage(): string {
    const collectionDuration: number = this.collection.getDuration().asSeconds();
    const percentage = (collectionDuration * 100) / this.expectedDuration;
    return Math.floor(percentage) as unknown as string;
  }

  private flushCollection() {
    this.data.data = this.collection.getAll();
    this.data.breakDuration = this.breakDuration();
    this.data.percentage = this.percentage();
    this.data.duration = this.collection.getDurationAsString();
    this.data.decimalDuration = TimeUtils.durationToDecimal(this.collection.getDuration());
    this.flushEtd();
  }

  flushEtd() {
    if (this.collection.isEmpty()) {
      this.data.etd = null;
    } else {
      this.data.etd = TimeUtils.getETD(
        this.expectedDuration,
        m(this.collection.getLast().getEnd()).toDate(),
        this.collection.getDuration().asSeconds()
        );
    }
  }

  private init() {
    const data: ITimeCollection = this.repo.getCollection();

    if (!data || !TimeUtils.isSameDay(data.day(), new Date())) {
      // new instance
      this.collection = new TimeCollection<MomentTimeSpan>(new Date());
      this.repo.saveCollection(this.collection);
    } else {
      this.collection = data;
    }
    this.data.date = this.collection.day();
    this.flushCollection();
    this.emit();
  }

  private emit(): void {
    this.data = Object.create(this.data.flush());
    this.dataSubject.next(this.data.flush());
  }

  private breakDuration(): string {
    if (this.collection.isEmpty()) {
      return 'P0D';
    }
    const start: string = this.collection.getFirst().getStart().format('HH.mm');
    const end: string = this.collection.getLast().getEnd().format('HH.mm');
    const ts = new MomentTimeSpan(start, end);
    const breaks = ts.duration().subtract(this.collection.getDuration());
    return breaks.toJSON();
  }

  private getByIndex(idx: number): ITimeSpan {
    return this.collection.getAll()[idx - 1];
  }

  private save() {
    this.repo.saveCollection(this.collection);
  }

}
