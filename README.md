# PannaStreet - Backend

## English Version

This repository contains the backend application for **PannaStreet**, a web platform for daily football games. This project has been developed as part of a **Final Degree Project**, with the goal of demonstrating skills in scalable backend architecture, database management, and API design.

### Educational Context

This backend project focuses on the implementation of a robust, secure, and maintainable server-side architecture. The main objectives include:
- Application of Hexagonal Architecture (Clean Architecture) principles to ensure decoupling and testability.
- Strict data validation and integrity using Zod and Sequelize.
- Efficient database schema design and relational data management in PostgreSQL/Supabase.
- Implementation of secure REST APIs, automated background jobs (Cronjobs), and complex business logic for daily games.

---

### Collaboration and Code Style Guide
To ensure the maintainability and scalability of this project, all contributors must adhere to the following development standards.

---

## 1. Language and Documentation
Everything within the codebase must be written in **English**.

* **Code:** Variable names, classes, functions, and database schemas must be in English.
* **Comments:** All comments must be in English.
* **Special Tags:**
    * `@TODO`: Use this for tasks or features that need to be implemented in the future.
    * `@QUESTION`: Use this to mark code blocks that require discussion or clarification from the team.

> **Example:**
> ```javascript
> // @QUESTION: Should we move this logic to a dedicated microservice?
> // @TODO: Add error handling for edge cases
> const calculateTax = (amount) => { ... }
> ```
---

## 2. Naming Conventions
We use semantic naming to ensure the code is "self-explanatory":

| Element | Format | Example |
| :--- | :--- | :--- |
| **Classes** | PascalCase | `UserProcessor` |
| **Variables / Functions** | camelCase | `calculateTotalAmount()` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| **Files** | kebab-case | `auth-service.js` |

---

## 3. Methods and Functions Rules
* **Action Verbs:** Method names must start with a verb indicating their purpose:
    * `get...`: Retrieve data (should not modify state).
    * `set...`: Update or change a value.
    * `is...` / `has...`: Functions returning a boolean.
    * `handle...`: Event handlers or callbacks.

---

## 4. Git Workflow & Commits
We follow a strict branching and commit policy to keep the history clean.

### Branching Strategy
* Never push directly to `main`.
* Create a branch for every task following the next format: Number of the issue - type of task / task name.

### Conventional Commits
The type of tasks must be one of the following categories:
* `feat:` A new feature.
* `fix:` A bug fix.
* `docs:` Documentation only changes.
* `refactor:` Code changes that neither fix a bug nor add a feature.
* `test:` Adding missing tests or correcting existing tests.

---

## 5. Maintenance & Security

### Security Audits
Avoid using `npm audit fix --force` for critical dependencies like `sequelize` or `sequelize-typescript`. This command can cause major version downgrades that break the application.

* **Manual Fixes:** When vulnerabilities are reported, prioritize manual updates to the latest stable major versions.
* **Current Stable Stack (May 2026):**
    * `sequelize`: ^6.37.8
    * `sequelize-typescript`: ^2.1.6
    * `uuid`: ^14.0.0
    * `zod`: ^4.4.3
    * `pg`: ^8.20.0
    * `dotenv`: ^17.4.2
    * `express`: ^5.2.1
    * `typescript`: ^6.0.3 (v6 support)

If `npm audit` suggests a "breaking change" downgrade to v3 or similar for `sequelize`, ignore the automated fix and maintain the modern v6+ version.

---

## 6. Project Structure & Setup

### Folder Breakdown
```text
backend-pannastreet/
├── src/
│   ├── application/      # Application Layer (Use Cases)
│   │   └── use-cases/    # Business logic orchestration
│   ├── Domain/           # Domain Layer (Core)
│   │   ├── entities/     # Pure business objects/interfaces
│   │   └── repositories/ # Interfaces for data access
│   └── infrastructure/   # Infrastructure Layer (External)
│       ├── config/       # Environment & DB configurations
│       ├── controllers/  # Express route handlers
│       ├── database/     # Migrations and Seeders
│       ├── models/       # Sequelize DB Models
│       ├── repositories/ # Concrete implementations of repositories
│       ├── routes/       # API endpoint definitions
│       └── validation/   # Zod schemas and validation logic
```

