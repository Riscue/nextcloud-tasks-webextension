import Vue from 'vue';
import PopupComponent from '@vue/popup/PopupComponent';

// eslint-disable-next-line
const comp = new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(PopupComponent)
});
