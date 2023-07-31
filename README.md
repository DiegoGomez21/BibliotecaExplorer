# BibliotecaExplorer📚

[![Built with](https://img.shields.io/badge/Built_with-Cookiecutter_Django_Rest-F7B633.svg)](https://github.com/agconti/cookiecutter-django-rest)


# Prerequisites 🗒️

- Postgres
- Node >= 16

# Local Development 🧑‍💻

Create a virtual env and execute:
```bash
 pip install -r requirements.txt
```
Create database and create .env file whit this content
```bash
DATABASE_URL='postgres://postgres:password@localhost/biblioteca'
DJANGO_SECRET_KEY='local'
```
Run migrations and create super user for django admin and run django.
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Now configure vue with next commands in /bibliotecaexplorer
```bash
npm install
npm run format
npm run dev
```
Replace Django-related URLs in Vue.js.

In your Vue.js code, make sure to replace any URLs or API endpoints that are related to your Django backend. For example, if you have API calls to http://localhost:8000/api/, update them to the correct URL where your Django server is running.

#License 🎓

This project is licensed under the MIT License - see the LICENSE file for details.
