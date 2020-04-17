# Documentation

## Pour commencer
```sh
# ajouter le dump de base de données
mysql -u username -p `userdb` < ./sql/userdb.sql

# Installer les dépendances
npm install

# Lancer le serveur
PORT=8080 MYSQL_DB_USER=root MYSQL_DB_NAME=userdb MYSQL_DB_PASSWORD=secret MYSQL_DB_ADDRESS=localhost MYSQL_DB_POOL_SIZE=10 npm start

# GraphQLi
http://localhost:8080/graphql
```
## Exemples d'opérations

### Afficher tous les utilisateurs
```js
{
  users {
    grade,
    mail
  }
}
```

### Filtrer selon le grade
```js
{
  users(grade: "gold") {
    id,
    grade,
    mail
  }
}
```

### Récupérer un utilisateur à partir de son id
```js
{
  user(id: 4) {
    id,
    grade,
    mail
  }
}
```

### Ajouter un utilisateur
```js
mutation {
  addUser(grade: "silver", mail: "mail1@m.com") {
    id,
    grade
    mail
  }
}
```

### Mettre à jour un utilisateur
```js
mutation {
  updateUser(id: 1, grade: "gold", mail: "newmail@m2.com") {
    id,
    grade
    mail
  }
}
```

### Envoyer une notification avec une priorité selon le grade
```js
mutation {
  sendNotification(message: "message") {
    id,
    grade
	  mail
  }
}
```
