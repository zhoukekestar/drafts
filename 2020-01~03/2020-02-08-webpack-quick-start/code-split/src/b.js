import c from './common.js';
import _ from 'lodash';

console.log('b');
c();
console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
