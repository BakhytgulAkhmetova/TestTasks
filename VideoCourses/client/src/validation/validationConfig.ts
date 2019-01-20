
export const regFormCustomer = {
    firstName: ['isNotEmpty'],
    lastName: ['isNotEmpty'],
    address:['isNotEmpty'],
    phone: ['isNotEmpty', 'isPhoneNumber'],
    login: ['isNotEmpty', 'isEmail'],
    password: ['isNotEmpty'],
    isDisabled: []
};

export const loginForm = {
    login: ['isNotEmpty'],
    password: ['isNotEmpty'],
    isDisabled: []
};
