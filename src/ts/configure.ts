import Vue from 'vue';
import VueMaterial from 'vue-material';
import {ContextHelper} from '@ts/helpers/context.helper';

import '@scss/theme.scss';
import '@scss/main.scss';

Vue.use(VueMaterial);

ContextHelper.buildContext();
