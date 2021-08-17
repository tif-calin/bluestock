import pool from './lib/utils/pool.js';
import setup from './data/setup.js';
import ThingService from './lib/services/ThingService.js';

setup(pool);
ThingService.uploadData();
