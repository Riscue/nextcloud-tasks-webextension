import Vue from 'vue';
import OptionsComponent from '@vue/options/OptionsComponent';

// eslint-disable-next-line
const comp = new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(OptionsComponent)
});
