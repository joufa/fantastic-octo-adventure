import { SimpleDatePipe } from './simple-date.pipe';
import { MomentService } from '../app/moment.service';

describe('SimpleDatePipe', () => {
  it('should transform moment object to string', () => {
    const ms = new MomentService();
    const m = ms.get();
    const pipe = new SimpleDatePipe(ms);
    const date = m('2013-02-08 09:30');
    const date2 = m('2013-02-08 23:30');
    const expected = '9.30';
    const expected2 = '23.30';

    expect(pipe).toBeTruthy();
    expect(pipe.transform(date)).toBe(expected);
    expect(pipe.transform(date2)).toBe(expected2);
  });
});
