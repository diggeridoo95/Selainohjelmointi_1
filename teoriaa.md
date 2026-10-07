# Full Stack Open - kertaus

Tämä on tiivis omasanaisen muistiinpano Full Stack Openin osista 1-2 ja osan 3 aiheesta **Node.js ja Express**. Esimerkeissä käytetään muistiinpanosovellusta, koska sama rakenne toistuu kurssin tehtävissä.

## 1. JavaScriptin perusteet

### Muuttujat ja tietotyypit

`const` on oletus. Sitä käytetään, kun muuttujan sidosta ei sijoiteta uudelleen. `let` sopii tilanteeseen, jossa sidoksen arvo vaihtuu. `var` on vanhempi tapa, jota uusissa ohjelmissa yleensä vältetään.

```js
const name = "Ada";
let count = 0;
count = count + 1;

const isReady = true;
const nothing = null;
```

Tavallisia tyyppejä ovat merkkijono, numero, totuusarvo, `null`, `undefined`, taulukko ja olio. JavaScriptissä taulukot ja oliot ovat viitetyyppejä.

### Funktiot

Funktio voi ottaa parametreja ja palauttaa arvon. Nuolifunktio on lyhyt tapa kirjoittaa funktio.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

const double = (number) => number * 2;

greet("Ada");
double(4); // 8
```

Jos nuolifunktion rungossa ei ole aaltosulkeita, lausekkeen arvo palautetaan automaattisesti. Aaltosulkeilla tarvitaan `return`.

### Taulukot ja oliot

```js
const note = {
  id: 1,
  content: "Opiskele Reactia",
  important: true,
};

console.log(note.content);
console.log(note["content"]);

const notes = [note, { id: 2, content: "Kertaa Express" }];
```

Destructuring tekee arvojen poimimisesta lyhyempää:

```js
const { content, important } = note;
const [firstNote, secondNote] = notes;
```

Spread-syntaksilla voidaan tehdä uusi olio tai taulukko vanhan pohjalta:

```js
const updatedNote = { ...note, important: false };
const moreNotes = [...notes, { id: 3, content: "Tee tehtäviä" }];
```

### Taulukkometodit

Taulukkometodit eivät yleensä muuta alkuperäistä taulukkoa. Ne palauttavat uuden arvon.

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map((number) => number * 2);
const bigNumbers = numbers.filter((number) => number > 2);
const found = numbers.find((number) => number === 3);

// doubled: [2, 4, 6, 8]
// bigNumbers: [3, 4]
// found: 3
```

`map` tekee uuden alkion jokaisesta vanhasta alkiosta. `filter` pitää alkiot, joiden ehto on tosi. `find` palauttaa ensimmäisen osuman tai `undefined`.

### Ehdot ja totuusarvot

```js
if (note.important) {
  console.log("Tärkeä muistiinpano");
} else {
  console.log("Tavallinen muistiinpano");
}

const label = note.important ? "Tärkeä" : "Tavallinen";
```

Käytä vertailussa yleensä `===`-operaattoria. `&&` suorittaa oikean puolen vain, jos vasen puoli on tosi:

```js
note.important && <strong>Tärkeä</strong>;
```

### Promiset ja async/await

Asynkroninen operaatio valmistuu myöhemmin ja palauttaa usein Promisen. `then` käsittelee onnistumisen ja `catch` virheen.

```js
getNotes()
  .then((notes) => setNotes(notes))
  .catch((error) => console.log(error));
```

Sama `async/await`-syntaksilla:

```js
const loadNotes = async () => {
  try {
    const notes = await getNotes();
    setNotes(notes);
  } catch (error) {
    console.log(error);
  }
};
```

`await` toimii `async`-funktion sisällä ja pysäyttää vain kyseisen funktion odottamaan Promisen valmistumista.

## 2. React

React-käyttöliittymä koostuu komponenteista. Komponentti on yleensä funktio, joka palauttaa JSX:ää.

```jsx
const Header = ({ name }) => {
  return <h1>{name} muistiinpanot</h1>;
};

const App = () => {
  return <Header name="Ada" />;
};
```

JSX näyttää HTML:ltä, mutta se on JavaScriptin sisällä oleva syntaksi. JavaScript-lausekkeet kirjoitetaan aaltosulkeiden sisään.

```jsx
<h1>{title}</h1>
<p className="important">{note.content}</p>
```

JSX:ssä käytetään `className`-attribuuttia `class`-attribuutin sijasta. Komponentin nimen pitää alkaa isolla kirjaimella.

### Propsit

Propsit välittävät tietoa vanhemmalta komponentilta lapsikomponentille. Lapsi ei muuta propsia suoraan.

```jsx
const Note = ({ note, onToggleImportant }) => {
  return (
    <li>
      {note.content}
      <button onClick={() => onToggleImportant(note.id)}>
        {note.important ? "Tavallinen" : "Tärkeä"}
      </button>
    </li>
  );
};
```

### State ja tapahtumat

