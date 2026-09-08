# CareerOS Monorepo

## Description
CareerOS is a human-first AI career workspace designed to help candidates discover opportunities, understand matches, prepare CVs, manage applications, prepare for interviews, and optimize career strategy.

## Architecture
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Java 21, Spring Boot 3.2
- **Database**: PostgreSQL / H2
- **Infrastructure**: Docker Compose (Optional)

## Local Development
### Requirements
- Java 21
- Node.js 20+
- Maven 3.3+

### Running the Backend
```bash
cd apps/api
mvn spring-boot:run
```
The backend runs on http://localhost:8080.

### Running the Frontend
```bash
cd apps/web
npm install
npm run dev
```
The frontend runs on http://localhost:5173.
