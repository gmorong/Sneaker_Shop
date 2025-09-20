# 👟 Sneaker Shop - Система управления складом

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Полноценное клиент-серверное приложение для управления складом магазина кроссовок**

</div>

## 📋 Описание проекта

Sneaker Shop - это веб-приложение для управления складскими операциями магазина спортивной обуви. Система поддерживает разные роли пользователей и предоставляет соответствующий функционал для каждой роли.

### ✨ Основные возможности

- 🔐 **Аутентификация и авторизация** с JWT токенами
- 👥 **Система ролей** (Admin, Worker, User)
- 📦 **Управление товарами** - добавление, редактирование, удаление
- 📊 **Складской учет** - отслеживание остатков и движения товаров
- 🎨 **Адаптивный интерфейс** с Bootstrap
- 🔄 **Real-time обновления** данных

## 🎬 Демонстрация

### Интерфейсы для разных ролей

![Demo GIF](./demonstration/role-demo.gif)

*Демонстрация работы системы с разными ролями пользователей*

## 🏗️ Архитектура проекта

```
sneaker_shop/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── store/         # MobX состояние
│   │   ├── http/          # API запросы
│   │   └── utils/         # Утилиты
│   └── package.json
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/       # Контроллеры
│   ├── models/           # Модели базы данных
│   ├── routes/           # Маршруты API
│   ├── middleware/       # Промежуточное ПО
│   └── package.json
└── demonstration/         # GIF демонстрации
```

## 🛠️ Технологический стек

### Frontend
- **React 18** - библиотека для создания пользовательских интерфейсов
- **MobX** - управление состоянием приложения
- **React Router** - маршрутизация
- **Bootstrap 5** - стилизация и адаптивность
- **Axios** - HTTP клиент для API запросов

### Backend
- **Node.js** - серверная среда выполнения JavaScript
- **Express.js** - веб-фреймворк
- **PostgreSQL** - реляционная база данных
- **Sequelize** - ORM для работы с базой данных
- **JWT** - аутентификация и авторизация
- **bcrypt** - хеширование паролей
- **CORS** - поддержка кросс-доменных запросов

## 🚀 Быстрый старт

### Предварительные требования

- Node.js (версия 14 или выше)
- PostgreSQL
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone https://github.com/твой-username/sneaker_shop.git
cd sneaker_shop
```

### 2. Настройка сервера

```bash
cd server
npm install
```

Создайте файл `.env` в папке `server`:

```env
PORT=5000
DB_NAME=sneaker_shop
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_secret_key
```

### 3. Настройка базы данных

Создайте базу данных PostgreSQL:

```sql
CREATE DATABASE sneaker_shop;
```

### 4. Запуск сервера

```bash
npm run dev
```

Сервер запустится на `http://localhost:5000`

### 5. Настройка клиента

Откройте новый терминал:

```bash
cd client
npm install
npm start
```

Приложение откроется в браузере на `http://localhost:3000`

## 🔑 Роли пользователей

### 👑 Admin
- Полный доступ ко всем функциям
- Управление пользователями и ролями
- Просмотр всей статистики
- Настройка системы

### 👷 Worker
- Управление товарами
- Обновление складских остатков
- Обработка заказов
- Просмотр отчетов

### 👤 User
- Просмотр каталога товаров
- Оформление заказов
- Просмотр истории покупок
- Личный кабинет

## 📱 Основные экраны

- **Авторизация/Регистрация** - вход в систему
- **Главная страница** - обзор системы
- **Каталог товаров** - список всех кроссовок
- **Управление складом** - учет остатков (для Worker/Admin)
- **Панель администратора** - управление системой (для Admin)
- **Профиль пользователя** - личные данные

## 🔧 API Endpoints

### Аутентификация
```
POST /api/user/registration - Регистрация
POST /api/user/login       - Авторизация
GET  /api/user/auth        - Проверка токена
```

### Товары
```
GET    /api/device         - Получить все товары
POST   /api/device         - Создать товар (Admin/Worker)
PUT    /api/device/:id     - Обновить товар (Admin/Worker)
DELETE /api/device/:id     - Удалить товар (Admin)
```

### Категории и бренды
```
GET  /api/type    - Получить категории
POST /api/type    - Создать категорию (Admin)
GET  /api/brand   - Получить бренды
POST /api/brand   - Создать бренд (Admin)
```

## 🔐 Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены для аутентификации
- Middleware для проверки ролей
- Валидация данных на сервере
- CORS настройки для безопасности

## 📊 Особенности реализации

### State Management
Использует MobX для управления состоянием:
- UserStore - данные пользователя
- DeviceStore - товары и каталог
- Реактивные обновления интерфейса

### База данных
Модели Sequelize с отношениями:
- User ↔ Role (многие ко многим)
- Device ↔ Type/Brand (один ко многим)
- Автоматические миграции

### Файловая система
- Загрузка изображений товаров
- Express-fileupload для обработки файлов
- UUID для уникальных имен файлов

## 🎯 Планы по развитию

- [ ] Система уведомлений
- [ ] Экспорт отчетов в Excel/PDF
- [ ] Мобильная версия
- [ ] Интеграция с платежными системами
- [ ] Расширенная аналитика

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект создан в учебных целях.

## 📞 Контакты

**Дмитрий Камков**
- Telegram: [@dkamkov](https://t.me/dkamkov)
- Email: dmitry.kamkov@gmail.com
- LinkedIn: [dmitry-kamkov](https://linkedin.com/in/dmitry-kamkov-288a52385)

---

<div align="center">

**⭐ Если проект показался интересным - поставьте звездочку!**

*Создано с ❤️ для изучения fullstack разработки*

</div>