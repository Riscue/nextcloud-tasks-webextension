import Vue from 'vue';
import {MdButton} from 'vue-material/dist/components';
import OptionsComponent from '@vue/options/OptionsComponent.vue'
import {ContextHelper} from '@ts/helpers/context.helper';
import '@scss/main.scss';

Vue.use(MdButton);
ContextHelper.buildContext();

new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(OptionsComponent)
});
