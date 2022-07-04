import { solution } from '.';

describe('Text Editor', () => {
  it('should swap "Great Britain" and "London" and add an exclamation mark', () => {
    const text = solution([
      'TYPE Great Britain is the capital of London',
      'SELECT 0 12',
      'COPY',
      'SELECT 32 37',
      'COPY',
      'PASTE 2',
      'SELECT 0 12',
      'PASTE',
      'MOVE_CURSOR 32',
      'TYPE !',
    ]);
    expect(text).toBe('London is the capital of Great Britain!');
  });

  it('should swap "Brazil" and "Brasília"', () => {
    const text = solution([
      'TYPE Brazil is the capital of Brasília',
      'SELECT 0 5',
      'COPY',
      'SELECT 25 33',
      'COPY',
      'PASTE 2',
      'SELECT 0 5',
      'PASTE',
    ]);
    expect(text).toBe('Brasília is the capital of Brazil');
  });
});
