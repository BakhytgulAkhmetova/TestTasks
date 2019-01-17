export interface InterfaceAction {
    type: string,
    payload?:any
}

export interface InterfaceLayoutHeader {
    Content: any,
    HeaderParticular?: any,
    path: string,
    contentStyle: string,
    propsHeader?: any
}

export interface InterfaceLoginForm {
    login: string,
    password: string
}

export interface InterfaceFilterForm {
    searchValue: string
}

export interface InterfaceCourse {
    id: number,
    name: string,
    description: string,
    duration: number,
    date: number
}

