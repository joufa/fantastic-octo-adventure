import { Inject } from '@angular/core';

import { TimespanService } from '../domain/service/timespan.service';
import { ITimeApplicationService } from '../../domain/model/interface/time-application.service.interface';
import { ITimeSpan } from '../../domain/model/interface/timespan';
import { MomentTimeSpan } from '../../domain/model/moment-timespan';
import { Params } from './params.interface';


export abstract class Command {

  constructor(@Inject(TimespanService) protected service: ITimeApplicationService<ITimeSpan>) {}

  abstract execute(params?: Params): void;
}

export class AddTimeSpan extends Command {
  execute(params: Params): void {
    this.service.addSpan(new MomentTimeSpan(params.start, params.end));
  }
}

export class DeleteTimeSpan extends Command {
  execute(params: Params): void {
    this.service.removeSpan(new MomentTimeSpan(params.start, params.end));
  }
}

export class StartPendingFromTime extends Command {
  execute(params: Params): void {
    this.service.startPending(params.start);
  }
}

export class StartPending extends Command {
  execute(): void {
    this.service.startPending(null);
  }
}

export class EndPending extends Command {
  execute(): void {
    this.service.endPending();
  }
}

export class DeleteAll extends Command {
  execute(): void {
    this.service.clear();
  }
}

export class DeleteOne extends Command {
  execute(params: Params): void {
    this.service.removeSpan(params.firstIndex);
  }
}

export class Select extends Command {
  execute(params: Params): void {
    this.service.select(params.firstIndex);
  }
}

export class UnSelect extends Command {
  execute(): void {
    this.service.unselect();
  }
}

export class MergeAll extends Command {
  execute(): void {
    this.service.merge();
  }
}
