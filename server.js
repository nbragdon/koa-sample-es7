import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
/*
 * Notice how the specific creation of a router is necessary here
*/
const sampleRouter = new Router();
const PORT = 8431;

/*
 * This is used to get the total time a request takes to process
*/
app.use(async (ctx, next) => {
  const startTime = Date.now();

  await next();

  const timeToProcess = Date.now() - startTime;
  const fullUrl = `${ctx.protocol}://${ctx.host}${ctx.originalUrl}`;

  console.log(`${ctx.method} ${fullUrl} - ${timeToProcess}`);
});

/*
 * What do you think will happen here?
 * What do you think will happen if you comment out the next(); line?
 */
app.use(async (ctx, next) => {
  console.log('before next');
  await next();
  console.log('after next');
});

sampleRouter.get('/', async ctx => {
  console.log('success!');

  ctx.body = {
    success: true
  };
});

sampleRouter.get('/created', async ctx => {
  console.log('statusOnly');

  ctx.status = 201;
});

sampleRouter.get('/noContent', async ctx => {
  console.log('statusOnly');

  ctx.status = 204;
});

sampleRouter.get('/tooManyRequests', async ctx => {
  console.log('statusOnly');

  ctx.status = 429;
});

app.use(sampleRouter.routes());

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
});
