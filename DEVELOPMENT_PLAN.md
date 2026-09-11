# Penguin Explorer Deployment Plan

## 1. Pre-deployment cleanup

## 2. PostgreSQL migration

### Current database
SQLite

### Target database
PostgreSQL

### Tasks
- Install PostgreSQL driver
- Configure DATABASE_URL
- Run migrations
- Transfer/import penguin data
- Verify record counts
- Verify filters
- Verify charts
- Verify admin

## 3. Production Django settings

- DEBUG=False
- SECRET_KEY from environment
- ALLOWED_HOSTS
- CSRF trusted origins
- Static files
- Security settings

## 4. Docker

- Dockerfile
- .dockerignore
- requirements.txt
- Gunicorn
- Container testing

## 5. Neon

- Create PostgreSQL project
- Configure credentials
- DATABASE_URL
- SSL
- Verify persistence

## 6. Render

- Connect GitHub
- Configure Docker deployment
- Environment variables
- Build command
- Start command
- Database migrations
- Deploy

## 7. Post-deployment testing

- Homepage
- Filters
- Pagination
- Details
- Charts
- Admin
- Database
- Mobile layout

## 8. GitHub / CV presentation

- README
- Architecture diagram
- Screenshots
- Technologies
- Key features
- Deployment URL