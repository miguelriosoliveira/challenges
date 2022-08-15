interface HostData {
  type: string;
  number: number;
}

interface HostMap {
  [key: string]: {
    [key: number]: string;
  };
}

export class Tracker {
  hosts: HostMap;

  constructor() {
    this.hosts = new Proxy<HostMap>(
      {},
      {
        get: (target, key: string) => target[key] || {},
      },
    );
  }

  private getFirstFreePosition(hostType: string): number {
    const hostsMap = this.hosts[hostType];
    let i = 1;
    while (hostsMap[i]) {
      i++;
    }
    return i;
  }

  private parseHostName(hostName: string): HostData {
    const [type, hostNumber] = hostName.split(/(\d+)/);
    return { type, number: Number(hostNumber) };
  }

  allocate(hostType: string): string {
    const positionToInsert = this.getFirstFreePosition(hostType);
    const hostName = `${hostType}${positionToInsert}`;
    this.hosts[hostType] = { ...this.hosts[hostType], [positionToInsert]: hostName };
    return hostName;
  }

  deallocate(hostName: string): string {
    const { type, number } = this.parseHostName(hostName);
    const hostNameToDelete = this.hosts[type][number];
    if (!hostNameToDelete) {
      throw new Error('Invalid host name');
    }
    delete this.hosts[type][number];
    return '';
  }
}
