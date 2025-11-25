const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
