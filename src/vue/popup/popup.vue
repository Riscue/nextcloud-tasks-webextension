<style src="./popup.scss"></style>
<script src="./popup.js"></script>

<template>
    <div id="popup">
        <button id="openSetting" type="button" @click="openSettings()">{{ openSettingsWindowButton }}</button>
        <div v-if="!renderLoginForm">
            <label>Username: {{ username }}</label>
            <br>
            <label>Calendar Name: {{ calendarData.displayName }}</label>
            <ul id="example-1">
                <li v-for="calendarItem in calendarItems" :key="calendarItem.ics.uuid">
                    {{ calendarItem.ics.summary }}
                </li>
            </ul>
        </div>
    </div>
</template>
