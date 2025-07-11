# 🙌 Kudos App

A full-stack web application to give and receive kudos within a team — built using **React** for the frontend and **Django** for the backend.

---

## 📁 Folder Structure

kudos_app/
├── frontend/ # React app
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── ...
├── backend/ # Django app
│ ├── venv/ # Python virtual environment (not committed)
│ ├── manage.py
│ ├── requirements.txt
│ ├── db.sqlite3 # (ignored by Git)
│ ├── your_django_project/
│ └── ...

---

## 🌐 Frontend (React)

### 🔹 Setup & Run

1. Open a terminal and navigate to the frontend folder:

```bash
cd frontend
Install dependencies:
npm install

Start the React development server:

bash
Copy
Edit
npm start
The app will be running at:
👉 http://localhost:3000

🔁 It will automatically reload on file changes.

🖥 Backend (Django)
🔹 1. Navigate to the backend folder
bash
Copy
Edit
cd backend
🔹 2. Create a Python virtual environment
bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate
🔹 3. Install dependencies
bash
Copy
Edit
pip install -r requirements.txt
🔹 4. Apply migrations to set up the database
bash
Copy
Edit
python manage.py migrate
🔹 5. (Optional) Create a superuser for the admin panel
bash
Copy
Edit
python manage.py createsuperuser
🔹 6. Run the Django development server
bash
Copy
Edit
python manage.py runserver
The backend will be live at:
👉 http://localhost:8000

📌 Notes
The venv/ folder and db.sqlite3 file are not committed to Git.

To generate a requirements.txt after installing new packages:

bash
Copy
Edit
pip freeze > requirements.txt
Add sample data using:

bash
Copy
Edit
python manage.py dumpdata > sample_data.json
python manage.py loaddata sample_data.json
✅ Ready to Go
Now that both frontend and backend servers are running:

React frontend: http://localhost:3000

Django backend: http://localhost:8000

You can connect API calls from frontend to backend using fetch or axios.

📄 License
MIT — feel free to use and contribute!

yaml
Copy
Edit

---

Let me know:
- If you’re using a proxy in `package.json` for API calls (e.g., `"proxy": "http://localhost:8000"`)
- If you want to add Docker or environment variable support

Happy to tailor it further if needed!
```
