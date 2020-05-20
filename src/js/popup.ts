import Vue from 'vue';
import PopupComponent from '../vue/popup/PopupComponent.vue';

new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(PopupComponent)
});
