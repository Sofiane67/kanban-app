# Spécifications du projet

## Objectif général

Développer une **application Kanban** complète composée de :

* un **backend** RESTful en **Express.js + TypeScript**
* un **frontend** en **Next.js + TypeScript**
* une base de données **PostgreSQL**
* une architecture **Dockerisée**
* un déploiement sur **VPS avec CI/CD GitHub Actions**

---

## Modèle de données relationnel

### Entités principales

#### `User`

* `id` (PK)
* `username` (unique)
* `email` (unique)
* `passwordHash`
* `createdAt`
* `updatedAt`

#### `Board`

* `id` (PK)
* `name`
* `userId` (FK → User)
* `createdAt`
* `updatedAt`

#### `Column`

* `id` (PK)
* `name`
* `position`
* `boardId` (FK → Board)

#### `Task`

* `id` (PK)
* `title`
* `description`
* `status` (`Todo`, `Doing`, `Done`)
* `position`
* `columnId` (FK → Column)

#### `Subtask`

* `id` (PK)
* `title`
* `isCompleted` (boolean)
* `taskId` (FK → Task)

---

### Relations

* `User` 1 ⟶ \* `Board`
* `Board` 1 ⟶ \* `Column`
* `Column` 1 ⟶ \* `Task`
* `Task` 1 ⟶ \* `Subtask`

---

## API REST – Express.js (TypeScript)

* `GET /api/boards` – Lister les boards
* `POST /api/boards` – Créer un board
* `POST /api/boards/:boardId/columns` – Ajouter une colonne
* `POST /api/columns/:columnId/tasks` – Créer une tâche
* `POST /api/tasks/:taskId/subtasks` – Ajouter une sous-tâche
* `PUT /api/tasks/:taskId/move` – Déplacer une tâche
* * autres routes CRUD

---

## Authentification (JWT)

* Authentification via **JSON Web Tokens**
* Middleware de protection des routes privées
* Hachage des mots de passe avec `bcrypt`
* Seuls les utilisateurs authentifiés peuvent gérer leurs ressources

---

## Règles métier

* Le statut d’une tâche est basé sur sa colonne
* Une tâche est automatiquement marquée comme complétée si **toutes ses sous-tâches** le sont
* L’ordre des colonnes et des tâches est déterminé par un champ `position`
* Les données sont **liées à l’utilisateur**

---

## Stack technique

| Élément         | Technologies utilisées                                           |
| --------------- |------------------------------------------------------------------|
| **Backend**     | Express.js, TypeScript, PostgreSQL, Sequelize, JWT, Socket.io |
| **Frontend**    | Next.js, TypeScript                                         |
| **Tests**       | Jest, Cypress                             |
| **Conteneurs**  | Docker, docker-compose                                           |
| **CI/CD**       | GitHub Actions                                                   |
| **Déploiement** | VPS (Docker, systemd, nginx, etc.)                               |

---

## Fonctionnalités principales

* Authentification sécurisée par JWT
* Gestion complète des boards, colonnes, tâches et sous-tâches
* Déplacement de tâches entre colonnes (drag & drop)
* Complétion automatique d’une tâche (via **Worker Threads**)
* Recherche par mot-clé dans un board
* Archivage automatique avec `node-cron`
* Mise à jour **en temps réel** avec **Socket.io**
