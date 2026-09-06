# Django Startup Reference

A reusable step-by-step reference for starting a Django project, creating database tables, loading data, and working with the Django ORM.

---

## 1. The Big Picture

The basic Django workflow is:

```text
Create project folder
        ↓
Create virtual environment
        ↓
Install Django
        ↓
Create Django project
        ↓
Create Django app
        ↓
Configure settings
        ↓
Create models
        ↓
makemigrations
        ↓
migrate
        ↓
Create/load data
        ↓
Query data with the ORM
```

### Important mental model

- **Project** = the overall Django application/configuration.
- **App** = a specific area of functionality inside the project.
- **Model** = Python definition of the data structure.
- **Migration** = instructions Django uses to change the database structure.
- **Database** = where the actual data records are stored.
- **ORM** = Python interface for interacting with the database.
- **Admin** = a built-in web interface for manually managing records.

---

# 2. Create the Project Directory

Create a folder and move into it:

```bash
mkdir my_project
cd my_project
```

You should now have:

```text
my_project/
```

---

# 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it.

### Mac/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

You should see `(venv)` in your terminal.

Example:

```text
(venv) $
```

The virtual environment keeps this project's Python packages separate from other projects.

---

# 4. Install Django

```bash
pip install django
```

Check the installation:

```bash
django-admin --version
```

---

# 5. Create the Django Project

A common approach is:

```bash
django-admin startproject config .
```

The `.` means "create the project in the current directory."

You should now have:

```text
my_project/
│
├── venv/
├── manage.py
│
└── config/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py
```

### What is `manage.py`?

`manage.py` is the command-line entry point for many Django operations.

For example:

```bash
python manage.py runserver
python manage.py startapp products
python manage.py makemigrations
python manage.py migrate
```

---

# 6. Create a Django App

For example, create a products app:

```bash
python manage.py startapp products
```

Structure:

```text
my_project/
│
├── manage.py
│
├── config/
│
└── products/
    ├── migrations/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    └── views.py
```

### Project vs App

Think:

```text
PROJECT
│
├── APP 1
├── APP 2
└── APP 3
```

For example:

```text
my_project/
│
├── products/
├── customers/
├── orders/
└── reports/
```

You don't necessarily need all of these. They are examples of how functionality can be separated.

---

# 7. Add the App to Django

Open:

```text
config/settings.py
```

Find:

```python
INSTALLED_APPS = [
    ...
]
```

Add your app:

```python
INSTALLED_APPS = [
    ...
    'products',
]
```

Now Django knows that the `products` app is part of the project.

---

# 8. Configure the Database

Django uses SQLite by default.

In `config/settings.py` you will see something similar to:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

This creates a local SQLite database:

```text
db.sqlite3
```

For larger/deployed applications, PostgreSQL is commonly used instead.

The database configuration must be changed in `settings.py` when switching databases.

---

# 9. Create a Model

Open:

```text
products/models.py
```

Example:

```python
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return self.name
```

This defines the structure of a `Product`.

Conceptually:

```text
Product model
     ↓
database table
     ↓
columns
```

The fields:

```python
name
price
quantity
```

will become database columns.

Django also automatically gives the model a primary key called `id` unless you define your own.

Conceptually the table could look like:

| id | name | price | quantity |
|---:|---|---:|---:|
| 1 | Laptop | 15000.00 | 5 |
| 2 | Mouse | 500.00 | 20 |

---

# 10. Create Migrations

After changing your models:

```bash
python manage.py makemigrations
```

This creates migration files.

Think:

```text
models.py
    ↓
makemigrations
    ↓
migration instructions
```

The migration records the database changes Django needs to make.

---

# 11. Apply Migrations

Now apply the migration to the database:

```bash
python manage.py migrate
```

Think:

```text
models.py
    ↓
makemigrations
    ↓
migration file
    ↓
migrate
    ↓
database
```

### Remember the difference

`makemigrations`:

> Create the instructions.

`migrate`:

> Execute the instructions against the database.

---

# 12. Register the Model in the Admin

Open:

```text
products/admin.py
```

Add:

