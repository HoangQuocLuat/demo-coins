const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
