class OperationsMapper {
  text = '';
  cursor = 0;
  selected = '';
  clipboard: string[] = [];

  TYPE(text: string) {
    const newCursor = this.cursor + text.length;
    if (this.selected) {
      this.text = this.text.replace(this.selected, text);
      this.selected = '';
    } else {
      this.text = this.text.slice(0, this.cursor) + text + this.text.slice(newCursor);
    }
    this.cursor = newCursor;
  }

  SELECT(start: number, end: number) {
    const newCursor = end + 1;
    this.selected = this.text.slice(start, newCursor);
    this.cursor = newCursor;
  }

  MOVE_CURSOR(offset: number) {
    const distanceFromEnd = this.text.length - this.cursor;
    offset = offset > distanceFromEnd ? distanceFromEnd : offset;
    this.cursor += offset;
    this.selected = '';
  }

  COPY() {
    if (!this.selected) {
      return;
    }
    this.clipboard.push(this.selected);
  }

  PASTE(stepsBack = 1) {
    if (stepsBack > this.clipboard.length) {
      return;
    }
    const pasteText = this.clipboard[this.clipboard.length - stepsBack];
    this.TYPE(pasteText);
  }
}

export function solution(operations: string[]) {
  const operationsMap = new OperationsMapper();

  operations.forEach(operation => {
    let [command, ...args] = operation.split(' ');
    switch (command) {
      case 'TYPE':
        operationsMap.TYPE(args.join(' '));
        break;
      case 'SELECT':
        operationsMap.SELECT(Number(args[0]), Number(args[1]));
        break;
      case 'MOVE_CURSOR':
        operationsMap.MOVE_CURSOR(Number(args[0]));
        break;
      case 'COPY':
        operationsMap.COPY();
        break;
      case 'PASTE':
        operationsMap.PASTE(Number(args[0]) || 1);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  });

  return operationsMap.text;
}
