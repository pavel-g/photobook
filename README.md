# photobook

Интерактивный конструктор фотокниг

## Установка

Для работы необходимо самостоятельно установить nodejs и mongodb. В mongodb будет использоваться база questionnaire_survey. Если вам важно указать что-то иное, исправьте это в файле server/db.js

```bash
# Распаковка архива:
mkdir photobooks && cd photobooks && unzip ../photobooks.zip

# Установка зависимостей и сборка:
cd server && npm install
cd .. && npm install
webpack

# Запуск:
node run-server.js
```

Теперь можно приготовить демонстрационные данные, перейдя по адресу http://localhost:3000/demo-data/install

Станет доступна учётная запись:<br />
Имя: test<br />
Пароль: 123456
