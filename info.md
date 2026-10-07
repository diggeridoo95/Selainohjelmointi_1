# Selainohjelmointi_1 - nopea kartta

Tämä tiedosto auttaa projektien löytämisessä ja käynnistämisessä toisella tietokoneella.

## 1. Aloitus koulun koneella

Tarkista ensin, että Node.js ja npm ovat asennettuina:

```powershell
node --version
npm --version
```

Siirry projektin juureen:

```powershell
cd C:\Koulu\Selainohjelmointi_1
```

Jos käytät GitHubista kloonattua versiota:

```powershell
git clone <repository-url>
cd Selainohjelmointi_1
git status
```

Asenna riippuvuudet siinä projektikansiossa, jota aiot käyttää. `npm install` tarvitsee tehdä jokaisessa projektissa vain kerran kyseisellä koneella.

```powershell
cd .\summary
npm install
```

Palaa kansiosta juureen näin:

```powershell
cd ..
```

## 2. Kansiorakenne

| Kansio                 | Sisältö                                             |
| ---------------------- | --------------------------------------------------- |
| `teoriaa.md`           | Laaja teoriayhteenveto ja koodiesimerkit            |
| `info.md`              | Tämä projektien pikaopas                            |
| `summary`              | Tenttikertaus, teoria-aiheet ja harjoituskysymykset |
| `part1`                | Reactin ja JavaScriptin perusteita                  |
| `part2`                | Notes-sovellus ja JSON Server -backend              |
| `anekdootit`           | Anekdoottien näyttäminen, äänestäminen ja state     |
| `unicafe`              | Lomakkeet, state ja laskenta                        |
| `kurssitiedot1`        | Kurssien tietojen käsittelyä Reactilla              |
| `kurssitiedot2`        | Kurssitietojen jatkoversio                          |
| `puhelinluettelo1`     | Puhelinluettelo ja JSON Server                      |
| `puhelinluetteloback`  | Puhelinluettelon Express-backend                    |
| `kirjaluettelo`        | Kirjaluettelo Reactilla ja Axiosilla                |
| `kirjaluettelobackend` | Kirjaluettelon Express-backend                      |
| `notesv2`              | Node/Express-muistiinpanoharjoitus                  |
| `requests`             | REST Client -pyyntöjä, esimerkiksi GET-pyyntöjä     |

## 3. Vite-frontendin käynnistäminen

Useimmat frontendit käynnistyvät samalla tavalla. Avaa ensin PowerShell kyseiseen kansioon:

```powershell
cd C:\Koulu\Selainohjelmointi_1\summary
npm install
npm run dev
```

Avaa terminaalin näyttämä osoite selaimessa, yleensä:

```text
http://localhost:5173
```

Sama komento toimii näissä kansioissa:

```text
anekdootit
kirjaluettelo
kurssitiedot1
kurssitiedot2
part1
part2
puhelinluettelo1
summary
unicafe
```

Jokainen käynnissä oleva Vite-projekti tarvitsee oman terminaalinsa. Jos portti `5173` on varattu, Vite näyttää vaihtoehtoisen portin, esimerkiksi `5174`.

## 4. Backendien käynnistäminen

Frontend ja backend käynnistetään eri terminaaleissa.

### Kirjaluettelo

Terminaali 1:

```powershell
cd C:\Koulu\Selainohjelmointi_1\kirjaluettelobackend
npm install
npm start
```

Backend toimii osoitteessa `http://localhost:3001`. Tärkeitä reittejä ovat:

```text
GET    /api/books
GET    /api/books/:id
POST   /api/books
DELETE /api/books/:id
```

Terminaali 2:

```powershell
cd C:\Koulu\Selainohjelmointi_1\kirjaluettelo
npm install
npm run dev
```

### Puhelinluettelo

Backend:

```powershell
cd C:\Koulu\Selainohjelmointi_1\puhelinluetteloback
npm install
npm run dev
```

Frontend toisessa terminaalissa:

```powershell
cd C:\Koulu\Selainohjelmointi_1\puhelinluettelo1
npm install
npm run dev
```

Tärkeä backend-reitti on `http://localhost:3001/api/persons`.

### Notes-sovellus JSON Serverillä

`part2` käyttää projektin omaa `db.json`-tiedostoa ja JSON Serveriä.

Terminaali 1:

```powershell
cd C:\Koulu\Selainohjelmointi_1\part2
npm install
npm run server
```

Terminaali 2:

```powershell
cd C:\Koulu\Selainohjelmointi_1\part2
npm run dev
```

`puhelinluettelo1` voidaan käynnistää samalla tavalla:

```powershell
cd C:\Koulu\Selainohjelmointi_1\puhelinluettelo1
npm install
npm run server
```

## 5. Hyödylliset npm-komennot

```powershell
npm run dev       # Käynnistää kehityspalvelimen
npm run build     # Tekee tuotantobuildin
npm run lint      # Tarkistaa koodin lint-säännöillä
npm run preview   # Esikatselee tehdyn buildin
```

Backend-kansioissa:

```powershell
npm start         # Käynnistää Node/Express-palvelimen
npm run dev       # Käynnistää palvelimen watch-tilassa, jos komento löytyy
```

Pysäytä käynnissä oleva palvelin painamalla terminaalissa `Ctrl + C`.

## 6. Jos projekti ei käynnisty

### `npm` tai `node` ei löydy

Node.js puuttuu tai sitä ei ole lisätty PATH-ympäristömuuttujaan. Tarkista asennus komennoilla `node --version` ja `npm --version`.

### `Cannot find module`

Siirry oikeaan projektikansioon ja asenna riippuvuudet:

```powershell
npm install
```

### Portti on käytössä

Sulje vanha Vite- tai Node-prosessi `Ctrl + C` -näppäinyhdistelmällä tai käytä Viten tarjoamaa vaihtoehtoista porttia.

### Frontend ei saa dataa backendiltä

Tarkista seuraavat:

1. Backend on käynnissä omassa terminaalissaan.
2. Backend käyttää porttia `3001`.
3. Frontendin Axios-osoite käyttää oikeaa reittiä, esimerkiksi `/api/books`.
4. Selaimen Developer Tools -konsolissa ei ole CORS- tai verkkovirhettä.

## 7. Tenttiä varten tärkeimmät projektit

Kun haluat nopeasti kerrata kurssin keskeiset asiat, aloita näistä:

1. `summary` ja `teoriaa.md`: teoria ja käsitteet.
2. `part1`: React-komponentit, propsit, state ja tapahtumat.
3. `part2`: Axios, `useEffect`, JSON Server ja CRUD.
4. `puhelinluettelo1` + `puhelinluetteloback`: frontendin ja Express-backendin yhteys.
5. `kirjaluettelo` + `kirjaluettelobackend`: lomakkeet, Axios, validointi ja CRUD-reitit.

## 8. Gitin tarkistus

Ennen kuin lähdet tenttiin, tarkista että kaikki tarpeelliset tiedostot ovat mukana:

```powershell
cd C:\Koulu\Selainohjelmointi_1
git status
git add .
git commit -m "Update study materials"
git push
```

Älä lisää Gitin mukaan `node_modules`-kansioita. Tarvittaessa riippuvuudet saa asennettua uudella koneella uudelleen komennolla `npm install`.
