'use strict';

import {RRule} from "rrule";

function generateDateFunction(name) {
    return function (value, params, events, lastEvent) {
        const matches = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
        if (matches !== null) {
            lastEvent[name] = new Date(parseInt(matches[1], 10), parseInt(matches[2], 10) - 1, parseInt(matches[3], 10));
            return lastEvent;
        }

        if (/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/.test(value)) {
            lastEvent[name] = new Date(value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 11) + ':' + value.substring(11, 13) + ':' + value.substring(13));
        }
        return lastEvent;
    };
}

function generateSimpleParamFunction(name) {
    return function (value, params, events, lastEvent) {
        lastEvent[name] = value.replace(/\\n/g, "\n");
        return lastEvent;
    };
}

const objects = {
    'BEGIN': function objectBegin(value, params, events, lastEvent) {
        if (value === "VCALENDAR") {
            return {};
        }

        lastEvent = {
            type: value
        };
        events.push(lastEvent);

        return lastEvent;
    },

    'END': function objectEnd(value, params, events, lastEvent, data) {
        if (value === "VCALENDAR") {
            return lastEvent;
        }

        data.push(lastEvent);

        const index = events.indexOf(lastEvent);
        if (index !== -1) {
            events.splice(events.indexOf(lastEvent), 1);
        }

        if (events.length === 0) {
            lastEvent = {};
        }
        else {
            lastEvent = events[events.length - 1];
        }

        return lastEvent;
    },

    'DTSTART': generateDateFunction('startDate'),
    'DTEND': generateDateFunction('endDate'),
    'DTSTAMP': generateDateFunction('end'),
    'COMPLETED': generateDateFunction('completed'),
    'DUE': generateDateFunction('due'),
    'CREATED': generateDateFunction('created'),
    'LAST-MODIFIED': generateDateFunction('lastModification'),

    'UID': generateSimpleParamFunction('uid'),
    'SUMMARY': generateSimpleParamFunction('name'),
    'DESCRIPTION': generateSimpleParamFunction('description'),
    'LOCATION': generateSimpleParamFunction('location'),
    'URL': generateSimpleParamFunction('url'),
    'RELATED-TO': generateSimpleParamFunction('relatedTo'),
    'PRIORITY': generateSimpleParamFunction('priority'),
    'PERCENT-COMPLETE': generateSimpleParamFunction('percentComplete'),
    'STATUS': generateSimpleParamFunction('status'),
    'SEQUENCE': generateSimpleParamFunction('sequence'),
    'X-OC-HIDESUBTASKS': generateSimpleParamFunction('hideSubtasks'),

    'RRULE': function objectCategories(value, params, events, lastEvent) {
        lastEvent.rrule = RRule.parseString(value);
        return lastEvent;
    },

    'ORGANIZER': function objectOrganizer(value, params, events, lastEvent) {
        const mail = value.replace(/MAILTO:/i, '');

        if (params.CN) {
            lastEvent.organizer = {
                name: params.CN,
                mail: mail
            };
        }
        else {
            lastEvent.organizer = {
                mail: mail
            };
        }
        return lastEvent;
    },

    'GEO': function objectGeo(value, params, events, lastEvent) {
        const pos = value.split(';');
        if (pos.length !== 2) {
            return lastEvent;
        }

        lastEvent.geo = {};
        lastEvent.geo.latitude = Number(pos[0]);
        lastEvent.geo.longitude = Number(pos[1]);
        return lastEvent;
    },

    'CATEGORIES': function objectCategories(value, params, events, lastEvent) {
        lastEvent.categories = value.split(/\s*,\s*/g);
        return lastEvent;
    },

    'ATTENDEE': function objectAttendee(value, params, events, lastEvent) {
        if (!lastEvent.attendee) {
            lastEvent.attendee = [];
        }

        const mail = value.replace(/MAILTO:/i, '');

        if (params.CN) {
            lastEvent.attendee.push({
                name: params.CN,
                mail: mail
            });
        }
        else {
            lastEvent.attendee.push({
                mail: mail
            });
        }
        return lastEvent;
    }
};

export function parseICS(str) {
    const data = [];

    const events = [];
    let lastEvent = {};

    const lines = str.split('\n');

    for (let i = 0, len = lines.length; i < len; i += 1) {
        let line = lines[i].trim();

        while (i + 1 < len && lines[i + 1].match(/^ /)) {
            i += 1;
            line += lines[i].trim();
        }

        const dataLine = line.split(':');
        if (dataLine.length < 2) {
            continue;
        }

        const dataName = dataLine[0].split(';');

        const name = dataName[0];
        dataName.splice(0, 1);

        const params = {};
        dataName.forEach(function (param) {
            param = param.split('=');
            if (param.length === 2) {
                params[param[0]] = param[1];
            }
        });

        dataLine.splice(0, 1);
        const value = dataLine.join(':');
        if (objects[name]) {
            lastEvent = objects[name](value, params, events, lastEvent, data);
        }
    }

    return data;
}
