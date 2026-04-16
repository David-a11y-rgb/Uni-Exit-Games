import { useMemo, useState } from 'react';

const EXIT_GAMES = [
  {
    id: 'eg-01',
    titel: 'Das Geheimnis des viktorianischen Zirkus',
    bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    setting: 'Viktorianischer Zirkus',
    schulform: 'Sekundarstufe',
    stoffgebiet: 'Funktionen',
    kurzbeschreibung:
      'Lineare und quadratische Funktionen entschlüsseln die Codetrommel des Zirkusdirektors.',
    link: 'https://example.org/exit-game/zirkus-funktionen'
  },
  {
    id: 'eg-02',
    titel: 'Spurensuche im Zahlenviertel',
    bild: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1200&q=80',
    setting: 'Detektivgeschichte',
    schulform: 'Sekundarstufe',
    stoffgebiet: 'Terme und Gleichungen',
    kurzbeschreibung:
      'Als Mathe-Detektivteam löst die Klasse Gleichungssysteme und findet den Täter.',
    link: 'https://example.org/exit-game/detektiv-gleichungen'
  },
  {
    id: 'eg-03',
    titel: 'Mission Orion: Mathe im Weltraum',
    bild: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    setting: 'Weltraum',
    schulform: 'Grundschule',
    stoffgebiet: 'Geometrie',
    kurzbeschreibung:
      'Geometrische Formen und Körper führen die Crew sicher durch ein Asteroidenfeld.',
    link: 'https://example.org/exit-game/orion-geometrie'
  },
  {
    id: 'eg-04',
    titel: 'Rätsel der versiegelten Grabkammer',
    bild: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
    setting: 'Ägyptische Grabkammer',
    schulform: 'Sekundarstufe',
    stoffgebiet: 'Prozentrechnung',
    kurzbeschreibung:
      'Nur mit Prozentrechnung lässt sich der Sonnencode der Pharaonen entschlüsseln.',
    link: 'https://example.org/exit-game/grabkammer-prozent'
  },
  {
    id: 'eg-05',
    titel: 'Labor Alpha: Formel unter Druck',
    bild: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    setting: 'Labor',
    schulform: 'Sekundarstufe',
    stoffgebiet: 'Stochastik',
    kurzbeschreibung:
      'Wahrscheinlichkeiten entscheiden, welche Reagenz die Klasse zuerst mischen muss.',
    link: 'https://example.org/exit-game/labor-stochastik'
  },
  {
    id: 'eg-06',
    titel: 'Die Bruchinsel der Piraten',
    bild: 'https://images.unsplash.com/photo-1529680459049-bf0340fa0755?auto=format&fit=crop&w=1200&q=80',
    setting: 'Pirateninsel',
    schulform: 'Grundschule',
    stoffgebiet: 'Bruchrechnung',
    kurzbeschreibung:
      'Bruchteile von Schatzkarten werden addiert, verglichen und geschickt kombiniert.',
    link: 'https://example.org/exit-game/piraten-brueche'
  },
  {
    id: 'eg-07',
    titel: 'Die Schule der Magie: Raum der Formen',
    bild: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&q=80',
    setting: 'Schule der Magie',
    schulform: 'Grundschule',
    stoffgebiet: 'Geometrie',
    kurzbeschreibung:
      'Magische Symbole lassen sich nur mit Flächen- und Umfangsberechnung aktivieren.',
    link: 'https://example.org/exit-game/magie-geometrie'
  },
  {
    id: 'eg-08',
    titel: 'Code Rot im Forschungszentrum',
    bild: 'https://images.unsplash.com/photo-1581093458791-9d15482a5f69?auto=format&fit=crop&w=1200&q=80',
    setting: 'Labor',
    schulform: 'Sekundarstufe',
    stoffgebiet: 'Funktionen',
    kurzbeschreibung:
      'Messwerte analysieren, Funktionsgraphen lesen und den Notfall-Algorithmus stoppen.',
    link: 'https://example.org/exit-game/forschung-funktionen'
  }
];

const getUniqueValues = (array, key) => ['Alle', ...new Set(array.map((item) => item[key]))];