- **`application/`**: Contains the use cases that orchestrate the business logic. It validates inputs and calls domain repositories.
- **`domain/`**: The core of the application. Contains pure interfaces for entities and repositories without any external dependencies.
- **`infrastructure/`**: Handles everything external to the application (Databases, Express API, validation frameworks like Zod).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <REPOSITORY_URL>
   cd backend-pannastreet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables**:
   Create a `.env` file with your database connection strings (Supabase/PostgreSQL) and other required variables.

4. **Run database migrations**:
   ```bash
   npm run db:migrate
   ```

5. **Run the server**:
   ```bash
   npm run dev
   ```

### License
This project is for educational use within the framework of a Final Degree Project.

---

## 7. Backend Architecture & General Functionality
This project is built using **Hexagonal Architecture (Clean Architecture)** in Node.js (Express + TypeScript) to ensure decoupling, scalability, and testability.

### General Flow
1. **Infrastructure (Controllers/Routes):** Express routes receive HTTP requests and pass the data to controllers. Controllers handle HTTP responses and status codes.
2. **Application (Use Cases):** Controllers invoke Use Cases. Use Cases contain the strict business logic and orchestrate data. They validate all inputs using **Zod** to guarantee data integrity before interacting with the database.
3. **Domain:** Defines the core Entities and Repository Interfaces. This layer has zero dependencies on external libraries or databases (Dependency Inversion).
4. **Infrastructure (Database):** Concrete Repositories implement Domain interfaces using **Sequelize** (PostgreSQL/Supabase) to fetch or save data.

### Daily Challenges System
A core feature of PannaStreet is the "Daily Challenge" (One-Try Daily Game) functionality, built natively into this architecture.

* **Domain:** `DailyChallenge` and `UserGameAttempt` entities. Attempts use an `AttemptStatus` enum (`pending`, `won`, `lost`).
* **Core Business Rules:** 
    * **One Attempt Per Day:** Enforced natively at the database level by a composite unique index (`userId` + `date` + `gameId`) on the `user_game_attempts` table.
    * **State Management:** When a user enters a game, an attempt is created with a `pending` status. If the user disconnects and returns, the backend retrieves the `pending` state along with its `history` (JSONB) to safely resume the game. Once the game ends (`won` or `lost`), the state is locked for that user until the next day.
* **Cronjob Automation:** An automated task runs at midnight (`00:00:00 UTC`) to randomly generate new daily challenges for all games/modes and execute cleanup operations (`delete-older-than`) to keep the database optimized without accumulating legacy rows.

---

## Versión en Español

Este repositorio contiene la aplicación backend para **PannaStreet**, una plataforma web de juegos diarios de fútbol. Este proyecto ha sido desarrollado como parte de un **Trabajo de Fin de Grado**, con el objetivo de demostrar habilidades en arquitectura backend escalable, gestión de bases de datos y diseño de APIs.

### Contexto Educativo

Este proyecto backend se centra en la implementación de una arquitectura del lado del servidor robusta, segura y mantenible. Los objetivos principales incluyen:
- Aplicación de los principios de Arquitectura Hexagonal (Clean Architecture) para asegurar el desacoplamiento y la facilidad de prueba.
- Validación estricta e integridad de datos utilizando Zod y Sequelize.
- Diseño eficiente de esquemas de bases de datos y gestión de datos relacionales en PostgreSQL/Supabase.
- Implementación de APIs REST seguras, tareas automatizadas en segundo plano (Cronjobs) y lógica de negocio compleja para juegos diarios.

---

