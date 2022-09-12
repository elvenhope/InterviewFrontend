import { extend } from 'vee-validate';
import { required, numeric, alpha } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Please, submit required data'
});

extend('alpha', {
    ...alpha,
    message: 'Please, provide the data of indicated type'
});

extend('numeric', {
    ...numeric,
    message: 'Please, provide the data of indicated type'
});
