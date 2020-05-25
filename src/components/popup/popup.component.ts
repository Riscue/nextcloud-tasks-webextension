import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {BrowserApi} from '@tsP/browser-api';
import {CalendarItemHelper} from '@ts/helpers/calendar-item.helper';
import {CalendarItem, FilterOption} from '@ts/typings/types';
import template from './popup.component.html'
import style from './popup.component.scss'

@Component({
    template,
    style
})
export default class PopupComponent extends Vue {

    initialized = false;

    get selectedCategories(): string[] {
        return this.filterOptions.filter(option => option.key === 'categories').map(option => option.value);
    }

    set selectedCategories(_value) {
    }

    get showCompleted(): boolean {
        return !this.filterOptions.filter(option => option.key === 'status' && option.value === 'COMPLETED').length;
    }

    set showCompleted(_value) {
        this.removeFilter({key: 'status', value: 'COMPLETED', not: true});
    }

    get calendarItems(): CalendarItem[] {
        this._calendarItems.sort(CalendarItemHelper.sort(this.sortOption));
        return this._calendarItems.filter(CalendarItemHelper.filter(this.filterOptions));
    }

    private _calendarItems: CalendarItem[];
    private sortOption = 'due';
    private filterOptions: FilterOption[] = [
        {key: 'status', value: 'COMPLETED', not: true}
    ];

    mounted() {
        this.initialize();
    }

    clickCategory(category: string) {
        this.removeFilter({key: 'categories', value: category});
    }

    removeFilter(filterOption: FilterOption) {
        const found = this.filterOptions.filter(option => option.key === filterOption.key && option.value === filterOption.value);
        if (found.length) {
            const index = this.filterOptions.indexOf(found[0]);
            this.filterOptions.splice(index, 1);
        } else {
            this.filterOptions.push(filterOption);
        }
    }

    clearFilter() {
        this.filterOptions = [];
    }

    refreshAll() {
        this.initialized = false;
        this._calendarItems = [];
        this.sortOption = 'due';
        this.filterOptions = [
            {key: 'status', value: 'COMPLETED', not: true}
        ];
        this.initialize();
    }

    openSettings() {
        BrowserApi.getBrowserApi().runtime.openOptionsPage();
        window.close();
    }

    private initialize() {
        BrowserApi.getBrowserApi().runtime.sendMessage({type: 'calendaritems.get'}).then((response) => {
            console.log(response);
            this._calendarItems = response.data;
            this.initialized = response.success;

            if (!this.initialized) {
                setTimeout(() => this.initialize(), 1000);
            }
        });
    }
}
