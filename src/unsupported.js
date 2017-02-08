import {documentWrite} from './modules/common';
import copy from './copy';
import './styles/main.scss';

documentWrite(`<h1>${copy.unsupported}</h1>`);
