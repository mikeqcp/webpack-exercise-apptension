import {documentWrite} from './modules/common';
import copy from './copy';
import {log} from './modules/log';
import {clamp} from './modules/math';
import config from 'config';
import './styles/main.scss';

documentWrite(`<h1>${copy.main} [${config.name}]</h1><p>It works!</p>`);

log('Clamped value: ' + clamp(Math.random(), .25, .75));
