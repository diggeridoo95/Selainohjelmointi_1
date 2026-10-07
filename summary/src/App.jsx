import { useMemo, useState } from 'react'
import './App.css'

const topics = [
  {
    id: 'javascript',
    number: '01',
    title: 'JavaScript',
    eyebrow: 'Perusta',
    description: 'Kieli, jolla React-komponenttien toiminta rakennetaan.',
    points: ['const ja let', 'taulukot ja oliot', 'funktiot ja destructuring', 'map, filter ja find', 'promiset ja async/await'],
    code: `const numbers = [1, 2, 3, 4]\n\nconst doubled = numbers.map((number) =>\n  number * 2\n)\n\nconsole.log(doubled)\n// [2, 4, 6, 8]`,
    note: 'map palauttaa uuden taulukon. Alkuperäinen taulukko ei muutu.',
  },
  {
    id: 'react',
    number: '02',
    title: 'React',
    eyebrow: 'Käyttöliittymä',
    description: 'Komponenteista koostuva käyttöliittymä ja sen tila.',
    points: ['komponentit ja propsit', 'useState ja tapahtumat', 'lomakkeet', 'listojen renderöinti', 'ehdollinen renderöinti', 'useEffect ja palvelinkutsut'],
    code: `const [notes, setNotes] = useState([])\n\nconst addNote = (event) => {\n  event.preventDefault()\n  setNotes(notes.concat(newNote))\n}\n\nreturn notes.map((note) => (\n  <Note key={note.id} note={note} />\n))`,
    note: 'Statea muutetaan setterifunktiolla. Älä muuta taulukkoa suoraan push-metodilla.',
  },
  {
    id: 'requests',
    number: '03',
    title: 'HTTP & REST',
    eyebrow: 'Data',
    description: 'Selain hakee ja muuttaa tietoa palvelimella HTTP-pyyntöjen avulla.',
    points: ['GET, POST, PUT ja DELETE', 'axios ja fetch', 'JSON-data', 'statuskoodit', 'useEffect lataamiseen'],
    code: `useEffect(() => {\n  noteService\n    .getAll()\n    .then(initialNotes => {\n      setNotes(initialNotes)\n    })\n}, [])`,
    note: 'Tyhjä riippuvuustaulukko tarkoittaa, että effect suoritetaan komponentin ensimmäisen renderöinnin jälkeen.',
  },
  {
    id: 'backend',
    number: '04',
    title: 'Node & Express',
    eyebrow: 'Palvelin',
    description: 'Yksinkertainen backend, joka tarjoaa REST-rajapinnan.',
    points: ['Node.js ja npm', 'Express-sovellus', 'reitit', 'middleware', 'CORS ja virheenkäsittely'],
    code: `const express = require('express')\nconst app = express()\n\napp.use(express.json())\n\napp.get('/api/notes', (request, response) => {\n  response.json(notes)\n})\n\napp.listen(3001)`,
    note: 'express.json() lukee pyynnön JSON-rungon ja muuttaa sen JavaScript-olioksi request.bodyyn.',
  },
  {
    id: 'fullstack',
    number: '05',
    title: 'Yhdistäminen',
    eyebrow: 'Full stack',
    description: 'Frontend ja backend keskustelevat selkeän rajapinnan kautta.',
    points: ['proxy kehityksessä', 'ympäristömuuttujat', 'frontendin palvelukutsut', 'virhetilanteet', 'deployn perusidea'],
    code: `// frontend: services/notes.js\nconst getAll = () =>\n  axios.get('/api/notes')\n\n// backend\napp.use('/api/notes', notesRouter)`,
    note: 'Pidä palvelukutsut omassa service-moduulissa. Komponentin tehtävä on näyttää data ja käsitellä käyttäjän toiminta.',
  },
]

