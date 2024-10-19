import storiesJson from '@/data/stories.json' with { type: 'json' };
import type { CreatesStoryInput, Story } from '@/types/story.ts';

const storyStore = {
    stories: [...storiesJson as unknown as Story[]],

    addStory(input: CreatesStoryInput): Story {
        const story: Story = {
            id: crypto.randomUUID(),
            title: input.title,
            userId: input.userId,
            body: input.body,
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
