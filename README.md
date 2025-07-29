# neshy-site

Сайт для личного Minecraft-сервера, интеграция с Supabase, документация на Fumadocs.

Дев сервер:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

DEV URL для открытия: http://localhost:3000

## Формат .md файлов в доках

Каждый пост/статья должен содержать следующие поля в метаданных:

- title: `string` – заголовок статьи
- description: `string` – описание статьи
- authors?: `string[]` – авторы статьи _(необязательно)_
- ~~cover?: `string` – обложка статьи _(необязательно)_~~ _(нереализовано)_

## Публикация

```bash
# build – сборка,
# start – запуск подготовленного кода

npm run build
npm run start
# or
pnpm build
pnpm start
# or
yarn build
yarn start
```

## API

### auth/\*

Работает через Supabase, поэтому настройте свой `.env` файл.

### user/save

Также требуется настроить подключение к Supabase.

### search/

Работает по умолчанию. Настроен также, как и при инициализации Fumadocs.
