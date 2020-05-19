import Vue from 'vue';
import OptionsComponent from '@vue/options/OptionsComponent';
import {MdButton} from 'vue-material/dist/components';

Vue.use(MdButton);

// eslint-disable-next-line
const comp = new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(OptionsComponent)
});
