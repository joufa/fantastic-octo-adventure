import { TimeCollection } from '../app/timespan.collection';
import { MomentTimeSpan } from '../app/timespan';
import { TimeDtoSerializer } from './time-dto.serializer';

const now = new Date();

describe('Serializer', () => {
  it('should convert Collection to DTO and back', () => {
    const collection = new TimeCollection<MomentTimeSpan>(now);
    const ser = new TimeDtoSerializer();
    const first = new MomentTimeSpan('8.30', '9.00');
    const second = new MomentTimeSpan('11.00', '12.00');
    collection.insert(second);
    collection.insert(first);

    const dto = ser.toDto(collection);

    expect(dto.spans.length).toBe(2);

    const col = ser.toCollection(dto);

    expect(col.length()).toBe(2);
  });
});
