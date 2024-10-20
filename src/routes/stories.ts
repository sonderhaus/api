import { Router } from '@oak';
import { CreatesStoryInput } from '@/types/story.ts';
import { storyStore } from '@/stores/stories.ts';
import { Status } from 'jsr:@oak/commons@1/status';

export const storiesRouter = new Router();

storiesRouter
    .get('/stories', (ctx) => {
        ctx.response.body = storyStore.getStories();
    })
    .get('/stories/:id', (ctx) => {
        const id = ctx.params.id;
        const story = storyStore.getStoryById(id);

        if (!story) {
            ctx.response.status = Status.NotFound;
            ctx.response.body = { error: 'Story not found' };
        } else {
            ctx.response.body = story;
        }
    })
    .post('/stories', async (ctx) => {
        const body = await ctx.request.body.json();
        const isValid = validateRequiredStoryInput(body);

        if (!isValid) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body = { error: 'userId, title, and body are required' };
            return;
        }

        const story = storyStore.addStory(body);

        ctx.response.status = Status.Created;
        ctx.response.body = story;
    });

function validateRequiredStoryInput(body: unknown): body is CreatesStoryInput {
    const hasProp = (prop: string): boolean => {
        return Object.prototype.hasOwnProperty.call(body, prop);
    };

    if (
        hasProp('userId') &&
        hasProp('title') &&
        hasProp('body')
    ) {
        return true;
    } else {
        return false;
    }
}
