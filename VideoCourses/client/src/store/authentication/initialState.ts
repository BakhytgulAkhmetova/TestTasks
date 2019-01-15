interface InitialStateInterface {
    isAuthenticated: boolean,
    loginForm: {
        login: string,
        password: string
    }
}

export const initialState: InitialStateInterface = {
    isAuthenticated: false,
    loginForm: {
        login: '',
        password: ''
    }
}
