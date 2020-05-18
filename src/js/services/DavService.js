import * as jQuery from "jquery";
import {ApiService} from "@js/services/ApiService";
import {UserService} from "@js/services/UserService";
import {PayloadService} from "@js/services/PayloadService";
import {SelectorService} from "@js/services/SelectorService";

export const DavService = {
    payloads: PayloadService,
    selectors: SelectorService,

    discover: async function () {
        const response = await
            ApiService.propfind(
                `/.well-known/caldav`,
                this.payloads.discover, UserService.getCredentials(),
                {headers: {"depth": 0}}
            );
        return jQuery(response.data).find(this.selectors.discover).text().trim();
    },

    calendarHomeSet: async function (principal) {
        const response = await
            ApiService.propfind(
                principal,
                this.payloads.calendarHomeSet, UserService.getCredentials(),
                {headers: {"depth": 0}}
            );

        return jQuery(response.data).find(this.selectors.calendarHomeSet).text().trim();
    },

    calendarData: async function (calendarHome) {
        const response = await
            ApiService.propfind(
                calendarHome,
                this.payloads.calendarData, UserService.getCredentials(),
                {headers: {"depth": 1}}
            );

        const calendarResponse = jQuery(response.data).find(this.selectors.calendarData).parent().parent().parent().parent().parent();
        return {
            href: decodeURIComponent(calendarResponse.find(this.selectors.calendarDataHref).text()),
            displayName: calendarResponse.find(this.selectors.calendarDataDisplayName).text(),
            getCtag: calendarResponse.find(this.selectors.calendarDataGetCtag).text()
        };
    },
};