const questions = [
  { question: 'Miksi listan jokaisella React-elementillä pitää olla key-prop?', answer: 'React käyttää key-arvoa tunnistaakseen, mikä listan alkio muuttui, poistui tai lisättiin. Sen pitää olla vakaa ja yksilöllinen.' },
  { question: 'Mitä express.json() tekee?', answer: 'Se on middleware, joka jäsentää JSON-muotoisen request bodyn ja tekee siitä JavaScript-olion request.body-propertyyn.' },
  { question: 'Mitä eroa on GET- ja POST-pyynnöillä?', answer: 'GET hakee resurssin palvelimelta. POST lähettää palvelimelle uuden resurssin luotavaksi, yleensä request bodyn avulla.' },
  { question: 'Miksi statea ei pidä muuttaa suoraan?', answer: 'React tarvitsee setterin kautta tiedon muutoksesta, jotta komponentti renderöidään uudelleen. Käytä esimerkiksi setNotes(notes.concat(note)).' },
  { question: 'Mihin useEffect sopii?', answer: 'Renderöinnin ulkopuolisiin sivuvaikutuksiin, kuten palvelinkutsuihin. Riippuvuustaulukko määrää, milloin effect suoritetaan uudelleen.' },
  { question: 'Mitä propsit ovat Reactissa?', answer: 'Propsit ovat komponentille ylhäältä päin välitettäviä arvoja. Lapsikomponentti lukee niitä, mutta ei muuta propsia suoraan.' },
  { question: 'Mitä eroa on const- ja let-muuttujilla?', answer: 'Molempia voi käyttää lohkotason muuttujina. const-sidosta ei voi sijoittaa uudelleen, let-sidoksen arvo voidaan vaihtaa.' },
  { question: 'Mitä filter-metodi palauttaa?', answer: 'filter palauttaa uuden taulukon niistä alkioista, joille annettu ehtofunktio palauttaa truen. Alkuperäinen taulukko säilyy ennallaan.' },
  { question: 'Mitä HTTP-statuskoodi 404 tarkoittaa?', answer: 'Palvelin ei löytänyt pyydettyä resurssia. Muita tavallisia koodeja ovat 200 onnistumiselle, 201 luomiselle ja 400 virheelliselle pyynnölle.' },
  { question: 'Miksi event.preventDefault() tarvitaan lomakkeessa?', answer: 'Se estää selaimen oletustoiminnon, joka yleensä lähettäisi lomakkeen ja lataisi sivun uudelleen. Sen jälkeen React voi käsitellä datan itse.' },
  { question: 'Mitä REST-rajapinnan resurssi tarkoittaa?', answer: 'Resurssi on palvelimella käsiteltävä asia, kuten note. Sillä on yleensä URL, esimerkiksi /api/notes, ja HTTP-metodit kuvaavat toiminnon.' },
  { question: 'Mitä middleware tarkoittaa Expressissä?', answer: 'Middleware on funktio, joka suoritetaan pyynnön ja vastauksen käsittelyn välissä. Se voi esimerkiksi lokittaa pyynnön tai tarkistaa autentikoinnin.' },
  { question: 'Miksi async/await helpottaa palvelinkutsuja?', answer: 'Se tarjoaa promisen käsittelyyn synkronisen näköisen syntaksin. await odottaa promisen valmistumista async-funktion sisällä.' },
  { question: 'Mitä CORS-ongelma tarkoittaa?', answer: 'Selain estää pyynnön eri alkuperään, jos palvelin ei salli sitä CORS-otsakkeilla. Kehityksessä ongelmaa voidaan usein helpottaa Vite-proxylla.' },
  { question: 'Miksi komponentti kannattaa jakaa pienempiin komponentteihin?', answer: 'Pienet komponentit ovat helpompia lukea, testata ja käyttää uudelleen. Jokaisella komponentilla voi olla selkeä oma vastuunsa.' },
]

