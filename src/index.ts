import app from './app';

const port = process.env.port || 5050
app.listen(port, () => {
  // console.log(`server started at http://localhost:${port}`);
});
