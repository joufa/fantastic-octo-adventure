import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-context',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-chip-list>
      <mat-chip *ngIf="decimals">{{decimalDuration}}</mat-chip>
      <mat-chip>{{percentage}} %</mat-chip>
      <mat-chip *ngIf="isBreaks" selected color="accent">{{breaks | timeSpan}}</mat-chip>
      <mat-chip *ngIf="isEtd">ETD {{etd | etdTime}}</mat-chip>
      <mat-chip *ngIf="pending" selected color="primary">
        <mat-spinner [diameter]="20" style="margin-right: 5px" color="accent"></mat-spinner>{{pendingText}} -
      </mat-chip>
    </mat-chip-list>
  `,
  styles: ['']
})
export class ContextComponent {

  @Input()
  percentage: number;
  @Input()
  breaks: string;
  @Input()
  pending: boolean;
  @Input()
  pendingText: string;
  @Input()
  etd: Date;
  @Input()
  decimalDuration: string;

  get isBreaks(): boolean {
    return this.breaks !== 'P0D';
  }

  get decimals(): boolean {
    return this.decimalDuration && this.decimalDuration !== '0';
  }

  get isEtd(): boolean {
   if (this.etd) {
     return true;
   }
   return false;
  }
}