function App() {
  const [suche, setSuche] = useState('');
  const [settingFilter, setSettingFilter] = useState('Alle');
  const [schulformFilter, setSchulformFilter] = useState('Alle');
  const [stoffFilter, setStoffFilter] = useState('Alle');
  const [offenId, setOffenId] = useState(null);
  const [zufallsVorschlagId, setZufallsVorschlagId] = useState(null);

  const settings = useMemo(() => getUniqueValues(EXIT_GAMES, 'setting'), []);
  const schulformen = useMemo(() => getUniqueValues(EXIT_GAMES, 'schulform'), []);
  const stoffgebiete = useMemo(() => getUniqueValues(EXIT_GAMES, 'stoffgebiet'), []);

  const gefilterteSpiele = useMemo(() => {
    const text = suche.trim().toLowerCase();

    return EXIT_GAMES.filter((spiel) => {
      const passtSuche =
        !text ||
        spiel.titel.toLowerCase().includes(text) ||
        spiel.kurzbeschreibung.toLowerCase().includes(text) ||
        spiel.setting.toLowerCase().includes(text) ||
        spiel.stoffgebiet.toLowerCase().includes(text);

      const passtSetting = settingFilter === 'Alle' || spiel.setting === settingFilter;
      const passtSchulform = schulformFilter === 'Alle' || spiel.schulform === schulformFilter;
      const passtStoff = stoffFilter === 'Alle' || spiel.stoffgebiet === stoffFilter;

      return passtSuche && passtSetting && passtSchulform && passtStoff;
    });
  }, [suche, settingFilter, schulformFilter, stoffFilter]);

  const zufallsspielVorschlagen = () => {
    if (gefilterteSpiele.length === 0) return;
    const zufall = gefilterteSpiele[Math.floor(Math.random() * gefilterteSpiele.length)];
    setZufallsVorschlagId(zufall.id);
    setOffenId(zufall.id);
  };

  return (
    <main className="seite">
      <header className="hero">
        <div>
          <p className="hero-kicker">Digitale Unterrichtsimpulse</p>
          <h1>Mathematische Exit Games für den Unterricht</h1>
          <p>
            Entdecke passende Exit Games für Grundschule und Sekundarstufe – filterbar nach
            Setting, Schulform und Stoffgebiet.
          </p>
        </div>
      </header>

      <section className="steuerung" aria-label="Suche und Filter">
        <label className="feld">
          <span>Suche</span>
          <input
            type="search"
            placeholder="z. B. Geometrie, Weltraum, Detektiv ..."
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
          />
        </label>

        <label className="feld">
          <span>Setting</span>
          <select value={settingFilter} onChange={(e) => setSettingFilter(e.target.value)}>
            {settings.map((setting) => (
              <option key={setting} value={setting}>
                {setting}
              </option>
            ))}
          </select>
        </label>

        <label className="feld">
          <span>Schulform</span>
          <select value={schulformFilter} onChange={(e) => setSchulformFilter(e.target.value)}>
            {schulformen.map((schulform) => (
              <option key={schulform} value={schulform}>
                {schulform}
              </option>
            ))}
          </select>
        </label>

        <label className="feld">
          <span>Stoffgebiet</span>
          <select value={stoffFilter} onChange={(e) => setStoffFilter(e.target.value)}>
            {stoffgebiete.map((stoffgebiet) => (
              <option key={stoffgebiet} value={stoffgebiet}>
                {stoffgebiet}
              </option>
            ))}
          </select>
        </label>

        <button className="zufall" onClick={zufallsspielVorschlagen}>
          🎲 Zufälliges Exit Game vorschlagen
        </button>
      </section>

      {zufallsVorschlagId && (
        <p className="hinweis">
          Vorschlag aktiv:{' '}
          <strong>{EXIT_GAMES.find((spiel) => spiel.id === zufallsVorschlagId)?.titel}</strong>
        </p>
      )}

      <section className="grid" aria-live="polite">
        {gefilterteSpiele.map((spiel) => {
          const istOffen = offenId === spiel.id;

          return (
            <article className="karte" key={spiel.id}>
              <img src={spiel.bild} alt={`Vorschaubild für ${spiel.titel}`} loading="lazy" />

              <div className="karten-inhalt">
                <h2>{spiel.titel}</h2>
                <p className="metadaten">
                  <span>{spiel.setting}</span>
                  <span>{spiel.schulform}</span>
                  <span>{spiel.stoffgebiet}</span>
                </p>
                <p>{spiel.kurzbeschreibung}</p>

                <div className="aktionen">
                  <a href={spiel.link} target="_blank" rel="noreferrer">
                    Zum Exit Game
                  </a>
                  <button onClick={() => setOffenId(istOffen ? null : spiel.id)}>
                    {istOffen ? 'Details schließen' : 'Mehr Infos'}
                  </button>
                </div>

                {istOffen && (
                  <div className="details">
                    <div>
                      <h3>Direktzugang</h3>
                      <p>
                        Teile den Link oder nutze den QR-Code für den schnellen Einstieg im
                        Klassenraum.
                      </p>
                      <a href={spiel.link} target="_blank" rel="noreferrer">
                        {spiel.link}
                      </a>
                    </div>

                    <div className="qr-box" aria-label={`QR-Code für ${spiel.titel}`}>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=${encodeURIComponent(spiel.link)}`}
                        alt={`QR-Code zu ${spiel.titel}`}
                        width="112"
                        height="112"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {gefilterteSpiele.length === 0 && (
        <p className="leer">Keine Treffer. Passe Suche oder Filter an.</p>
      )}
    </main>
  );
}

export default App;
