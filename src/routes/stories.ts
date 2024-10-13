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
        const body: CreatesStoryInput = await ctx.request.body.json();

        if (!body.content || !body.userId) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body = { error: 'Content and userId are required' };
            return;
        }

        const story = storyStore.addStory(body);

        ctx.response.status = Status.Created;
        ctx.response.body = story;
    });
