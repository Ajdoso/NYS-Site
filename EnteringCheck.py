from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Функция для создания базы данных
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Главная страница (показывает твой HTML)
@app.route('/')
def home():
    return render_template('index.html')

# ОБРАБОТКА РЕГИСТРАЦИИ
@app.route('/register', methods=['POST'])
def register():
    # Собираем данные из твоих <input name="...">
    f_name = request.form['first_name']
    l_name = request.form['last_name']
    email = request.form['email']
    phone = request.form['phone']
    password = request.form['password']

    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (first_name, last_name, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (f_name, l_name, email, phone, password))
        conn.commit()
        conn.close()
        
        # Перекидываем пользователя на страницу после успешной регистрации
        return redirect('/Idex')
    except sqlite3.IntegrityError:
        return "Такой Email уже зарегистрирован!"

# ОБРАБОТКА ВХОДА (Sign In)
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Ищем пользователя с таким email и паролем
    cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        # Если нашли -> пускаем на сайт
        return redirect('/dashboard')
    else:
        # Если нет
        return "Неверный Email или пароль!"

# Та самая страница ПОСЛЕ входа
@app.route('/dashboard')
def dashboard():
    return "<h1>Добро пожаловать в Quick Auto! Вы успешно вошли.</h1>"

if __name__ == '__main__':
    init_db() # Инициализируем БД
    app.run(debug=True) # Запускаем сервер