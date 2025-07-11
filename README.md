# 🙌 Kudos App

A full-stack web application to give and receive kudos within a team — built using **React** for the frontend and **Django** for the backend.

---

## 📁 Folder Structure

```
kudos_app/
├── frontend/        # React app
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/         # Django app
│   ├── venv/        # Python virtual environment (not committed)
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3   # (ignored by Git)
│   ├── your_django_project/
│   └── ...
```

---

## 🌐 Frontend (React)

### 🔹 Setup & Run

1. Open a terminal and navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

4. The app will be running at:  
   👉 `http://localhost:5173`

> 🔁 It will automatically reload on file changes.

---

## 🖥 Backend (Django)

### 🔹 1. Navigate to the backend folder

```bash
cd backend
```

### 🔹 2. Create a Python virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 🔹 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 🔹 4. Apply migrations to set up the database

```bash
python manage.py migrate
```

### 🔹 5. (Optional) Create a superuser for the admin panel

```bash
python manage.py createsuperuser
```

### 🔹 6. Run the Django development server

```bash
python manage.py runserver
```

5. The backend will be live at:  
   👉 `http://localhost:8000`

---

## 📌 Notes

- The `venv/` folder and `db.sqlite3` file are not committed to Git.
- To generate a `requirements.txt` after installing new packages:

```bash
pip freeze > requirements.txt
```

- Add sample data using:

```bash
python manage.py dumpdata > sample_data.json
python manage.py loaddata sample_data.json
```

---

## ✅ Ready to Go

Now that both frontend and backend servers are running:

- React frontend: `http://localhost:3000`
- Django backend: `http://localhost:8000`

You can connect API calls from frontend to backend using `fetch` or `axios`.

---

## 🧪 Demo Setup

To populate the app with random demo data for testing or demo purposes:

```bash
python manage.py generate_demo_data
```

This will:

- Create 5 demo users (`user0`, `user1`, ..., `user4`)
- Generate 15 random kudos interactions between them with varied messages, timestamps, and kudos amounts
- Print a readable summary of all generated interactions in the terminal

> 🔐 All demo users will have the same password: `test1234`

---

## 🔐 Sample Login (if using token-based auth)

Use the credentials in your UI or via `curl`:

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"user0", "password":"test1234"}'
```

This will return a token you can use to authenticate API requests.

---

## 📄 License

MIT — feel free to use and contribute!
