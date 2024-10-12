import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Welcome to Sonder API!";
});

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
