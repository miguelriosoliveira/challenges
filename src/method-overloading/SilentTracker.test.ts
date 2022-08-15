import { SilentTracker } from './SilentTracker';

describe('SilentTracker', () => {
  let tracker: SilentTracker;

  beforeEach(() => {
    tracker = new SilentTracker();
  });

  it('should allocate some hosts assigning sequential numbers', () => {
    expect(tracker.allocate('web')).toBe('web1');
    expect(tracker.allocate('web')).toBe('web2');
    expect(tracker.allocate('web')).toBe('web3');
  });

  it('should deallocate a host', () => {
    expect(tracker.allocate('web')).toBe('web1');
    expect(tracker.deallocate('web1')).toBe('');
    expect(tracker.allocate('web')).toBe('web1');
  });

  it('should not throw errors when asked to deallocate invalid host name', () => {
    tracker.allocate('web');
    expect(() => tracker.deallocate('invalid')).not.toThrow();
    expect(tracker.deallocate('invalid')).toBe('');
  });

  it('should deallocate a host in the middle and then allocate to the free spot', () => {
    expect(tracker.allocate('web')).toBe('web1');
    expect(tracker.allocate('web')).toBe('web2');
    expect(tracker.allocate('web')).toBe('web3');
    expect(tracker.allocate('web')).toBe('web4');
    expect(tracker.deallocate('web3')).toBe('');
    expect(tracker.allocate('web')).toBe('web3');
  });
});