function App() {
  const [activeTopic, setActiveTopic] = useState('javascript')
  const [view, setView] = useState('summary')
  const [search, setSearch] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const selectedTopic = topics.find((topic) => topic.id === activeTopic) ?? topics[0]
  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return topics
    return topics.filter((topic) => `${topic.title} ${topic.description} ${topic.points.join(' ')}`.toLowerCase().includes(query))
  }, [search])

  const selectTopic = (topicId) => {
    setActiveTopic(topicId)
    setView('summary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextQuestion = () => {
    setQuestionIndex((index) => (index + 1) % questions.length)
    setShowAnswer(false)
  }

  const previousQuestion = () => {
    setQuestionIndex((index) => (index - 1 + questions.length) % questions.length)
    setShowAnswer(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setView('summary')}>
          <span className="brand-mark">FS</span>
          <span><strong>Full Stack</strong><small>tenttikertaus</small></span>
        </a>
        <nav className="top-nav" aria-label="Päänavigaatio">
          <button className={view === 'summary' ? 'active' : ''} onClick={() => setView('summary')}>Yhteenveto</button>
          <button className={view === 'practice' ? 'active' : ''} onClick={() => setView('practice')}>Harjoittele</button>
        </nav>
        <span className="chapter-tag">FSo 1–2 + 3a</span>
      </header>

      {view === 'summary' ? (
        <>
          <section className="intro" id="top">
            <div>
              <p className="kicker">Pikaopas tenttiin</p>
              <h1>Full Stack Open<br /><em>pähkinänkuoressa.</em></h1>
              <p className="intro-text">Tärkeimmät ideat JavaScriptistä, Reactista, REST-rajapinnoista ja Express-palvelimista yhdessä paikassa.</p>
            </div>
            <div className="intro-stats"><strong>05</strong><span>aihetta<br />kerrattavana</span></div>
          </section>

          <div className="workspace">
            <aside className="sidebar">
              <div className="search-wrap"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Hae aiheista..." aria-label="Hae aiheista" /></div>
              <p className="side-label">Opintopolku</p>
              <div className="topic-list">
                {filteredTopics.map((topic) => (
                  <button key={topic.id} className={activeTopic === topic.id ? 'topic-link selected' : 'topic-link'} onClick={() => selectTopic(topic.id)}>
                    <span className="topic-number">{topic.number}</span><span><b>{topic.title}</b><small>{topic.eyebrow}</small></span><span className="arrow">→</span>
                  </button>
                ))}
              </div>
              <button className="practice-cta" onClick={() => setView('practice')}><span>✦</span><span><b>Testaa osaamisesi</b><small>{questions.length} kysymystä</small></span>→</button>
            </aside>

            <main className="content">
              <div className="content-heading"><div><p className="kicker">{selectedTopic.number} / {selectedTopic.eyebrow}</p><h2>{selectedTopic.title}</h2></div><span className="topic-counter">{topics.findIndex((topic) => topic.id === activeTopic) + 1} / {topics.length}</span></div>
              <p className="lead">{selectedTopic.description}</p>
              <div className="content-grid">
                <section className="concepts"><h3>Muista nämä</h3><ul>{selectedTopic.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul></section>
                <section className="code-panel"><div className="code-top"><span className="dots"><i></i><i></i><i></i></span><span>esimerkki.js</span></div><pre><code>{selectedTopic.code}</code></pre></section>
              </div>
              <aside className="exam-note"><span className="note-icon">!</span><div><b>Tenttimuistisääntö</b><p>{selectedTopic.note}</p></div></aside>
              <div className="pager"><button disabled={activeTopic === topics[0].id} onClick={() => selectTopic(topics[topics.findIndex((topic) => topic.id === activeTopic) - 1].id)}>← Edellinen</button><button disabled={activeTopic === topics[topics.length - 1].id} onClick={() => selectTopic(topics[topics.findIndex((topic) => topic.id === activeTopic) + 1].id)}>Seuraava →</button></div>
            </main>
          </div>
        </>
      ) : (
        <main className="practice-page">
          <p className="kicker">Aktiivinen kertaus</p><h1>Osaatko perustella?</h1><p className="practice-intro">Vastaa ensin omin sanoin. Paljasta vastaus vasta sen jälkeen ja siirry kysymyksissä eteen- tai taaksepäin.</p>
          <div className="question-card"><div className="question-meta"><span>KYSYMYS {questionIndex + 1} / {questions.length}</span><span className="progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}></i></span></div><h2>{questions[questionIndex].question}</h2>{showAnswer && <div className="answer"><b>Vastaus</b><p>{questions[questionIndex].answer}</p></div>}<div className="question-actions"><button className="previous" onClick={previousQuestion}>← Edellinen</button><button className="reveal" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Piilota vastaus' : 'Näytä vastaus'}</button><button className="next" onClick={nextQuestion}>Seuraava →</button></div></div>
          <button className="back-link" onClick={() => setView('summary')}>← Palaa yhteenvetoon</button>
        </main>
      )}
      <footer><span>Omat muistiinpanot Full Stack Open -aiheista</span><span>React · REST · Express</span></footer>
    </div>
  )
}

export default App
