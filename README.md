# Manul Stack 

A template and demo project of the Manul stack.

## Getting Started

Install dependencies

```bash
yarn
```

Set the environment variable for the sqlite database file. We recommend to use [direnv](https://direnv.net/) to automatically load environment variables. 
Be aware that the path is relative to the `prisma` directory.

```bash
export DATABASE_URL=file:./dev.sqlite3
```

Create db and run initial migrations

```bash
yarn prisma:migrate:up
```

Seed an admin user and password 

```bash
yarn seed --admin_email=admin@example.com --admin_password=test1234
```

Run the development server locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
