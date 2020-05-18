import * as jQuery from "jquery";
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
                this.payloads.discover, UserService.getCredentials(),
                {headers: {"depth": 0}}
            );
        const response = jQuery(httpResponse.data).find(this.selectors.discover).text();
        console.log(response);
        return response;
    },

    calendarHomeSet: async function (principal) {
        const httpResponse = await
            ApiService.propfind(
                principal,
                this.payloads.calendarHomeSet, UserService.getCredentials(),
                {headers: {"depth": 0}}
            );

        const response = jQuery(httpResponse.data).find(this.selectors.calendarHomeSet).text();
        console.log(response);
        return response;
    },

    calendarData: async function (calendarHome) {
        const httpResponse = await
            ApiService.propfind(
                calendarHome,
                this.payloads.calendarData, UserService.getCredentials(),
                {headers: {"depth": 1}}
            );


        const calendarResponse = jQuery(httpResponse.data).find(this.selectors.calendarData).parents('d\\:response');
        const response = {
            href: calendarResponse.find(this.selectors.calendarDataHref).text(),
            displayName: calendarResponse.find(this.selectors.calendarDataDisplayName).text(),
            getCtag: calendarResponse.find(this.selectors.calendarDataGetCtag).text()
        };
        console.log(response);
        return response;
    },

    downloadCalendar: async function (calendar) {
        const httpResponse = await
            ApiService.report(
                calendar,
                this.payloads.downloadCalendar, UserService.getCredentials(),
                {headers: {"depth": 1}}
            );

        const response = jQuery(httpResponse.data).find(this.selectors.downloadCalendar).parent().parent().parent().parent().parent();
        console.log(response);
        return response;
    },
};
