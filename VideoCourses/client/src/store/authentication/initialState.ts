interface InitialStateInterface {
    loginForm: {
        login: string,
        password: string
    }
}

export const initialState: InitialStateInterface = {
    loginForm: {
        login: '',
        password: ''
    }
}
