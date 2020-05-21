import Vue from 'vue';
import OptionsComponent from '@vue/options/OptionsComponent.vue';
import './configure.ts'

const optionsComponent = new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(OptionsComponent)
});
