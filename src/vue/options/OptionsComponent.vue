<template src="./OptionsComponent.html"/>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import './OptionsComponent.scss'

    @Component({
        // template: require('./OptionsComponent.html'),
        // style: require('./OptionsComponent.scss')
    })
    export default class OptionsComponent extends Vue {

        // render(createElement) {
        //     return require('./PopupComponent.html');
        // },
        saveSettings() {
            console.log('test');
        }
    }
</script>
