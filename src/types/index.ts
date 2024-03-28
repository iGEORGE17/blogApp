


export interface ICategory {
    id: string;
    name: string;
}

export interface IUser {
    id: string;
    name: string;
}


export interface IPost {
    id: string;
    title: string;
    tag: string;
    imageUrl?: string;
    content: string;
    category: ICategory;
    author: IUser;
}
