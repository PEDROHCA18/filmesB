const express = require('express');
const cors = require('cors');
const moviesRoutes = require('./routes/movies');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/movies', moviesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
});
