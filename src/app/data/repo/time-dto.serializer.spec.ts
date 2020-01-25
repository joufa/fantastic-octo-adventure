
import { DtoMapper } from './time-dto.serializer';
import { TimeCollection } from '../../domain/model/time.collection';
import { MomentTimeSpan } from '../../domain/model/moment-timespan';

const now = new Date();

describe('Serializer', () => {
  it('should convert Collection to DTO and back', () => {
    const collection = new TimeCollection<MomentTimeSpan>(now);
    const ser = new DtoMapper();
    const first = new MomentTimeSpan('8.30', '9.00');
    const second = new MomentTimeSpan('11.00', '12.00');
    collection.insert(second);
    collection.insert(first);

    const dto = ser.mapFrom(collection);

    expect(dto.spans.length).toBe(2);

    const col = ser.mapTo(dto);

    expect(col.length()).toBe(2);
  });
});
