export interface Story {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}

export interface CreatesStoryInput {
    userId: string;
    content: string;
}
