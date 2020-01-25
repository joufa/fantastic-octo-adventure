import { TimeSpanDto, TimeCollectionDto } from './repo.model';
import { Mapper } from '../../domain/base/mapper';
import { ITimeCollection, ITimeSpan } from '../../domain/model/interface/timespan';
import { MomentTimeSpan } from '../../domain/model/moment-timespan';
import { TimeCollection } from '../../domain/model/time.collection';

export class DtoMapper implements Mapper<ITimeCollection, TimeCollectionDto> {

  mapFrom(item: ITimeCollection): TimeCollectionDto {
    const date = item.day();

    const rows: TimeSpanDto[] = item.getAll()
      .map((span: ITimeSpan) => {
        const s: Date = span.getStart().toDate();
        const e: Date = span.getEnd().toDate();
        return {start: s.toString(), end: e.toString()} as TimeSpanDto;
      });

    return {day: date, spans: rows} as TimeCollectionDto;
  }

  mapTo(item: TimeCollectionDto): ITimeCollection {
    const date: Date = item.day;
    const col = new TimeCollection<ITimeSpan>(date);
    item.spans.forEach(span => col.insert(new MomentTimeSpan(this.dateToString(span.start), this.dateToString(span.end))));
    return col;
  }

  private dateToString(date: string) {
    const d: Date = new Date(Date.parse(date));
    return `${d.getHours()}.${d.getMinutes()}`;
  }
}
