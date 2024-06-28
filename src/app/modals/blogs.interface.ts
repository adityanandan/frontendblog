export interface CreateBlog {
    category: string;
    article: string;
    authorname: string;
    blogname: string;
}

export interface Blogs {
    article: string;
    authorname: string;
    category: string;
    blogname: string;
    timestamp: string;
}