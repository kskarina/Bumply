# Лелека 🕊️

Командний проєкт команди **Bumply**.

🔗 **Жива сторінка:** [bumply-sage.vercel.app](https://bumply-sage.vercel.app)

**Лелека** — вебзастосунок-помічник для майбутніх мам. Він допомагає стежити за перебігом вагітності тиждень за тижнем: показує, як розвивається малюк, що відбувається з тілом мами, дає щоденні поради, нагадує про важливі справи і дозволяє вести особистий щоденник самопочуття.

## Можливості

- **Мій день** — привітання, поточний тиждень, скільки днів до зустрічі, малюк сьогодні, порада дня, завдання і нагадування
- **Подорож** — інтерактивний календар вагітності з інформацією про розвиток малюка і стан мами на кожному тижні
- **Щоденник** — записи про самопочуття з емоціями: створення, редагування, видалення
- **Профіль** — зміна даних, аватара, планової дати пологів і статі дитини
- **Реєстрація, вхід і онбординг**

## Технології

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- CSS Modules, [modern-normalize](https://github.com/sindresorhus/modern-normalize)
- [Zustand](https://zustand.docs.pmnd.rs/) — стан авторизації
- [TanStack Query](https://tanstack.com/query) — запити і кешування даних
- [Axios](https://axios-http.com/)
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) — форми і валідація
- [react-hot-toast](https://react-hot-toast.com/) — сповіщення

Бекенд: [lehlehka.b.goit.study/api-docs](https://lehlehka.b.goit.study/api-docs)
Макет: Figma · ТЗ: Google Sheets

## Запуск локально

Потрібен Node.js 20 або новіший.

```bash
git clone https://github.com/kskarina/Bumply.git
cd Bumply
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

Інші команди:

```bash
npm run build   # продакшн-збірка
npm run start   # запуск зібраного проєкту
npm run lint    # перевірка ESLint
```

### Змінні оточення

Не обов'язкові. За замовчуванням використовується бекенд `https://lehlehka.b.goit.study`.
Щоб змінити адреси, скопіюйте `.env.example` у `.env.local` і змініть `NEXT_PUBLIC_API_URL` або `BACKEND_URL`.

## Структура проєкту

```
app/
  page.tsx                       /             — Мій день (DashboardPage)
  layout.tsx                     провайдери + загальний макет (меню, хлібні крихти)
  loading.tsx, not-found.tsx
  (private routes)/              сторінки тільки для залогінених
    journey/[weekNumber]/        /journey/16   — Подорож
    diary/                       /diary        — Щоденник
    diary/[entryId]/             /diary/:id    — запис (мобілка/планшет)
    profile/                     /profile      — Профіль
    profile/edit/                /profile/edit — онбординг
  (auth routes)/                 сторінки без меню
    auth/[authType]/             /auth/login, /auth/register
  api/                           route handlers: запити до бекенду через наш сервер
    api.ts                       axios для бекенду
    _utils/utils.ts              обробка помилок і cookie
    auth/ users/ tasks/ diary/ emotions/ weeks/
components/                      кожен компонент у своїй папці: Name.tsx + Name.module.css
hooks/                           власні хуки
lib/
  api/api.ts                     axios для запитів з браузера (на /api)
  api/clientApi.ts               усі запити з клієнтських компонентів
  api/serverApi.ts               запити з серверних компонентів (з cookie)
  store/authStore.ts             Zustand-стор користувача
middleware.ts                    захист приватних сторінок і оновлення сесії
public/
  logo.svg, sprite.svg           логотип та іконки з макету
  images/                        ілюстрації для auth, онбордингу і заглушка аватара
types/                           типи: user, task, diary, emotion, week, common
```

Стилі сторінки лежать поруч із нею й називаються за сторінкою: `DashboardPage.module.css`, `DiaryPage.module.css` тощо.
Код форматуємо Prettier за `.prettierrc.json`.

### Кольори, шрифти і типографіка

Усі кольори, заокруглення і стилі тексту з UI Kit — у `app/globals.css`. Використовуйте змінні, а не конкретні значення:

| Змінна | Значення | Де використовується |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | фон сторінки, сайдбару, модалок |
| `--color-surface` | `#fff4f6` | картки і блоки, активний пункт меню |
| `--color-surface-alt` | `#ffdae0` | кнопки |
| `--color-accent` | `#ffcbd3` | наведення, акценти |
| `--color-text` / `--color-text-secondary` | `#000` / `rgba(0,0,0,.6)` | текст |
| `--color-border` | `rgba(0,0,0,.15)` | рамки і роздільники |
| `--color-error` | `#c60000` | помилки валідації |
| `--radius-xs` / `--radius-sm` / `--radius` / `--radius-lg` / `--radius-pill` | 8 / 24 / 32 / 40 / 100px | заокруглення |

Шрифти: **Lato** (основний текст, 400/500/600/700, з кирилицею, підключений локально з `app/fonts`) і **Comfortaa Bold** (заголовки `h1`–`h4`).
Готові класи розмірів: `display-xxl` … `display-xs` для заголовків і `text-lg`, `text-md`, `text-sm`, `text-xs` для тексту.

### Іконки, логотип і зображення

Іконки підключаються через компонент `Icon`, колір змінюється через CSS-властивість `color`:

```tsx
import Icon from '@/components/Icon/Icon';

<Icon name="edit-square" size={24} />
```

Доступні іконки: `account-circle`, `book-2`, `chair`, `close`, `conversion-path`, `delete-forever`, `edit-square`, `fitness-center`, `fork-spoon`, `google`, `keyboard-arrow-down`, `keyboard-arrow-up`, `logout`, `menu`, `today`.

Логотип — компонент `Logo` (посилання на головну).
Зображення з `public/images` підключаються через `next/image`:

```tsx
<Image src="/images/auth-login.webp" alt="" width={720} height={900} />
```

| Файл | Де використовується |
| --- | --- |
| `auth-register.webp` | сторінка реєстрації |
| `auth-login.webp` | сторінка входу |
| `onboarding.webp` | онбординг |
| `avatar-placeholder.webp` | аватар за замовчуванням |

Ілюстрації тижнів (малюк, авокадо тощо) приходять з бекенду, у проєкт їх додавати не потрібно.

### Як працює авторизація

Бекенд зберігає `accessToken` і `refreshToken` у cookie. Браузер ходить на `/api/...` нашого ж сайту (route handlers у `app/api`), а вони звертаються до бекенду з cookie користувача і зберігають нові cookie на нашому домені.
`middleware.ts` не пускає незалогінених на `/journey`, `/diary` і `/profile`, а залогінених — на `/auth/*`. Якщо access-токен прострочився, middleware сам оновлює сесію.
`AuthProvider` при завантаженні сторінки перевіряє сесію (`checkSession`), отримує поточного користувача (`getMe`) і кладе його в `useAuthStore`.

## Робота в команді

1. Перед початком роботи завжди підтягуйте свіжий `main`:
   ```bash
   git checkout main
   git pull
   ```
2. Для кожної задачі створюйте окрему гілку:
   ```bash
   git checkout -b feature/назва-компонента
   ```
3. Робіть невеликі коміти з зрозумілими повідомленнями.
4. Пушніть гілку і відкрийте Pull Request у `main`. Тімлід переглядає і зливає PR.
5. Не пушимо напряму в `main`.
6. Перед PR перевірте, що `npm run lint` і `npm run build` проходять без помилок.

## Команда

| Учасник | Роль |
| --- | --- |
| Karina ([@kskarina](https://github.com/kskarina)) | Team Lead |
| Danylo Linhe ([@Rik24](https://github.com/Rik24)) | Scrum Master |
| [@DarkReud](https://github.com/DarkReud) | Developer |
| Roman Drok ([@rookglli](https://github.com/rookglli)) | Developer |
| Orest Yarych ([@orest-yarych](https://github.com/orest-yarych)) | Developer |
| [@OleksandrTry1](https://github.com/OleksandrTry1) | Developer |
| Andrii Kushnirenko ([@akushnirenko10](https://github.com/akushnirenko10)) | Developer |