```python
from django.contrib import admin
from .models import Product

admin.site.register(Product)
```

Now Django's admin site can manage Product records.

---

# 13. Create an Admin User

```bash
python manage.py createsuperuser
```

Follow the prompts:

```text
Username:
Email:
Password:
```

---

# 14. Start the Development Server

```bash
python manage.py runserver
```

Django will normally give you:

```text
http://127.0.0.1:8000/
```

The admin site is:

```text
http://127.0.0.1:8000/admin/
```

Log in using your superuser.

You can now manually create Product records through the admin interface.

---

# 15. Load Data Using the Django ORM

Django provides an ORM (Object-Relational Mapper).

Instead of writing SQL directly, you can use Python.

For example:

```python
from products.models import Product
```

Create a record:

```python
Product.objects.create(
    name="Laptop",
    price=15000,
    quantity=5
)
```

This creates a Product record in the database.

---

# 16. Open the Django Shell

A convenient place to experiment with the ORM is the Django shell:

```bash
python manage.py shell
```

Then:

```python
from products.models import Product
```

Create data:

```python
Product.objects.create(
    name="Laptop",
    price=15000,
    quantity=5
)
```

Create another:

```python
Product.objects.create(
    name="Mouse",
    price=500,
    quantity=20
)
```

---

# 17. Query Data

Get all products:

```python
Product.objects.all()
```

Filter products:

```python
Product.objects.filter(quantity__gt=5)
```

Get one product:

```python
Product.objects.get(id=1)
```

Filter by name:

```python
Product.objects.filter(name="Laptop")
```

Order results:

```python
Product.objects.order_by("price")
```

Descending order:

```python
Product.objects.order_by("-price")
```

Count records:

```python
Product.objects.count()
```

---

# 18. ORM vs SQL

Django ORM:

```python
Product.objects.all()
```

roughly represents:

```sql
SELECT *
FROM products_product;
```

Django ORM:

```python
Product.objects.filter(quantity__gt=5)
```

roughly represents:

```sql
SELECT *
FROM products_product
WHERE quantity > 5;
```

The ORM allows you to work with database data using Python while Django handles much of the SQL generation.

---

# 19. Update Data

Get a product:

```python
product = Product.objects.get(id=1)
```

Change its price:

```python
product.price = 16000
```

Save it:

```python
product.save()
```

You can also update directly:

```python
Product.objects.filter(id=1).update(price=16000)
```

---

# 20. Delete Data

Delete one record:

```python
product = Product.objects.get(id=1)
product.delete()
```

Or:

```python
Product.objects.filter(id=1).delete()
```

Be careful with `delete()` because it permanently removes records unless you have another recovery mechanism.

---

# 21. Loading Existing Data

If you already have data in:

- CSV
- JSON
- another database
- an API
- another application

you normally don't want to manually enter every record through the admin interface.

A common approach is to create a Django management command.

Example structure:

```text
products/
│
├── management/
│   ├── __init__.py
│   │
│   └── commands/
│       ├── __init__.py
│       └── load_products.py
```

Then run:

```bash
python manage.py load_products
```

The command can read a CSV and create database records using the ORM.

For example:

```python
Product.objects.create(
    name=row["name"],
    price=row["price"],
    quantity=row["quantity"]
)
```

For large datasets, consider:

```python
Product.objects.bulk_create(products)
```

instead of calling `.create()` thousands of times individually.

---

# 22. Django Fixtures

Django also supports fixtures for loading structured data.

For example:

```bash
python manage.py loaddata products.json
```

Fixtures are useful when you have data exported in a format Django understands and want to load it into the database.

---

# 23. Typical Project Structure

A small Django project might eventually look like:

```text
my_project/
│
├── venv/
│
├── manage.py
├── db.sqlite3
│
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── products/
    ├── migrations/
    │   ├── __init__.py
    │   └── 0001_initial.py
    │
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    └── views.py
```

As your project grows, you may add:

```text
templates/
static/
forms.py
urls.py
services/
management/
```

depending on the application's architecture.

---

# 24. The Most Important Development Cycle

Whenever you change a model:

