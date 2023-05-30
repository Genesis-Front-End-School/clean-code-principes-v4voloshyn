# GFS App (Online courses)

## 🚀 Current version of the app you can see here: [Live App on Vercel](https://gfs-app.vercel.app/)

## 🔴Warn👇👇👇

### To ensure correct functioning of the application you need to download this extension: [Home page](https://mybrowseraddon.com/access-control-allow-origin.html) to allow CORS access to the API of the App. This extension available for [Google Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) | [Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/) | [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/bhjepjpgngghppolkjdhckmnfphffdag)

<br/>

> 💡**NOTE**: The current version of the [Live App](https://gfs-app.vercel.app/) does not always match the main (production) branch, as it is synchronized with some functionality lagging (or leading) with the other repository. [Live App](https://gfs-app.vercel.app/) may contain some experimental features that have not been fully or well tested or may be under continuous development, as for example, the Chat module on WebSockets.

<br/>

#### 📝 **TODO**:

- ✅ Router navigation with:
- - ✅ Layout
- - ✅ Home page with Courses List and Pagination
- - ✅ Single Course page
  <hr/>
- ✅ Layout with:
- - ✅ Header
- - ✅ Main block
- - ✅ Footer
  <hr/>
- ✅ Course Card with:
- - ✅ Image
- - ✅ Title
- - ✅ Count of lessons, rating and skills list
- - ✅ Footer
  - \*Extra:
    - ✅ Playing video on image hover
    <hr/>
- ⬜ Single Course page:
- - ✅ Video frame with videoSrc
- - ✅ Lessons list
- - ✅ Course description
- - ⬜ Save video playing progress
- - ⬜ Save lessons learning progress
  - \*Extra:
  - ⬜ PIP (Picture-In-Picture) in right bottom corner
  - ⬜ Changing video playing speed (use any keyCode)
    - ⬜ Put this information in video frame

  <hr/>

⭕ **ADDITIONAL TASKS:**

- ✅ Handle API errors (network, Page 404 etc )
  - ✅ Create @ErrorComponent on every or one @RootComponent to intercept Error throwing
- ✅ Mobile adaptive
- ✅ \*Video loading animation + / -
- ✅ Test Coverage
- ✅ Fake chat on WS

<hr/>

## UA:

Додаток містить дві сторінки:

- сторінка з курсами;
- сторінка з переглядом курсу;

Детально про сторінки:

- В стрічці з курсами необхідно відобразити останні 10 курсів. Курс містить:
  - Фото курсу.
  - Заголовок курсу.
  - Кількість уроків, навички та рейтинг.
  - На сторінці виводимо 10 курсів і додаємо пагінацію.
  - Додатково:
    - при ховері відтворювати відео без звуку.
- На сторінці з переглядом курсу відображається перше відео з даного курсу, деталі про курс та список уроків:
  - При кліку на урок (якщо він не заблокований) для перегляду відкриється поточне відео, користувач повинен розуміти, який урок з курсу переглядає.
  - Необхідно зберігати прогрес перегляду відео та уроку курсу (зберігати локально).
  - Якщо урок заблокований показати це користувачу.
  - Додатково:
    1. Зробити функціонал picture in picture (без сторонніх бібліотек):
       - Відео можна вивести поверх сторінки при кліку. При цьому відео знаходиться у правому нижньому куті сторінки й можна ходити по інших сторінках.
    2. Додати зміну швидкості програвання відео через клавіатуру (без сторонніх бібліотек) (комбінація клавіш на власний розсуд):
       - Так же вивести інформацію біля відео як цим користуватись.

Додаткові завдання:

- пропрацювати помилки від API (помилка мережі, ...);
- адаптив під мобільну версію;
- анімація завантаження відео;
- код покритий тестами;
