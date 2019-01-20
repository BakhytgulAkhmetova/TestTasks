
export const courseForm = {
    name: ['isNotEmpty'],
    description: ['isNotEmpty'],
    date:['isNotEmpty', 'isCorrectDate'],
    duration: ['isNotEmpty', 'isNumber'],
    authorList: ['isNotEmpty']
};

export const loginForm = {
    login: ['isNotEmpty'],
    password: ['isNotEmpty'],
    isDisabled: []
};
