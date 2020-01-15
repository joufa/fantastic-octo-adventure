import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeCollection } from 'src/app/core/collections/timespan.collection';
import { TimeSpan, MomentTimeSpan } from '../timespan';
import { MomentService } from '../moment.service';
import { TimespanService } from '../timespan.service';
import { Subscription, Observable } from 'rxjs';
import { PendingParams } from '../app.model';

@Component({
  selector: 'app-context',
  template: `
    <mat-chip-list>
      <mat-chip>{{percentage}} %</mat-chip>
      <mat-chip>{{breaks | timeSpan}} breaks</mat-chip>
      <mat-chip *ngIf="(isPending | async).pending" color="accent">
        <mat-spinner [diameter]="20" style="margin-right: 5px"></mat-spinner>{{(isPending | async).start}} -
      </mat-chip>
    </mat-chip-list>
  `,
  styles: ['']
})
export class ContextComponent implements OnInit, OnDestroy {

  collection: TimeCollection<TimeSpan>;
  // TODO: Modifyable
  expectedDuration = 27000;
  currentDuration: number;
  isPending: Observable<PendingParams>;
  breakDuration: number;

  collectionSub$: Subscription;

  constructor(private ms: MomentService, private ts: TimespanService) {
    this.isPending = this.ts.pending$;
  }

  ngOnInit() {
    this.collectionSub$ = this.ts.collection$.subscribe(collection => this.runChanges(collection));
  }
  ngOnDestroy(): void {
    this.collectionSub$.unsubscribe();
  }

  runChanges(collection: any) {
    this.collection = collection;
    this.breaksDuration();
    this.timePercentage();
  }

  get breaks() {
    return this.breaksDuration() !== 'P0D' ? this.breaksDuration() : 'No';
  }

  get percentage() {
    return this.timePercentage();
  }


  breaksDuration(): string {
    if (!this.collection.isEmpty()) {
      const start: any = this.collection.getFirst().getStart();
      const first: string = this.ms.moment(start).format('HH.mm');
      const last: string = this.ms.moment(this.collection.getLast().getEnd()).format('HH.mm');
      const ts = new MomentTimeSpan(first, last);
      const duration = this.ms.moment.duration(ts.duration());
      const breaks = duration.subtract(this.collection.getDuration());
      return breaks.toJSON();
    }

    return 'P0D';
  }

  timePercentage(): string {
    const collectionDuration: number = this.collection.getDuration();
    const durationAsSeconds = this.ms.moment.duration(collectionDuration).asSeconds();
    const x = (durationAsSeconds * 100)  / this.expectedDuration;
    return Math.floor(x) as unknown as string;
  }
}