### Guía de Colaboración y Estilo de Código
Para garantizar el mantenimiento y la escalabilidad de este proyecto, todos los contribuyentes deben cumplir con los siguientes estándares de desarrollo.

---

## 1. Idioma y Documentación
Todo el código base debe estar escrito en **Inglés**.

* **Código:** Los nombres de variables, clases, funciones y esquemas de base de datos deben estar en inglés.
* **Comentarios:** Todos los comentarios deben estar en inglés.
* **Etiquetas Especiales:**
    * `@TODO`: Usa esto para tareas o funcionalidades que deban implementarse en el futuro.
    * `@QUESTION`: Usa esto para marcar bloques de código que requieran discusión o aclaración por parte del equipo.

> **Ejemplo:**
> ```javascript
> // @QUESTION: Should we move this logic to a dedicated microservice?
> // @TODO: Add error handling for edge cases
> const calculateTax = (amount) => { ... }
> ```
---

## 2. Convenciones de Nomenclatura
Usamos nomenclatura semántica para asegurar que el código sea "autoexplicativo":

| Elemento | Formato | Ejemplo |
| :--- | :--- | :--- |
| **Clases** | PascalCase | `UserProcessor` |
| **Variables / Funciones** | camelCase | `calculateTotalAmount()` |
| **Constantes** | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| **Archivos** | kebab-case | `auth-service.js` |

---

## 3. Reglas de Métodos y Funciones
* **Verbos de Acción:** Los nombres de los métodos deben empezar con un verbo que indique su propósito:
    * `get...`: Obtener datos (no debe modificar el estado).
    * `set...`: Actualizar o cambiar un valor.
    * `is...` / `has...`: Funciones que devuelven un booleano.
    * `handle...`: Manejadores de eventos o callbacks.

---

## 4. Flujo de Trabajo de Git y Commits
Seguimos una estricta política de ramas y commits para mantener limpio el historial.

### Estrategia de Ramas
* Nunca subas cambios (push) directamente a `main`.
* Crea una rama para cada tarea siguiendo el siguiente formato: Número del issue - tipo de tarea / nombre de la tarea.

### Commits Convencionales
El tipo de tarea debe ser una de las siguientes categorías:
* `feat:` Una nueva funcionalidad.
* `fix:` La corrección de un error (bug).
* `docs:` Cambios exclusivos de documentación.
* `refactor:` Cambios en el código que ni corrigen errores ni añaden funcionalidades.
* `test:` Añadir pruebas faltantes o corregir las existentes.

---

## 5. Mantenimiento y Seguridad

### Auditorías de Seguridad
Evita usar `npm audit fix --force` para dependencias críticas como `sequelize` o `sequelize-typescript`. Este comando puede causar reducciones mayores de versión (downgrades) que rompan la aplicación.

* **Arreglos Manuales:** Cuando se reporten vulnerabilidades, prioriza la actualización manual a las últimas versiones principales estables.
* **Stack Estable Actual (Mayo 2026):**
    * `sequelize`: ^6.37.8
    * `sequelize-typescript`: ^2.1.6
    * `uuid`: ^14.0.0
    * `zod`: ^4.4.3
    * `pg`: ^8.20.0
    * `dotenv`: ^17.4.2
    * `express`: ^5.2.1
    * `typescript`: ^6.0.3 (Soporte v6)

Si `npm audit` sugiere un "breaking change" (cambio que rompe la compatibilidad) bajando a la v3 o similar para `sequelize`, ignora el arreglo automático y mantén la versión moderna v6+.

---

## 6. Estructura del Proyecto y Configuración

