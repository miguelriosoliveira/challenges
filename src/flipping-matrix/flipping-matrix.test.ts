import { flippingMatrix } from './flipping-matrix';

describe('flippingMatrix', () => {
  it('should return the max value of the first quadrant', () => {
    const matrix = [
      [112, 42, 83, 119],
      [56, 125, 56, 49],
      [15, 78, 101, 43],
      [62, 98, 114, 108],
    ];
    expect(flippingMatrix(matrix)).toBe(414);
  });
});
