import { DateFormatPipe } from "./date-format.pipe";

describe('DateFormatPipe', () => {

  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it(`should return date in dd MM yyyy`, async () => {
    const pipe = new DateFormatPipe();
    const date = '2024-12-05';
    const transformedDate = await pipe.transform(date);
    expect(transformedDate).toBe('05 Dec 2024');
  });
});
