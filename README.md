# Webbers agency coding challenge

## Requirements

- pnpm
- docker

## Introduction
This is a repo for the webbers coding challenge. There's 2 branches, "main", and "query-param". In my opinion the "main" branch should be the correct way to solve the challenge, the "query-param" branch is an alternative solution.

## Getting started

### Install dependencies

```shell
pnpm i
```

### Publishing the plugin to the local registry

Run this command in the plugin directory
```shell
npx medusa plugin:build && npx medusa plugin:publish
```

### Adding the plugin to the medusa application

Run this command in the root of the medusa application
```shell
npx medusa plugin:add @webbers/review-plugin
```

### Setting up the environment

Run this command in the root of the medusa application
```shell
pnpm setup:env
```

### Starting the database environment

Run this command in the root of the medusa application
```shell
docker compose up
```

### Installing the medusa plugin from the registry

Run this command in the root of the medusa application
```shell
pnpm i
```

### Setup migrations, user, and seed data
Run these commands in the root of the medusa application
```shell
pnpm medusa db:migrate
```

```shell
pnpm medusa user --email test@test.nl --password test
```

```shell
pnpm seed
```

## Running the medusa application
```shell
pnpm dev
```

Open the Medusa Admin at http://localhost:9000/app

Log in with the previously created user `test@test.nl` with password `test`

## Submitting a review

```shell
curl -X POST http://localhost:9000/store/reviews \
     -H "Content-Type: application/json" \
     -H "X-Publishable-API-Key: <ENTER-YOUR-PUBLISHABLE-KEY>" \
     -d '{
            "product_id": "<ENTER-A-VALID-PRODUCT-ID>",
            "rating": 1,
            "email": "freek_vonk@bioloog.nl",
            "title": "Nog steeds niet binnen.",
            "description": "Heb nog steeds mijn krokodil niet ontvangen. Twee uur geleden nog met spoed besteld.",
            "locale": "nl"
         }'
```

## Getting reviews for a product by productId

```shell
curl -X GET "http://localhost:9000/store/products/<ENTER-A-VALID-PRODUCT-ID>/reviews?offset=0&limit=10" \
	 -H "X-Publishable-API-Key: <ENTER-A-VALID-PUBLISHABLE-KEY>"
```
