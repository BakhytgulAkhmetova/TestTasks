export interface InterfaceAction {
    type: string,
    payload?:any
}

export interface InterfaceLoginForm {
    login: string,
    password: string
}

export interface InterfaceFilterForm {
    searchValue: string
}

export interface InterfaceAuthor {
    id: number,
    lastName: string
}

export interface InterfaceCourse {
    id: any,
    name: string,
    description: string,
    duration: number,
    date: string,
    authorList: {
       from: Array<InterfaceAuthor>,
       to: Array<InterfaceAuthor>
    }
}

export interface InterfaceModal {
    isOpen: boolean,
    styleContent: string,
    header: any,
    content: any
}
