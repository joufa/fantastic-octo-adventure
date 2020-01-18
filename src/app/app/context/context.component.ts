import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ITimeCollection } from 'src/app/core/domain/model/interfaces/timespan';
import { MomentTimeSpan } from 'src/app/core/domain/model/moment-timespan';
import { PendingParams } from 'src/app/core/domain/service/pending.params';
import { TimespanService } from '../../core/domain/service/timespan.service';

@Component({
  selector: 'app-context',
  template: `
    <mat-chip-list>
      <mat-chip>{{percentage}} %</mat-chip>
      <mat-chip>{{breaks | timeSpan}} {{'wd.context.breaks' | translate}}</mat-chip>
      <mat-chip *ngIf="(isPending$ | async).pending" color="accent">
        <mat-spinner [diameter]="20" style="margin-right: 5px"></mat-spinner>{{(isPending$ | async).start}} -
      </mat-chip>
    </mat-chip-list>
  `,
  styles: ['']
})
export class ContextComponent implements OnInit, OnDestroy {

  collection: ITimeCollection;
  // TODO: Modifyable
  expectedDuration = 27000;
  currentDuration: number;

  isPending$: Observable<PendingParams>;
  collectionSub$: Subscription;

  constructor(private ts: TimespanService) {
    this.isPending$ = this.ts.pending$;
  }

  ngOnInit() {
    this.collectionSub$ = this.ts.collection$.subscribe(collection => this.runChanges(collection));
  }

  ngOnDestroy(): void {
    this.collectionSub$.unsubscribe();
  }

  runChanges(collection: ITimeCollection) {
    this.collection = collection;
    this.breakDuration();
    this.timePercentage();
  }

  get breaks() {
    return this.breakDuration() !== 'P0D' ? this.breakDuration() : 'No';
  }

  get percentage() {
    return this.timePercentage();
  }


  private breakDuration(): string {
    if (!this.collection.isEmpty()) {
      const start: string = this.collection.getFirst().getStart().format('HH.mm');
      const end: string = this.collection.getLast().getEnd().format('HH.mm');
      const ts = new MomentTimeSpan(start, end);
      const breaks = ts.duration().subtract(this.collection.getDuration());
      return breaks.toJSON();
    }
    return 'P0D';
  }

  private timePercentage(): string {
    const collectionDuration: number = this.collection.getDuration().asSeconds();
    const percentage = (collectionDuration * 100) / this.expectedDuration;
    return Math.floor(percentage) as unknown as string;
  }
}

