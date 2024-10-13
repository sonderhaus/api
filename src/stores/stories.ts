import type { CreatesStoryInput, Story } from '@/types/story.ts';

const initialStories: Story[] = [
    {
        id: '1',
        userId: 'user1',
        content: 'This is the first test story.',
        createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    {
        id: '2',
        userId: 'user2',
        content: "Here's another test story for you.",
        createdAt: new Date('2023-01-02T12:30:00Z'),
    },
];

const storyStore = {
    stories: [...initialStories],

    addStory(input: CreatesStoryInput): Story {
        const story: Story = {
            id: crypto.randomUUID(),
            userId: input.userId,
            content: input.content,
            createdAt: new Date(),
        };
        this.stories.push(story);
        return story;
    },

    getStories(): Story[] {
        return this.stories;
    },

    getStoryById(id: string): Story | undefined {
        return this.stories.find((story) => story.id === id);
    },
};

export { storyStore };
