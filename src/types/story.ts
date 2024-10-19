export interface Story {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: Date;
}

export interface CreatesStoryInput {
    userId: string;
    title: string;
    body: string;
}
