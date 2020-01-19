import { Injectable } from '@angular/core';

import { CommandExpressions } from './expressions';
import { CommandFactory } from '../core/commands/command.factory';
import { Interpreter } from './interpreter.interface';
import { Types } from '../core/commands';

@Injectable({
  providedIn: 'root',
})
export class TimeInterpreterService extends Interpreter {

  constructor(protected factory: CommandFactory) {
    super(factory);
   }

  handle(text: string): boolean {

    if (this.isCommand(Types.ADD_TIMESPAN, text)) {
      const command = this.factory.create(Types.ADD_TIMESPAN);
      const times = text.split('-');
      command.execute({ start: times[0], end: times[1] });
      return true;
    }

    if (this.isCommand(Types.DELETE_TIMESPAN, text)) {
      const command = this.factory.create(Types.DELETE_TIMESPAN);
      const times = text.substr(2, text.length).split('-');
      command.execute({ start: times[0], end: times[1] });
      return true;
    }

    if (this.isCommand(Types.START_PENDING_FROM_TIME, text)) {
      const command = this.factory.create(Types.START_PENDING_FROM_TIME);
      const time = text.substr(4, text.length);
      command.execute({start: time});
      return true;
    }

    if (this.isCommand(Types.START_PENDING, text)) {
      const command = this.factory.create(Types.START_PENDING);
      command.execute();
      return true;
    }

    if (this.isCommand(Types.END_PENDING, text)) {
      const command = this.factory.create(Types.END_PENDING);
      command.execute();
      return true;
    }
    if (this.isCommand(Types.DELETE_ALL, text)) {
      const command = this.factory.create(Types.DELETE_ALL);
      command.execute();
      return true;
    }

    if (this.isCommand(Types.SELECT_ONE, text)) {
      const command = this.factory.create(Types.SELECT_ONE);
      const idx = +text.substr(2, text.length - 1);
      command.execute({firstIndex: idx});
      return false;
    }
    if (this.isCommand(Types.UNSELECT, text)) {
      const command = this.factory.create(Types.UNSELECT);
      command.execute();
      return true;
    }
    if (this.isCommand(Types.DELETE_ONE, text)) {
      const command = this.factory.create(Types.DELETE_ONE);
      const idx = +text.substr(2, text.length - 4);
      command.execute({firstIndex: +idx});
      return true;
    }
    if (this.isCommand(Types.DELETE_ALL, text)) {
      const command = this.factory.create(Types.DELETE_ALL);
      command.execute();
      return true;
    }
    if (this.isCommand(Types.MERGE_ALL, text)) {
      const command = this.factory.create(Types.MERGE_ALL);
      command.execute();
      return true;
    }
    return false;
  }

  private isCommand = (c: Types, t: string): boolean  => {
    return (CommandExpressions[+c] as RegExp).test(t);
  }
}

