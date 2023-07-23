export function flippingMatrix(matrix: number[][]): number {
  let sum = 0;

  const midPos = matrix.length / 2;
  const lastPos = matrix.length - 1;
  for (let i = 0; i < midPos; i++) {
    for (let j = 0; j < midPos; j++) {
      const m1 = Math.max(matrix[i][j], matrix[lastPos - i][j]);
      const m2 = Math.max(matrix[i][lastPos - j], matrix[lastPos - i][lastPos - j]);
      sum += Math.max(m1, m2);
    }
  }

  return sum;
}
