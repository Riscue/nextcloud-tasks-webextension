export const PayloadService = {

    Discover:           '<d:propfind xmlns:d="DAV:">\n' +
                        '    <d:prop>\n' +
                        '        <d:current-user-principal />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>',

    CalendarHomeSet:    '<d:propfind xmlns:d="DAV:" xmlns:cal="urn:ietf:params:xml:ns:caldav">\n' +
                        '    <d:prop>\n' +
                        '        <cal:calendar-home-set />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>',

    CalendarData:       '<d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/" xmlns:cal="urn:ietf:params:xml:ns:caldav">\n' +
                        '    <d:prop>\n' +
                        '        <d:resourcetype />\n' +
                        '        <d:displayname />\n' +
                        '        <cs:getctag />\n' +
                        '        <cal:supported-calendar-component-set />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>',

    DownloadCalendar:   '<cal:calendar-query xmlns:d="DAV:" xmlns:cal="urn:ietf:params:xml:ns:caldav">\n' +
                        '    <d:prop>\n' +
                        '        <d:getetag />\n' +
                        '        <cal:calendar-data />\n' +
                        '    </d:prop>\n' +
                        '    <cal:filter>\n' +
                        '        <cal:comp-filter name="VCALENDAR">\n' +
                        '            <cal:comp-filter name="VTODO" />\n' +
                        '        </cal:comp-filter>\n' +
                        '    </cal:filter>\n' +
                        '</cal:calendar-query>',
};