```text
Change models.py
      ↓
python manage.py makemigrations
      ↓
python manage.py migrate
```

For example, if you add:

```python
description = models.TextField()
```

run:

```bash
python manage.py makemigrations
python manage.py migrate
```

Do not manually edit the database table to make the change.

Let Django migrations manage the schema.

---

# 25. Useful Django Commands

### Start development server

```bash
python manage.py runserver
```

### Create an app

```bash
python manage.py startapp app_name
```

### Create migrations

```bash
python manage.py makemigrations
```

### Apply migrations

```bash
python manage.py migrate
```

### See migration status

```bash
python manage.py showmigrations
```

### Create admin user

```bash
python manage.py createsuperuser
```

### Open Django shell

```bash
python manage.py shell
```

### Load fixtures

```bash
python manage.py loaddata filename.json
```

---

# 26. Development vs Production

During development you may have:

```python
DEBUG = True
```

For production, `DEBUG` should normally be:

```python
DEBUG = False
```

Do not treat development settings as production settings.

Before deploying, review:

- `DEBUG = False`
- `SECRET_KEY` is kept secret
- `ALLOWED_HOSTS` is configured correctly
- database credentials are stored securely
- HTTPS is enabled
- secure cookies are configured
- CSRF protection is enabled
- production database is used appropriately
- static files are configured
- media uploads are handled securely
- dependencies are kept updated
- database backups exist
- error/debug information is not exposed to users
- authentication and authorization are properly configured

Django provides a deployment checklist:

```bash
python manage.py check --deploy
```

Run this before deploying and review the warnings.

---

# 27. Environment Variables

Do not hard-code production secrets into your source code.

Avoid:

```python
SECRET_KEY = "my-secret-key"
DATABASE_PASSWORD = "my-password"
```

Prefer environment variables or a properly configured secrets system.

Conceptually:

```text
Environment / secrets
        ↓
Django settings
        ↓
Application
```

Also avoid committing secret files such as `.env` to Git.

---

# 28. A Clean Starting Checklist

When starting a new Django project, use this checklist:

```text
[ ] Create project directory
[ ] Create virtual environment
[ ] Activate virtual environment
[ ] Install Django
[ ] Create Django project
[ ] Create Django app
[ ] Add app to INSTALLED_APPS
[ ] Configure database
[ ] Create models
[ ] Run makemigrations
[ ] Run migrate
[ ] Register models in admin
[ ] Create superuser
[ ] Run development server
[ ] Test admin
[ ] Add/load data
[ ] Test ORM queries
[ ] Build views/URLs/templates/API as required
```

---

# 29. The Database Mental Model

Remember this chain:

```text
Python Model
      ↓
Migration
      ↓
Database Table
      ↓
Database Records
```

And when working with the data:

```text
Python Code
      ↓
Django ORM
      ↓
SQL
      ↓
Database
```

For example:

```python
Product.objects.filter(price__gt=1000)
```

becomes a database query that finds products whose price is greater than 1000.

---

# 30. Quick Start: Commands Only

If you already understand the concepts and just need the commands:

```bash
# 1. Create directory
mkdir my_project
cd my_project

# 2. Create virtual environment
python -m venv venv

# 3. Activate
source venv/bin/activate

# 4. Install Django
pip install django

# 5. Create project
django-admin startproject config .

# 6. Create app
python manage.py startapp products

# 7. Add 'products' to INSTALLED_APPS

# 8. Define models in products/models.py

# 9. Create migrations
python manage.py makemigrations

# 10. Apply migrations
python manage.py migrate

# 11. Create admin user
python manage.py createsuperuser

# 12. Start server
python manage.py runserver

# 13. Open admin
# http://127.0.0.1:8000/admin/

# 14. Open Django shell
python manage.py shell
```

---

# 31. One Rule to Remember

When you are unsure what to do after changing a model, remember:

```text
"I changed the model."

        ↓

python manage.py makemigrations

        ↓

"I created the migration."

        ↓

python manage.py migrate

        ↓

"The database now reflects the model change."
```

This is the core Django model-to-database workflow.
