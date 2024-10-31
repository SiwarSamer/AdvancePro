const express = require('express');
const sequelize = require('./db/connection.js');
const userRoutes = require('./src/modules/users/user.js');
const authRoutes = require('./src/modules/auth/auth.js'); 
const app = express();
const cors = require('cors');
const { Dress, Wishlist } = require('./db/models/associations'); 
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
