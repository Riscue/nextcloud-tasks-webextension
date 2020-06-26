import {CalendarItem, FilterOption} from '@ts/typings/types';

export class CalendarItemHelper {

    static preProcess(items: CalendarItem[]): CalendarItem[] {
        items.forEach(item => {
            Object.keys(item.ics).forEach(key => {
                if (!!item.ics[key].toJSDate) {
                    item.ics[key].unixTime = item.ics[key].toJSDate().getTime();
                }
                if (!!item.ics[key].toJSON) {
                    item.ics[key].toJSON = this.toJSONFactory(item.ics[key]);
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
            const A = a.ics.hasOwnProperty(field) ? a.ics[field].unixTime : Number.MAX_SAFE_INTEGER;
            const B = b.ics.hasOwnProperty(field) ? b.ics[field].unixTime : Number.MAX_SAFE_INTEGER;
            return A - B;
        };
    }

    static toJSONFactory(that) {
        return () => {
            const copy = [
                'year',
                'month',
                'day',
                'hour',
                'minute',
                'second',
                'isDate',
                'unixTime'
            ];

            const result = Object.create(null);

            let i = 0;
            const len = copy.length;
            let prop;

            for (; i < len; i++) {
                prop = copy[i];
                result[prop] = that[prop];
            }

            if (that.zone) {
                result.timezone = that.zone.tzid;
            }

            return result;
        };
    }
}
