import Vue from 'vue';
import OptionsComponent from '@components/options/options.component';
import './configure.ts'

const optionsComponent = new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(OptionsComponent)
});
