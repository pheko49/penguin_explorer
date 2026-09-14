# Penguin Explorer

A Django web application for exploring, filtering, and visualizing penguin data.

## Live Application

[View the live application](https://penguin-explorer.onrender.com/penguins/)

## Project Overview

Penguin Explorer is a full-stack Django web application built around a dataset of penguin measurements.

The application allows users to explore penguin records through search and filtering, view individual penguin details, and interact with data visualizations showing species populations, body mass, and the relationship between bill length and body mass.

The project was built to strengthen my understanding of building and deploying a real-world web application using Django, PostgreSQL, Docker, and a production web server.

## Features

- Search penguin records by species or island
- Filter records by species and island
- Paginate through penguin records
- View detailed information for individual penguins
- Calculate summary statistics for filtered records
- Display species-level population and average body mass statistics
- Visualize penguin populations using bar charts
- Visualize the relationship between bill length and body mass
- Visualize body mass distribution
- Import penguin data into the database using a Django management command

## Technologies Used

- **Python** — application programming language
- **Django** — web framework
- **PostgreSQL** — relational database
- **Django ORM** — database queries and data aggregation
- **HTML** — page structure
- **CSS** — styling and layout
- **JavaScript** — frontend data visualization
- **Chart.js** — interactive charts
- **Docker** — application containerization
- **Gunicorn** — production WSGI server
- **WhiteNoise** — static file serving
- **Neon** — hosted PostgreSQL database
- **Render** — application deployment and hosting

## Application Architecture

The application follows a simple Django web application architecture:

```text
User
  ↓
Django Views
  ↓
Django ORM
  ↓
PostgreSQL Database
  ↓
Django Templates
  ↓
HTML / CSS / JavaScript
```
## Deployment Architecture

The application is containerized using Docker and deployed to Render. The production database is hosted on Neon PostgreSQL.

```text
GitHub
   ↓
Render
   ↓
Docker Container
   ↓
Gunicorn
   ↓
Django Application
   ↓
Neon PostgreSQL
```

## Data & Database

The application uses PostgreSQL as its relational database.

Penguin data is initially stored in a cleaned CSV file and loaded into the Django database using a custom management command.

The Django model defines the structure and data types of the penguin records. Django's ORM is then used to retrieve, filter, aggregate, and group the data used throughout the application.

### Data Flow

```text
Cleaned CSV
    ↓
Django Management Command
    ↓
Django Model
    ↓
PostgreSQL
    ↓
Django ORM
    ↓
Views
    ↓
Templates / Visualizations

```

## Visualizations

The application uses JavaScript and Chart.js to provide interactive visualizations of the penguin data.

### Penguin Population by Species

A bar chart showing the number of penguins belonging to each species.

### Bill Length vs. Body Mass

A scatter plot showing the relationship between penguin bill length and body mass, with the data separated by species.

### Body Mass Distribution

A bar chart showing the distribution of penguin body mass using 500-gram intervals.

These visualizations are generated from data retrieved through Django and passed to the frontend for rendering with Chart.js.