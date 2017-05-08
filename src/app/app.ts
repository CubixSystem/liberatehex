import * as Koa from 'koa';
import * as serve from 'koa-static';

const app = new Koa();

app.use(serve('./public'));
app.use(async (ctx) => {
  if (404 === ctx.status) { ctx.status = 404; }
});

if (!module.parent) {
  const port = 3000;

  app.listen(port);
  // console.info(`Listening on ${port}`);
}

module.exports = app;
