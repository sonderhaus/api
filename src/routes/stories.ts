import { Router } from '@oak';
import { Status } from 'jsr:@oak/commons@1/status';
import 'jsr:@std/dotenv/load';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabaseUrl = 'https://inokuypetguoankjbmwp.supabase.co';
const supabaseKey = Deno.env.get('SUPABASE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const storiesRouter = new Router();

storiesRouter
    .get('/stories', async (ctx) => {
        const { data: stories, error } = await supabase
            .from('stories')
            .select('*');

        if (stories) {
            ctx.response.body = stories;
        } else {
            ctx.response.status = Status.InternalServerError;
            ctx.response.body = { error };
        }
    })
    .get('/stories/:id', async (ctx) => {
        const id = ctx.params.id;
        const { data: story, error } = await supabase
            .from('stories')
            .select('*')
            .eq('id', id)
            .single();

        if (story) {
            ctx.response.body = story;
        } else {
            ctx.response.status = Status.NotFound;
            ctx.response.body = { error };
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

        body.createdAt = new Date();

        const { data, error } = await supabase
            .from('stories')
            .insert(body)
            .select();

        if (data) {
            ctx.response.status = Status.Created;
            ctx.response.body = data[0];
        } else {
            ctx.response.status = Status.InternalServerError;
            ctx.response.body = { error };
        }
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
