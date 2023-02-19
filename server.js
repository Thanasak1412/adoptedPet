import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import renderApp from './dist/server/ServerApp.js';

const __dirname = path.dirname(path.resolve(fileURLToPath(import.meta.url)));

const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();

const parts = html.split('not rendered');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/assets/', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use((req, res) => {
    res.write(parts[0]);

    const stream = renderApp(req.url, {
        onShellReady() {
            // if it is the crawler, do not here.
            stream.pipe(res);
        },
        onError(error) {
            console.error(error);
        },
        onAllReady() {
            // if it is the crawler.
            // stream.pipe(res);
            res.write(parts[1]);
            res.end();
        },
    })
})

console.log(`Server is running on ${PORT}`);
app.listen(PORT)