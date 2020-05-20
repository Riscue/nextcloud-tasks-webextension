import Vue from 'vue';
import OptionsComponent from '../vue/options/OptionsComponent.vue'

new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(OptionsComponent)
});
