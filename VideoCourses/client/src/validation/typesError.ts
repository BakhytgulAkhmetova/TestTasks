export default {
    isNotEmpty: {
        validate: (value: any) => {
            return value !== '' && value !== null && value !== undefined;
        },
        instructions: 'The value cannot be empty'
    }
};
