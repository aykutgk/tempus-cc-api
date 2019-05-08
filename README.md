# tempus-cc-api


# Database setup
install homebrew
https://brew.sh

brew install postgresql@9.6

### Create database
```
psql --u postgres
create database disclosures;
```
### init seqelize files

```
node_modules/.bin/sequelize
```

http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-

### generate a migration file
```
node_modules/.bin/sequelize migration:generate --name users
```

### run migrations
```
node_modules/.bin/sequelize db:migrate
```

### undo migration
```
node_modules/.bin/sequelize db:migrate:undo:all
```

### create a seed
```
node_modules/.bin/sequelize seed:generate --name demo-user
```

### running seeds
```
node_modules/.bin/sequelize db:seed:all
```

### undo seeds
```
node_modules/.bin/sequelize db:seed:undo:all
