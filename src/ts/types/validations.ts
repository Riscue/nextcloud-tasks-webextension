import {ValidationFunc, ValidationRule} from 'vuelidate/lib/validators';

export type Validations = {
    'form': {
        [key: string]: {
            [key: string]: ValidationFunc | ValidationRule
        }
    }
};
