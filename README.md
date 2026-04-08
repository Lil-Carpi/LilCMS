# LilCMS

> A lightweight, fast and reliable CMS made from scratch!

LilCMS is a personal project written in **Django, NGINX, JSVanilla, HTML5 and CSS. MariaDB** as a database.

*(Upcoming: An automated installer for Linux written in Bash).*

---

# Status

---
## LilCMS 0.1.2 (Atomic Ant) RELEASED!
Created a Django based login system based on the login system made on PHP from the 0.1.1 prototype.
Check ['CHANGELOG.md'](./CHANGELOG.md) for more info

Keep tuned for more news.
    - Lil_Carpi

---
## Quick Start (development)

*(A more detailed documentation is being build in the Wiki!)*

To run the project locally for now:
1. Clone the repository
2. You will need a MariaDB or MySQL database with a users table. You can change the parameters of IP adress, user and password on line 79 of `core/settings.py` from the Django config file.
3. Activate your venv if needed (e.g., `source Login(django)/venv/bin/activate`).
4. Install dependencies (**django**, **django-cors-headers** and **pymysql**)
5. Run `python manage.py runserver`.

---

***Lil_Carpi***
A very bored guy building his own tools instead of using others... Why not?
