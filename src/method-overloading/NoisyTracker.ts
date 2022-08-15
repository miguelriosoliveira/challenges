import { Tracker } from './Tracker';

export class NoisyTracker extends Tracker {
  allocate(hostType: string): string {
    return super.allocate(hostType);
  }

  deallocate(hostName: string): string {
    return super.deallocate(hostName);
  }
}