### Desglose de Carpetas
```text
backend-pannastreet/
├── src/
│   ├── application/      # Capa de Aplicación (Casos de Uso)
│   │   └── use-cases/    # Orquestación de la lógica de negocio
│   ├── domain/           # Capa de Dominio (Núcleo)
│   │   ├── entities/     # Objetos de negocio puros / interfaces
│   │   └── repositories/ # Interfaces para el acceso a datos
│   └── infrastructure/   # Capa de Infraestructura (Externa)
│       ├── config/       # Configuraciones de Entorno y BD
│       ├── controllers/  # Manejadores de rutas de Express
│       ├── database/     # Migraciones y Seeders
│       ├── models/       # Modelos de BD de Sequelize
│       ├── repositories/ # Implementaciones concretas de repositorios
│       ├── routes/       # Definiciones de endpoints de la API
│       └── validation/   # Esquemas Zod y lógica de validación
```

- **`application/`**: Contiene los casos de uso que orquestan la lógica de negocio. Valida las entradas y llama a los repositorios de dominio.
- **`domain/`**: El núcleo de la aplicación. Contiene interfaces puras para entidades y repositorios sin ninguna dependencia externa.
- **`infrastructure/`**: Maneja todo lo externo a la aplicación (Bases de datos, API de Express, frameworks de validación como Zod).

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <REPOSITORY_URL>
   cd backend-pannastreet
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Variables de entorno**:
   Crea un archivo `.env` con las cadenas de conexión a tu base de datos (Supabase/PostgreSQL) y otras variables necesarias.

4. **Ejecutar migraciones de base de datos**:
   ```bash
   npm run db:migrate
   ```

5. **Ejecutar el servidor**:
   ```bash
   npm run dev
   ```

### Licencia
Este proyecto es de uso educativo en el marco de un Trabajo de Fin de Grado.

---

## 7. Arquitectura del Backend y Funcionamiento General
Este proyecto está construido usando **Arquitectura Hexagonal (Clean Architecture)** en Node.js (Express + TypeScript) para garantizar el desacoplamiento, la escalabilidad y la facilidad de prueba.

### Flujo General
1. **Infraestructura (Controladores/Rutas):** Las rutas de Express reciben las peticiones HTTP y pasan los datos a los controladores. Los controladores manejan las respuestas HTTP y los códigos de estado.
2. **Aplicación (Casos de Uso):** Los controladores invocan a los Casos de Uso. Los Casos de Uso contienen la lógica de negocio estricta y orquestan los datos. Validan todas las entradas usando **Zod** para garantizar la integridad de los datos antes de interactuar con la base de datos.
3. **Dominio:** Define las Entidades centrales y las Interfaces de los Repositorios. Esta capa no tiene dependencias (cero) de librerías externas o bases de datos (Inversión de Dependencias).
4. **Infraestructura (Base de Datos):** Los Repositorios concretos implementan las interfaces de Dominio utilizando **Sequelize** (PostgreSQL/Supabase) para obtener o guardar datos.

### Sistema de Retos Diarios (Daily Challenges System)
Una característica central de PannaStreet es la funcionalidad de "Reto Diario" (Juego Diario de Un Solo Intento), construida de forma nativa en esta arquitectura.

* **Dominio:** Entidades `DailyChallenge` y `UserGameAttempt`. Los intentos usan un enum `AttemptStatus` (`pending`, `won`, `lost`).
* **Reglas de Negocio Centrales:** 
    * **Un Intento Por Día:** Aplicado de forma nativa a nivel de base de datos mediante un índice único compuesto (`userId` + `date` + `gameId`) en la tabla `user_game_attempts`.
    * **Gestión del Estado:** Cuando un usuario entra a un juego, se crea un intento con un estado `pending` (pendiente). Si el usuario se desconecta y vuelve, el backend recupera el estado `pending` junto con su historial `history` (JSONB) para reanudar el juego de forma segura. Una vez que el juego termina (`won` o `lost`), el estado se bloquea para ese usuario hasta el día siguiente.
* **Automatización del Cronjob:** Una tarea automatizada se ejecuta a medianoche (`00:00:00 UTC`) para generar aleatoriamente nuevos retos diarios para todos los juegos/modos, y ejecutar operaciones de limpieza (`delete-older-than`) para mantener la base de datos optimizada sin acumular filas antiguas y obsoletas.
