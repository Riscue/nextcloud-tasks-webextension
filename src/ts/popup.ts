import Vue from 'vue';
import PopupComponent from '@components/popup/popup.component';
import './configure.ts'

const popupComponent = new Vue({
    el: '#vue-container',
    render: (renderer) => renderer(PopupComponent)
});
