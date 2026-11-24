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
Щоб змінити адресу, скопіюйте `.env.example` у `.env.local` і змініть `API_URL`.

## Структура проєкту

```
app/
  (main)/                  сторінки з сайдбаром і хлібними крихтами
    page.tsx               /            — Мій день
    journey/[weekNumber]/  /journey/16  — Подорож
    diary/                 /diary       — Щоденник
    diary/[entryId]/       /diary/:id   — запис (мобілка/планшет)
    profile/               /profile     — Профіль
  (auth)/                  сторінки без сайдбару
    auth/[authType]/       /auth/login, /auth/register
    profile/edit/          /profile/edit — онбординг
  api/[...path]/route.ts   проксі до бекенду (cookie з токенами живуть на нашому домені)
components/                кожен компонент у своїй папці: Name.tsx + Name.module.css
hooks/                     власні хуки
public/
  logo.svg                 логотип
  sprite.svg               іконки з макету (спрайт)
  images/                  ілюстрації для auth, онбордингу і заглушка аватара
lib/api/clientApi.ts       усі запити до API
lib/store/authStore.ts     Zustand-стор користувача
middleware.ts              захист приватних сторінок і оновлення сесії
types/                     TypeScript-типи даних з бекенду
```

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

Бекенд зберігає `accessToken` і `refreshToken` у cookie. Браузер ходить на `/api/...` нашого ж сайту, а `app/api/[...path]/route.ts` пересилає запит на бекенд разом із cookie.
`middleware.ts` не пускає незалогінених на `/journey`, `/diary` і `/profile`, а залогінених — на `/auth/*`. Якщо access-токен прострочився, middleware сам оновлює сесію.
`AuthProvider` при завантаженні сторінки отримує поточного користувача і кладе його в `useAuthStore`.

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
