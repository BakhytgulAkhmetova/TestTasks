import { regNumber } from './constants';

export default {
    isNotEmpty: {
        validate: (value: any) => {
            return value !== '' && value !== null && value !== undefined && value!==0 && value.length!==0;
        },
        instructions: 'Поле не может быть пустым. '
    },
    isNumber: {
        validate: (value: any) => {
            return regNumber.test(value);
        },
        instructions: 'Поле для ввода числа. '
    }
};