`useState` palauttaa nykyisen tilan sekä setterifunktion. Setterin kutsuminen saa komponentin renderöitymään uudelleen.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Klikattu {count} kertaa</button>
  );
};
```

Taulukkoa ei muuteta suoraan esimerkiksi `push`-metodilla. Luodaan uusi taulukko:

```js
setNotes(notes.concat(newNote));
setNotes([...notes, newNote]);
```

Kun uusi tila riippuu vanhasta tilasta, setterin funktionaalinen muoto on turvallinen:

```js
setCount((previousCount) => previousCount + 1);
```

### Tapahtumankäsittely

Tapahtumakäsittelijälle annetaan funktio, ei funktion kutsua:

```jsx
// oikein
<button onClick={handleClick}>Lisää</button>

// väärin: kutsuu funktion heti renderöinnin aikana
<button onClick={handleClick()}>Lisää</button>
```

Tapahtumaobjektista voidaan lukea esimerkiksi lomakkeen arvo:

```jsx
const handleChange = (event) => {
  setNewNote(event.target.value);
};

<input value={newNote} onChange={handleChange} />;
```

Tämä on kontrolloitu input: Reactin state on kentän todellinen arvo.

### Lomakkeet

Lomakkeen oletustoiminto estetään `preventDefault`-kutsulla. Muuten selain yrittäisi ladata sivun uudelleen.

```jsx
const addNote = (event) => {
  event.preventDefault();

  const noteObject = {
    content: newNote,
    important: false,
  };

  createNote(noteObject);
  setNewNote("");
};

return (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleChange} />
    <button type="submit">Lisää</button>
  </form>
);
```

### Listat ja ehdollinen renderöinti

`map` renderöi komponentin jokaiselle alkiolle. Jokaisella listan alkiolla pitää olla vakaa ja yksilöllinen `key`.

```jsx
{
  notes.map((note) => <Note key={note.id} note={note} />);
}
```

Key auttaa Reactia vertaamaan vanhaa ja uutta listaa. Tietokannan id on yleensä hyvä key. Taulukon indeksiä kannattaa välttää, jos lista voi muuttua.

Ehdollinen sisältö voidaan kirjoittaa ternary-operaattorilla tai `&&`-operaattorilla:

```jsx
{
  showAll ? notes : notes.filter((note) => note.important);
}
{
  notes.length === 0 && <p>Ei muistiinpanoja</p>;
}
```

### useEffect ja palvelimelta haettava data

`useEffect` suorittaa sivuvaikutuksen renderöinnin jälkeen. Tyhjä riippuvuustaulukko tarkoittaa, että effect suoritetaan kerran komponentin alussa.

```jsx
import { useEffect, useState } from "react";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  return notes.map((note) => <Note key={note.id} note={note} />);
};
```

Riippuvuudet määräävät, milloin effect suoritetaan uudelleen:

```jsx
useEffect(() => {
  // suoritetaan, kun selectedId muuttuu
}, [selectedId]);
```

Yleinen virhe on tehdä palvelinkutsu suoraan komponentin rungossa. Se voi aiheuttaa uuden kutsun jokaisella renderöinnillä. Sijoita kutsu `useEffect`-funktioon.

## 3. HTTP, REST ja axios

Frontend ja backend keskustelevat HTTP-pyyntöjen avulla. RESTissä resurssilla on URL ja HTTP-metodi kuvaa tehtävää.

| Metodi | Tarkoitus         | Esimerkki             |
| ------ | ----------------- | --------------------- |
| GET    | Hae resursseja    | `GET /api/notes`      |
| POST   | Luo uusi resurssi | `POST /api/notes`     |
| PUT    | Päivitä resurssi  | `PUT /api/notes/1`    |
| DELETE | Poista resurssi   | `DELETE /api/notes/1` |

Axios-palvelu voidaan pitää erillisessä tiedostossa:

```js
import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((response) => response.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };
```

Komponentti voi päivittää tilan vastauksen perusteella:

```js
noteService.create(noteObject).then((returnedNote) => {
  setNotes(notes.concat(returnedNote));
});
```

Palvelimen vastaus sisältää usein uuden resurssin tietokantatunnisteen. Siksi frontendin kannattaa käyttää palvelimen palauttamaa objektia.

### HTTP-statuskoodit

- `200 OK`: pyyntö onnistui
- `201 Created`: uusi resurssi luotiin
- `204 No Content`: onnistui, mutta vastausrunkoa ei ole
- `400 Bad Request`: pyyntö on virheellinen
- `404 Not Found`: resurssia ei löydy
- `500 Internal Server Error`: palvelimella tapahtui virhe

## 4. Node.js

Node.js mahdollistaa JavaScriptin suorittamisen selaimen ulkopuolella, esimerkiksi palvelimella. npm on Node-projektien pakettienhallinta.

Projektin `package.json` sisältää riippuvuudet ja komennot:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

Paketti asennetaan komennolla:

```bash
npm install express
```

`npm install` lukee `package.json`-tiedoston ja asentaa riippuvuudet `node_modules`-kansioon. `node_modules`-kansiota ei yleensä viedä Gitiin.

## 5. Express

Expressillä luodaan Node-palvelin ja sen reitit.

```js
const express = require("express");
const app = express();

