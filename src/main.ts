import { Application } from '@oak';
import { oakCors } from '@cors';
import { storiesRouter } from '@/routes/stories.ts';
import { statusRouter } from '@/routes/status.ts';

const port = 8000;
const app = new Application();

app.use(oakCors());

app.use(statusRouter.routes());
app.use(statusRouter.allowedMethods());

app.use(storiesRouter.routes());
app.use(storiesRouter.allowedMethods());

console.log(`CORS enbled server running on http://localhost:${port}`);

await app.listen({ port });
