const app = require('./app').default;

const PORT = process.env.CRA_SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`CRA Server Default listening on port ${PORT}!`);
});
