import { Pipe, PipeTransform } from '@angular/core';
import { MomentService } from '../app/moment.service';

@Pipe({
  name: 'simpleDate'
})
export class SimpleDatePipe implements PipeTransform {

  moment: any;
  constructor(ms: MomentService) {
    this.moment = ms.get();
  }

  transform(value: Date): string {
    return this.moment(value).format('H.mm');
  }

}
