import Vue from 'vue';
import {MdButton} from 'vue-material/dist/components';
import OptionsComponent from '@vue/options/OptionsComponent.vue'

Vue.use(MdButton);

new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(OptionsComponent)
});
