import { CommandFactory } from '../core/commands';

export abstract class Interpreter {
  constructor(protected factory: CommandFactory) {
   }
  abstract handle(text: string): boolean;
}