app.use(express.json());

let notes = [{ id: 1, content: "Opiskele Expressiä", important: true }];

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

`express.json()` on middleware. Se lukee JSON-muotoisen request bodyn ja tekee siitä olion `request.body`-propertyyn.

### Parametrit ja yksi resurssi

URL-parametri luetaan `request.params`-oliosta:

```js
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
```

`request.params.id` on merkkijono, joten se muutetaan numeroksi, jos id:t ovat numeroita.

### POST ja validointi

```js
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important),
    id: Math.floor(Math.random() * 1000000),
  };

  notes = notes.concat(note);
  response.status(201).json(note);
});
```

`return` virhevastauksen yhteydessä estää handlerin jatkumisen ja toisen vastauksen lähettämisen.

### DELETE, PUT ja middleware

```js
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return response.status(404).end();
  }

  const updatedNote = { ...note, important: request.body.important };
  notes = notes.map((item) => (item.id === id ? updatedNote : item));
  response.json(updatedNote);
});
```

Middleware-funktiolla on yleensä kolme parametria: `request`, `response` ja `next`. Kun middleware on valmis eikä lähetä vastausta, se kutsuu `next()`.

```js
const requestLogger = (request, response, next) => {
  console.log(request.method, request.path, request.body);
  next();
};

app.use(requestLogger);
```

Middlewarejen järjestys on tärkeä. Esimerkiksi JSON-parserin pitää olla ennen reittiä, joka käyttää `request.body`-arvoa.

### Virheenkäsittely

Tuntematon reitti voidaan käsitellä lopussa:

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
```

Virheenkäsittelymiddleware tunnistetaan neljästä parametrista:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
```

Tuntemattoman endpointin ja error handlerin pitää olla reittien jälkeen, jotta aiemmat reitit ehtivät käsitellä pyynnön.

## 6. Frontendin ja backendin yhdistäminen

Kehityksessä frontend ja backend voivat olla eri porteissa. Selain näkee eri portit eri alkuperinä. Vite-proxy voi ohjata frontendin `/api`-pyynnöt backendille.

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
```

Frontend voi kutsua tällöin suhteellista osoitetta:

```js
axios.get("/api/notes");
```

Tuotannossa palvelin voi tarjota myös frontendin buildatut tiedostot. Vaihtoehtoisesti frontend ja backend deployataan erikseen, jolloin CORS-asetukset ja ympäristömuuttujat pitää huomioida.

## 7. Kokonainen pieni esimerkki

### Backend

```js
const express = require("express");
const app = express();

app.use(express.json());

let notes = [];

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.post("/api/notes", (request, response) => {
  const { content } = request.body;

  if (!content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    id: Date.now(),
    content,
    important: false,
  };

  notes = notes.concat(note);
  response.status(201).json(note);
});

app.listen(3001);
```

### React-frontend

```jsx
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("/api/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = { content: newNote };

    axios.post("/api/notes", noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  return (
    <>
      <h1>Muistiinpanot</h1>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">Lisää</button>
      </form>
      {notes.map((note) => (
        <p key={note.id}>{note.content}</p>
      ))}
    </>
  );
};
```

Tässä kokonaisuudessa tapahtuu seuraavaa:

1. React suorittaa `useEffect`-kutsun ja hakee muistiinpanot.
2. Expressin GET-reitti palauttaa JSON-taulukon.
3. React tallentaa vastauksen stateen ja renderöi listan.
4. Lomake tekee POST-pyynnön uuden muistiinpanon lisäämiseksi.
5. Backend luo id:n ja palauttaa uuden muistiinpanon.
6. Frontend lisää palvelimen palauttaman objektin omaan stateensa.

## 8. Tentissä muistettavaa

- React-komponentti palauttaa JSX:ää ja komponentin nimi alkaa isolla kirjaimella.
- Props kulkee vanhemmalta lapselle. Statea muutetaan setterifunktiolla.
- Listaa renderöidessä käytä vakaata `key`-arvoa.
- Älä muuta state-taulukkoa suoraan, vaan luo uusi taulukko `concat`illa tai spread-syntaksilla.
- Lomakkeessa käytä `event.preventDefault()`-kutsua.
- Palvelinkutsu sijoitetaan yleensä `useEffect`-funktioon.
- `request.body` toimii vasta, kun `express.json()` on otettu käyttöön.
- `request.params` sisältää URL-parametrit ja `request.query` kyselyparametrit.
- Muista muuttaa URL:n merkkijono-id numeroksi, jos data käyttää numeroita.
- Lähetä jokaiselle pyynnölle yksi vastaus. `return` auttaa lopettamaan handlerin virhetilanteessa.
- Middlewarejen järjestys vaikuttaa siihen, mitä tietoa reitit saavat.
- `GET` hakee, `POST` luo, `PUT` päivittää ja `DELETE` poistaa.
- `200`, `201`, `204`, `400` ja `404` ovat tavallisimpia opeteltavia statuskoodeja.
