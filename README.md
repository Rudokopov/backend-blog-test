# [Бэкенд блога для Тестового Задания]()

**Функционал:**

- Регистрация / Аутентификация
- Создавать, редактировать и удалять статьи

**Какие технологии используются:**

- Node JS
- MongoDB
- JWT
- Routes

---

**Инструкция**

# Регистрация нового пользователя

Эндпоинт:
Обязательные поля для заполнения: name, email, password.

- name: должен быть строкой, минимальная длинна 2 символа, максимальная 30.
- email: должен быть строкой, на сервере валидируется на наличие спец.символов, должен быть уникальным.
- password: должен быть строкой, никак не валидируется и не имеет ограничений по длине, хэшируется с помощью технологии bcrypt, не хранится в открытом виде.