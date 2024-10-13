import { Router } from '@oak/router';
import { Status } from 'jsr:@oak/commons@1/status';

export const statusRouter = new Router();

statusRouter.get('/', (ctx) => {
    ctx.response.body = 'Welcome to Sonder API!';
    ctx.response.status = Status.OK;
});

statusRouter.get('/health', (ctx) => {
    ctx.response.body = 'OK';
    ctx.response.status = Status.OK;
});
