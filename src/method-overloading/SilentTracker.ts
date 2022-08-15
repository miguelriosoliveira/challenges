import { Tracker } from './Tracker';

export class SilentTracker extends Tracker {
  allocate(hostType: string): string {
    return super.allocate(hostType);
  }

  deallocate(hostName: string): string {
    try {
      super.deallocate(hostName);
    } catch {}
    return '';
  }
}
