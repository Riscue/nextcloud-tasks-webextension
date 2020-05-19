import ICAL from "ical.js";

export const ICALHelper = {
    parse(str) {
        const component = new ICAL.Component(ICAL.parse(str)).getFirstSubcomponent("vtodo");
        const vtodo = {};
        component.getAllProperties().forEach(property => {
            vtodo[property.name] = component.getFirstProperty(property.name)[property.isMultiValue ? 'getValues' : 'getFirstValue']();
        });
        return vtodo;
    }
};