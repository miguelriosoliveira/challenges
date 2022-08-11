/* eslint-disable no-console */

import app from './server';

const { PORT } = process.env;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} 🚀`));
