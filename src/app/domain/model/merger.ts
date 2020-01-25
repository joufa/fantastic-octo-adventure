import { ITimeCollection } from './interface/timespan';
import { MomentTimeSpan } from './moment-timespan';

export class Merger {
  private col: ITimeCollection;

  constructor(col: ITimeCollection) {
    if (!col) {
      throw new Error('Cannot merge null');
    }
    this.col = Object.create(col);
  }

  public merge(): ITimeCollection {
    if (this.col.isEmpty() || this.col.length() === 1) {
      return Object.create(this.col);
    }
    let ready = false;
    let merged = false;
    let arr = this.col.getAll();
    let i = 0;
    let item = arr[i];
    let next = arr[i + 1];

    while (!ready) {
      merged = false;

      if (item.isConnectedTo(next, 'end')) {
        this.col.remove(item);
        this.col.remove(next);
        this.col.insert(new MomentTimeSpan(item.getStart().format('HH:mm'), next.getEnd().format('HH:mm')));

        merged = true;
        arr = this.col.getAll();
        i = 0;
        item = arr[i];
        next = arr[i + 1];
      }

      if (!merged) {
        i++;
        item = arr[i];
        next = arr[i + 1];
      }
      if (!merged && !next) {
        ready = true;
      }
    }
    return Object.create(this.col);
  }
}
