const app = require('./app').default;

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`CRA Server listening on port ${PORT}!`);
});
