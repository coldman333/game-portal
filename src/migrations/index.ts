import * as migration_20251204_105156 from './20251204_105156';
import * as migration_20251209_092931 from './20251209_092931';
import * as migration_20251209_102041 from './20251209_102041';

export const migrations = [
  {
    up: migration_20251204_105156.up,
    down: migration_20251204_105156.down,
    name: '20251204_105156',
  },
  {
    up: migration_20251209_092931.up,
    down: migration_20251209_092931.down,
    name: '20251209_092931',
  },
  {
    up: migration_20251209_102041.up,
    down: migration_20251209_102041.down,
    name: '20251209_102041'
  },
];
