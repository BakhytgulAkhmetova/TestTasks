
export const courseForm = {
    name: ['isNotEmpty'],
    description: ['isNotEmpty'],
    date:['isNotEmpty'],
    duration: ['isNotEmpty', 'isNumber'],
    authorList: ['isNotEmpty']
};

export const loginForm = {
    login: ['isNotEmpty'],
    password: ['isNotEmpty'],
    isDisabled: []
};
