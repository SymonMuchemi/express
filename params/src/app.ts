import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

// route that handles a route/request parameter
app.get('/users/:id', (req: Request, resp: Response) => {
    const userId = req.params.id;
    resp.send(`User ID: ${userId}`);
});

// route that handles query parameters
app.get('/users', (req, resp) => {
    const {name, team} = req.query;

    resp.send(`Name: ${name}\nTeam: ${team}`);
});

// handles both query and route parameters
app.get('/user/:id/', (req, resp) => {
    const userId = req.params.id;
    const filter = req.query.filter;

    resp.send(`User ID: ${userId}\nFilter: ${filter}`);
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})
