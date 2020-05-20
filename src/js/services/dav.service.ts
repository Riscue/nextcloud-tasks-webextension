import * as jQuery from 'jquery';
import {ICALHelper} from '@js/helpers/ICAL.helper';
import {ApiService} from '@js/services/api.service';
import {UserService} from '@js/services/user.service';
import * as Payloads from '@resources/payloads.json';
import * as Selectors from '@resources/selectors.json';
import {Service} from '@js/services/service';

export class DavService extends Service {

    constructor(private apiService: ApiService,
                private userService: UserService) {
        super(DavService);
    }

    async discover() {
        const httpResponse = await this.apiService.propfind(
            '/.well-known/caldav',
            Payloads.Discover.join(''),
            this.userService.getCredentials(),
            {headers: {depth: 0}}
        );
        return jQuery(httpResponse.data).find(Selectors.Discover).text();
    }

    async calendarHomeSet(principal) {
        const httpResponse = await this.apiService.propfind(
            principal,
            Payloads.CalendarHomeSet.join(''),
            this.userService.getCredentials(),
            {headers: {depth: 0}}
        );

        return jQuery(httpResponse.data).find(Selectors.CalendarHomeSet).text();
    }

    async calendarData(calendarHome) {
        const httpResponse = await this.apiService.propfind(
            calendarHome,
            Payloads.CalendarData.join(''),
            this.userService.getCredentials(),
            {headers: {depth: 1}}
        );

        const calendarResponse = jQuery(httpResponse.data).find(Selectors.CalendarData).parents('d\\:response');
        return {
            href: calendarResponse.find(Selectors.CalendarDataHref).text(),
            displayName: calendarResponse.find(Selectors.CalendarDataDisplayName).text(),
            CTag: calendarResponse.find(Selectors.CalendarDataGetCtag).text()
        };
    }

    async downloadCalendar(calendar) {
        const httpResponse = await this.apiService.report(
            calendar,
            Payloads.DownloadCalendar.join(''),
            this.userService.getCredentials(),
            {headers: {depth: 1}}
        );
        return jQuery(httpResponse.data).find(Selectors.DownloadCalendar).map((index, value) => {
            const jq = jQuery(value);
            return {
                raw: jq.find(Selectors.DownloadCalendarData).text(),
                ETag: jq.find(Selectors.DownloadCalendarETag).text(),
                ics: ICALHelper.parse(jq.find(Selectors.DownloadCalendarData).text())
            };
        }).get();
    }
}
