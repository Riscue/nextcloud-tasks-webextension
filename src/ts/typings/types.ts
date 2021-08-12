import {ValidationFunc, ValidationRule} from 'vuelidate/lib/validators';

export type Validations = {
    form: {
        [key: string]: {
            [key: string]: ValidationFunc | ValidationRule
        }
    }
};

export type FilterOption = {
    key: string,
    value: string,
    not?: boolean
};

export type CalendarItem = {
    raw: string,
    ics: any,
    ETag: string
};

export type CalendarResponse = {
    hrefs: string[],
    displayName: string,
    CTag: string
};
