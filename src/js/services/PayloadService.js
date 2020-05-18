export const PayloadService = {

    discover:           '<d:propfind xmlns:d="DAV:">\n' +
                        '    <d:prop>\n' +
                        '        <d:current-user-principal />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>',

    calendarHomeSet:    '<d:propfind xmlns:d="DAV:" xmlns:cal="urn:ietf:params:xml:ns:caldav">\n' +
                        '    <d:prop>\n' +
                        '        <cal:calendar-home-set />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>',

    calendarData:       '<d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/" xmlns:cal="urn:ietf:params:xml:ns:caldav">\n' +
                        '    <d:prop>\n' +
                        '        <d:resourcetype />\n' +
                        '        <d:displayname />\n' +
                        '        <cs:getctag />\n' +
                        '        <cal:supported-calendar-component-set />\n' +
                        '    </d:prop>\n' +
                        '</d:propfind>'
};