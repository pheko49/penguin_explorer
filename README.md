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