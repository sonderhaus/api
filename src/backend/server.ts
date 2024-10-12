import { Application } from '@oak';
import { storiesRouter } from '@/backend/routes/stories.ts';
import { statusRouter } from '@/backend/routes/status.ts';

const app = new Application();

app.use(statusRouter.routes());
app.use(statusRouter.allowedMethods());

app.use(storiesRouter.routes());
app.use(storiesRouter.allowedMethods());

export { app };
