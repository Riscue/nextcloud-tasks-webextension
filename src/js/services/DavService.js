import * as jQuery from "jquery";
import * as parseICS from "ics-parser";
import {ApiService} from "@js/services/ApiService";
import {UserService} from "@js/services/UserService";
import {PayloadService} from "@js/services/PayloadService";
import {SelectorService} from "@js/services/SelectorService";

export const DavService = {
    payloads: PayloadService,
    selectors: SelectorService,

    discover: async function () {
        const httpResponse = await
            ApiService.propfind(
                `/.well-known/caldav`,
                this.payloads.Discover,
                UserService.getCredentials(),
                {headers: {"depth": 0}}
            );
        const response = jQuery(httpResponse.data).find(this.selectors.Discover).text();
        console.log(response);
        return response;
    },

    calendarHomeSet: async function (principal) {
        const httpResponse = await
            ApiService.propfind(
                principal,
                this.payloads.CalendarHomeSet,
                UserService.getCredentials(),
                {headers: {"depth": 0}}
            );

        const response = jQuery(httpResponse.data).find(this.selectors.CalendarHomeSet).text();
        console.log(response);
        return response;
    },

    calendarData: async function (calendarHome) {
        const httpResponse = await
            ApiService.propfind(
                calendarHome,
                this.payloads.CalendarData,
                UserService.getCredentials(),
                {headers: {"depth": 1}}
            );


        const calendarResponse = jQuery(httpResponse.data).find(this.selectors.CalendarData).parents('d\\:response');
        const response = {
            href: calendarResponse.find(this.selectors.CalendarDataHref).text(),
            displayName: calendarResponse.find(this.selectors.CalendarDataDisplayName).text(),
            CTag: calendarResponse.find(this.selectors.CalendarDataGetCtag).text()
        };
        console.log(response);
        return response;
    },

    downloadCalendar: async function (calendar) {
        const httpResponse = await
            ApiService.report(
                calendar,
                this.payloads.DownloadCalendar,
                UserService.getCredentials(),
                {headers: {"depth": 1}}
            );
        const response = jQuery(httpResponse.data).find(this.selectors.DownloadCalendar).map((index, value) => {
            const jq = jQuery(value);
            return {
                raw: jq.find(this.selectors.DownloadCalendarData).text(),
                ETag: jq.find(this.selectors.DownloadCalendarETag).text(),
                ics: parseICS(jq.find(this.selectors.DownloadCalendarData).text())[0]
            };
        }).get();
        console.log(response);
        return response;
    },
};
