export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
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
