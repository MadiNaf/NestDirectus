import { BoardModel } from './board.model';

describe('Board', () => {
  it('should be defined', () => {
    expect(new BoardModel()).toBeDefined();
  });
});
