# Django Penguins Project --- Future Reference

## 1. Production & Security Checklist

Before putting the Django project into production, review this checklist
with ChatGPT.

### DEBUG

-   Development: `DEBUG = True`
-   Production: **`DEBUG = False`**
-   Never leave `DEBUG = True` in production because Django can expose
    detailed error information, including source-code context, local
    variables, settings, and other sensitive details.

### SECRET_KEY

-   The Django `SECRET_KEY` must be kept secret.
-   Do not commit the production secret key to Git.
-   Do not paste the real production secret key into ChatGPT or other
    public places.
-   Prefer loading it from an environment variable in production, for
    example:

``` python
import os

SECRET_KEY = os.environ["SECRET_KEY"]
```

-   Use a proper, unique production secret key. Do not reuse a
    development key for production.

### ALLOWED_HOSTS

-   When `DEBUG = False`, Django requires `ALLOWED_HOSTS` to be
    configured correctly.
-   Only allow the domains/hostnames that should actually serve the
    application.
-   Do not blindly use `["*"]` in production.

### Production Server

-   Django's `runserver` is for development, **not production**.
-   Use an appropriate production WSGI or ASGI server when deploying.

### HTTPS

-   Production sites should use HTTPS.
-   Review Django's HTTPS-related security settings before deployment,
    including secure cookies and appropriate browser security
    protections.

### Database & Credentials

-   Use a proper production database.
-   Keep database passwords and connection credentials out of source
    code.
-   Store production credentials securely using environment variables or
    the deployment platform's secret-management system.

### Static Files

-   Make sure static files are configured and collected correctly for
    production.
-   Test that CSS, JavaScript, images, and other static assets are
    served correctly after deployment.

### Error Handling & Logging

-   Do not expose detailed technical errors to normal users.
-   Configure appropriate production logging so application problems can
    be diagnosed without exposing sensitive information.

### Deployment Check

Before deployment, run:

``` bash
python manage.py check --deploy
```

This is a useful Django deployment check for security and production
configuration issues.

### General Rule

Development settings can be convenient.

Production settings should prioritize:

**security + reliability + controlled access + proper error handling**

------------------------------------------------------------------------

## 2. Git & Database Reminder

Git primarily tracks the project's code and configuration.

Your local database contents are not something you should rely on Git to
reproduce.

For this Penguins project, the import command is useful because the
database can be populated from the CSV again:

``` bash
python manage.py import_penguins
```

That means the project has a reproducible way to load the Penguin data
instead of depending on one particular local database.

------------------------------------------------------------------------

## 3. Before Production --- Quick Checklist

When the Penguins project is ready to deploy, stop and review these
items before going live:

-   [ ] `DEBUG = False`
-   [ ] Production `SECRET_KEY` is stored securely and is not committed
    to Git
-   [ ] `ALLOWED_HOSTS` is configured correctly
-   [ ] Production database is configured
-   [ ] Database credentials are stored securely
-   [ ] HTTPS is enabled
-   [ ] Secure cookie/security settings are reviewed
-   [ ] Static files are configured for production
-   [ ] Production WSGI/ASGI server is being used
-   [ ] Production error logging is configured
-   [ ] `python manage.py check --deploy` passes / remaining warnings
    are understood
-   [ ] Secrets and passwords are not in the Git repository
-   [ ] The application has been tested using production-like settings

## 4. Important Reminder for Future Sessions

When this Django project is close to production, tell ChatGPT:

> "Before we deploy my Penguins Django project, let's go through my
> Django production and security checklist."

Then review this file together before deploying.

------------------------------------------------------------------------

## Current Development Rule

For now, while learning and developing locally:

``` python
DEBUG = True
```

is fine.

When preparing for production:

``` python
DEBUG = False
```

and go through the full checklist above.
