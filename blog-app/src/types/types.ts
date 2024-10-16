export interface PostBody {
    title: string;
    content: string | null;
    authorEmail: string;
}

export interface User {
    name: string;
    email: string;
}
