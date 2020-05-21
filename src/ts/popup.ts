import Vue from 'vue';
import PopupComponent from '@vue/popup/PopupComponent.vue';
import './configure.ts'

const popupComponent = new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(PopupComponent)
});
