import Vue from 'vue';
import {MdButton} from 'vue-material/dist/components';
import PopupComponent from '@vue/popup/PopupComponent.vue';

Vue.use(MdButton);

new Vue({
    el: '#vue-container',
    render: (rendered) => rendered(PopupComponent)
});
