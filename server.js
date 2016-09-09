import Koa from 'koa';

const app = new Koa();
const PORT = 8431;

app.use(async ctx => {
  ctx.body = 'success!';
});

app.listen(PORT);
