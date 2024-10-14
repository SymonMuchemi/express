# Contact-Express-Xata

## Description

This is an API that allows users to create and save contacts and activities. The user can also view, update, and delete activities and contacts. The user can also search for contacts by name.

## Technologies

- Node.js (Express): for the backend.
- Xata: for the database.
- Express-validator: for validating data.
- Typescript: for type checking.
- Dotenv: for environment variables.

## Installation

1. Clone the repository.

```bash
git clone https://www.github.com/symonmuchemi/express
```

1. Install the dependencies.

```bash
npm install
```

1. Create a `.env` file in the root directory and add the following environment variables.

```env
XATA_API_KEY=your_xata_api_key
XATA_BRANCH=your_xata_branch
PORT=your_port
```

1. Start the server.

```bash
npm run dev
```

## Usage

The API has the following endpoints:

### Contacts

1. `GET /api/contacts`: Get all contacts.
1. `GET /api/contacts/:id`: Get a contact by ID.
1. `POST /api/contacts`: Create a new contact.
1. `PUT /api/contacts/:id`: Update a contact by ID.
1. `DELETE /api/contacts/:id`: Delete a contact by ID.

### Activities

1. `GET /api/activities`: Get all activities.
2. `GET /api/activities/:id`: Get an activity by ID.
3. `POST /api/activities`: Create a new activity.
4. `PUT /api/activities/:id`: Update an activity by ID.
5. `DELETE /api/activities/:id`: Delete an activity by ID.
