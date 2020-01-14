import { MomentService } from '../app/moment.service';
import { SerializableTimeCollection, TimeSpanDto, TimeCollectionDto } from './repo.model';
import { TimeSpan, MomentTimeSpan } from '../app/timespan';
import { TimeCollection } from '../app/timespan.collection';

export class TimeDtoSerializer {

  // TODO
  ms = new MomentService();

  toDto(item: SerializableTimeCollection): TimeCollectionDto {
    const date = item.day();

    const rows: TimeSpanDto[] = item.getAll()
      .map((x: TimeSpan) => {
        return {start: x.getStart().toDate(), end: x.getEnd().toDate()} as TimeSpanDto;
      });

    return {day: date, spans: rows} as TimeCollectionDto;
  }

  toCollection(item: TimeCollectionDto): TimeCollection<TimeSpan> {
    const date: Date = item.day;
    const col = new TimeCollection<TimeSpan>(date);
    item.spans.forEach(span => col.insert(new MomentTimeSpan(this.dateToString(span.start), this.dateToString(span.end))));
    return col;
  }

  private dateToString(date: string) {
    const d: Date = new Date(Date.parse(date));
    return `${d.getHours()}.${d.getMinutes()}`;
  }
}
