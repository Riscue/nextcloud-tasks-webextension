import * as ICAL from 'ical.js';

export class ICALHelper {
    static parse(str) {
        const component = new ICAL.Component(ICAL.parse(str)).getFirstSubcomponent('vtodo');
        const vtodo = {};
        component.getAllProperties().forEach((property) => {
            const firstProperty = component.getFirstProperty(property.name);
            vtodo[property.name] = firstProperty[property.isMultiValue ? 'getValues' : 'getFirstValue']();
        });
        return vtodo;
    }
}
