export interface Rack {
  id?: string;
  title?: string;
  priority?: number;
  pumps?: Pump[];
}

export interface Pump {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  isRunning?: boolean;
  bolusComplete?: number;
  bolusTime?:number;
  bolusVolume?: number;
  bolusLockoutTime?:number;
  isBolusLockout?: boolean;
  bolusInProgress?: boolean;
}
