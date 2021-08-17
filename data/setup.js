import { promises as fs } from 'fs';
import ThingService from '../lib/services/ThingService.js';

export default pool => {
  return fs.readFile('./sql/setup.sql', { encoding: 'utf-8' })
    .then(sql => pool.query(sql))
    .finally(() => ThingService.uploadData())
  ;
};
