# Wetelo final task

This is a basic API that allows us to work with users and adverts (CRUD). Allows to login/register a user.

## Technologies

- Node.js
- Express.js
- TypeScript
- Prisma
- node-telegram-bot-api
- nodemailer
- express-validator
- winston

## This API contains such endpoints:

### Auth
- **POST** - localhost:3000/api/v1/auth/register (_register a new account_)
- **POST** - localhost:3000/api/v1/auth/login (_login a user_)
- **GET** - localhost:3000/api/v1/auth/me (_get authorized user_)

### Users
- **GET** - localhost:3000/api/v1/users (_get all users_)
- **GET** - localhost:3000/api/v1/users/:id (_get user_)
- **PUT** - localhost:3000/api/v1/users/:id (_update user_)
- **DELETE** - localhost:3000/api/v1/users/:id (_delete user_)
- **PATCH** - localhost:3000/api/v1/users/:id/verify (_verify user_)

### Adverts
- **GET** - localhost:3000/api/v1/adverts (_get all adverts_)
- **POST** - localhost:3000/api/v1/adverts (_create advert_)
- **PUT** - localhost:3000/api/v1/adverts/:id (_update advert_)
- **DELETE** - localhost:3000/api/v1/adverts/:id (_delete advert_)

## Run app

1. Clone repository
``` bash
git clone https://github.com/Taras-Rm/final-task-wetelo.git
```

2. Move to server folder:
``` bash
cd ./server
```

3. Install dependencies
``` bash
npm install
```

4. Create **.env** file and add relevant data to this file according to **.env.example** file:

5. To start database run:
``` bash
docker compose up
```

6. Add schema to the database:
``` bash
npx prisma migrate dev
```

7. Add seed data into database:
``` bash
npx prisma db seed
```

8. Start app
``` bash
npm run watch
```
than
``` bash
npm run dev
```