import app from './app';

const port = process.env.port || 5050;
process.env.nao_port = `${port}`;

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.info(`server started at http://localhost:${port}`);
});
