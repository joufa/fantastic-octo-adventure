import { Merger } from './merger';
import { MomentTimeSpan } from './moment-timespan';
import { TimeCollection } from './time.collection';

describe('Merge algorithm', () => {
  it('should merge', () => {
    const col = new TimeCollection<MomentTimeSpan>(new Date());
    const span1 = new MomentTimeSpan('07.30', '08.00');
    const span2 = new MomentTimeSpan('08.00', '11.00');
    const span3 = new MomentTimeSpan('11.15', '12.00');
    const span4 = new MomentTimeSpan('12.00', '12.30');
    const span5 = new MomentTimeSpan('12.30', '12.45');
    const span6 = new MomentTimeSpan('12.46', '13.00');

    const spans = [span1, span2, span3, span4, span5, span6];
    spans.forEach(x => col.insert(x));

    const sut = new Merger(col);
    const expectedCollection = sut.merge();

    expect(expectedCollection.length()).toBe(3);
  });
});
