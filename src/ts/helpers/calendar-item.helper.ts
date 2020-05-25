import {CalendarItem, FilterOption} from '@ts/typings/types';

export class CalendarItemHelper {

    static preprocess(items: CalendarItem[]): CalendarItem[] {
        items.forEach(item => {
            Object.keys(item.ics).forEach(key => {
                if (!!item.ics[key].toUnixTime) {
                    item.ics[key] = item.ics[key].toUnixTime();
                }
            });
        });
        return items;
    }

    static filter(filterOptions: FilterOption[]) {
        return (a) => {
            let result = true;
            filterOptions.forEach(filterOption => {
                const b = typeof a.ics[filterOption.key] === 'object' ?
                    a.ics[filterOption.key].includes(filterOption.value) :
                    a.ics[filterOption.key] === filterOption.value;

                if (!filterOption.not) {
                    result = result && (a.ics.hasOwnProperty(filterOption.key) && b);
                } else {
                    result = result && (!a.ics.hasOwnProperty(filterOption.key) || !b);
                }
            });
            return result;
        };
    }

    static sort(field: string) {
        return (a, b) => {
            return (a.ics[field] || Number.MAX_SAFE_INTEGER) - (b.ics[field] || Number.MAX_SAFE_INTEGER);
        };
    }
}
