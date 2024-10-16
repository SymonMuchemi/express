export interface PostBody {
    title: string;
    content: string | null;
    authorEmail: string;
}

export interface UserBody {
    name: string;
    email: string;
}
