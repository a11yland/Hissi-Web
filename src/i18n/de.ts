/** German strings (source language). Copy ported verbatim from the design template; additions are marked. */
import type { Platform } from '../config';

export type Status = 'ok' | 'unk' | 'down';

export interface LiftExample {
  status: Status;
  state: string;
  where: string;
  when: string;
}

export interface FormItem {
  status: Status;
  title: string;
  text: string;
}

export interface PlaceRow {
  title: string;
  text: string;
  platforms: Platform[];
}

export interface LessonCard {
  fi: string;
  gloss: string;
  status: Status;
  use: string;
}

export interface StoreLabel {
  small: string;
  strong: string;
}

const de = {
  meta: {
    title: 'Hissi – Aufzugstatus für Berlin und Brandenburg',
    description:
      'Hissi sagt dir, ob der Aufzug fährt, bevor du an der Haltestelle stehst. Für iPhone, Apple Watch und Android.',
    ogAlt: 'Hissi – Fährt der Aufzug? Wisse es vorher.',
  },
  nav: {
    skip: 'Zum Inhalt springen',
    brand: 'Hissi, zum Anfang',
    /** Shown on this language's pages, in the *other* language. */
    switchText: 'EN',
    switchLabel: 'Switch to English',
    legalNav: 'Rechtliches und Hilfe',
    /** Header call to action while a platform is in testing; links to the roof. */
    test: 'Jetzt testen',
  },
  platforms: { ios: 'iOS', android: 'Android' } satisfies Record<Platform, string>,
  platformsLabel: 'Verfügbar auf',
  status: { ok: 'Läuft', unk: 'Unbekannt', down: 'Gestört' } satisfies Record<Status, string>,
  eg: {
    num: 'EG',
    tag: 'Erdgeschoss',
    h1: { lead: 'Der Aufzug ist ', strike: 'kaputt', mid: '. ', hl: 'Das weißt du jetzt vorher.' },
    intro:
      'Du stehst am Bahnsteig, mit Rollstuhl, Kinderwagen oder dem Koffer, der sich nach Ziegelsteinen anfühlt. Und da hängt der Zettel: „Außer Betrieb“. Hissi sagt dir das schon zu Hause.',
    chipsLabel: 'Plattformen',
    chips: ['iPhone', 'Apple Watch', 'Android', 'kostenlos'],
    // added: tester recruitment, rendered only while a platform is in testing
    tester: { text: 'Beide Apps sind noch im Test. Du kannst sie jetzt ausprobieren: ', link: 'Tester werden' },
    lift: {
      call: 'Aufzug rufen',
      callAgain: 'Nächster Aufzug',
      caption: 'Probier’s aus. Beispiele, keine echten Meldungen.',
      /** Toggle for the chime that plays when the doors open. */
      sound: 'Ton',
      /** Live-region announcement; placeholders are replaced by the script. */
      announce: 'Tür offen. {where}: {state}, {when}.',
      examples: [
        { status: 'ok', state: 'Läuft', where: 'Alexanderplatz, U2 zur Straße', when: 'seit 3 Tagen' },
        { status: 'down', state: 'Gestört', where: 'Hauptbahnhof, Gleis 5/6', when: 'seit 07:40' },
        { status: 'unk', state: 'Unbekannt', where: 'Warschauer Straße, Brücke', when: 'keine aktuelle Meldung' },
        { status: 'ok', state: 'Läuft', where: 'Ostkreuz, Ringbahn Gleis 11', when: 'seit 12 Tagen' },
      ] as LiftExample[],
    },
  },
  forms: {
    num: '1',
    tag: 'Formenlehre',
    h2: 'Drei Formen. Mehr musst du nicht lernen.',
    intro:
      'Farbe allein reicht nicht, das wissen alle mit Rot-Grün-Schwäche. Deshalb hat jeder Status bei Hissi eine eigene Form und steht immer als Wort daneben.',
    items: [
      { status: 'ok', title: 'Kreis heißt läuft.', text: 'Alles rund. Der Betreiber meldet den Aufzug in Betrieb. Fahr los.' },
      { status: 'unk', title: 'Quadrat heißt unbekannt.', text: 'Eckig, weil keiner Genaues weiß. Keine aktuelle Meldung, also Plan B einpacken.' },
      { status: 'down', title: 'Kreuz heißt gestört.', text: 'Da geht gerade nichts. Meistens mit Uhrzeit, damit du weißt, wie lange schon.' },
    ] as FormItem[],
    // added, verbatim from the store listing
    honesty: 'Liefert eine Quelle keinen Status, zeigt Hissi „Status unbekannt“ – niemals ein falsches „in Betrieb“.',
  },
  everywhere: {
    num: '2',
    tag: 'Überall',
    h2: 'Da, wo du sowieso hinschaust.',
    rows: [
      {
        title: 'Auf dem Handgelenk',
        text: 'Apple Watch mit eigener App und Komplikationen. Ein Blick am Bahnsteig, und das Handy bleibt in der Tasche.',
        platforms: ['ios'],
      },
      {
        title: 'Auf dem Sperr- und Startbildschirm',
        text: 'Widgets für deine Favoriten, dazu eine Live-Aktivität, wenn du einen bestimmten Aufzug unterwegs im Auge behalten willst. Auf Android melden sich stattdessen Störungsalarme.',
        platforms: ['ios', 'android'],
      },
      {
        title: 'Im Ohr',
        text: 'Frag Siri. Die Antwort kommt, ohne dass du auf irgendetwas tippen musst.',
        platforms: ['ios'],
      },
      {
        title: 'Auf der Karte',
        text: 'Alle Aufzüge in deiner Nähe. Dein Standort bleibt dabei auf deinem Gerät.',
        platforms: ['ios', 'android'],
      },
      {
        title: 'Auf all deinen Geräten',
        text: 'Favoriten einmal anlegen, per iCloud auf iPhone und Watch. Auf Android bleiben sie lokal.',
        platforms: ['ios', 'android'],
      },
    ] as PlaceRow[],
    screens: {
      label: 'Bildschirmfotos',
      /** The screenshots show the German interface. */
      favorites: 'iPhone: Favoritenliste mit drei Aufzügen, Status als Form und Wort.',
      search: 'iPhone: Suche nach Stationen, Treffer nach Region, Station und Netz gruppiert.',
      nearby: 'iPhone: Stationen in der Nähe mit Entfernung und Aufzugstatus.',
      watch: 'Apple Watch: Favoritenliste mit Status.',
      android: 'Android: Favoritenliste im dunklen Design.',
    },
  },
  privacy: {
    num: '3',
    tag: 'Datenschutz',
    h2: 'Was Hissi über dich weiß:',
    answer: 'Nichts.',
    chipsLabel: 'Was Hissi nicht hat',
    chips: ['kein Konto', 'keine Werbung', 'keine Analyse', 'Standort bleibt auf dem Gerät'],
    note: {
      lead: 'Die Aufzugsmeldungen kommen von den Verkehrsbetrieben, über ',
      link: 'accessibility.cloud',
      tail: '. Wie frisch ein Status ist, liegt beim Betreiber. Hissi zeigt dir deshalb immer, seit wann eine Meldung gilt.',
    },
    // added
    maps: 'Karten kommen von Apple Karten, auf Android vom Google Maps SDK – die Anfrage trägt die Koordinaten der Station, nicht deine.',
    more: 'Ganze Datenschutzerklärung',
  },
  finnish: {
    num: '4',
    tag: 'Sprachkurs',
    h2: 'Warum „Hissi“? Weil das Finnisch für Aufzug ist.',
    pron: { word: 'hissi', ipa: '[ˈhisːi]', text: ' Zwei Silben, das s schön lang.' },
    cards: [
      { fi: 'Hissi toimii.', gloss: 'Der Aufzug funktioniert.', status: 'ok', use: 'Der Satz, den du hören willst.' },
      { fi: 'Hissi tulee.', gloss: 'Der Aufzug kommt.', status: 'unk', use: 'Irgendwann jedenfalls.' },
      { fi: 'Hissi on rikki.', gloss: 'Der Aufzug ist kaputt.', status: 'down', use: 'Den kennst du jetzt vorher.' },
    ] as LessonCard[],
  },
  roof: {
    num: 'D',
    tag: 'Dach',
    h2: 'Endstation. Bitte alle aussteigen.',
    // added, verbatim from the store listing
    audience: 'Gedacht für alle, die auf Aufzüge angewiesen sind – ob mit Rollstuhl, Rollator, Kinderwagen oder schwerem Gepäck.',
    storesLabel: 'Verfügbarkeit',
    stores: {
      soon: {
        ios: { small: 'Bald im', strong: 'App Store' },
        android: { small: 'Bald bei', strong: 'Google Play' },
      } satisfies Record<Platform, StoreLabel>,
      testing: {
        ios: { small: 'Jetzt testen per', strong: 'TestFlight' },
        android: { small: 'Jetzt testen bei', strong: 'Google Play' },
      } satisfies Record<Platform, StoreLabel>,
      testflight: { text: 'Du willst die Beta? ', link: 'Auf iOS per TestFlight testen' },
      badgeAlt: {
        ios: 'Laden im App Store',
        android: 'Jetzt bei Google Play',
      } satisfies Record<Platform, string>,
      /** Shown while a platform has no public link yet. */
      mail: { text: 'Du willst vorab testen? ', link: 'Schreib mir eine Mail', subject: 'Hissi testen' },
      /** Google only lets listed accounts into a closed test, so the address has to come first. */
      androidGate: {
        text: 'Für den Android-Test brauche ich vorher die Google-Mail-Adresse, mit der du bei Google Play angemeldet bist: ',
        link: 'Adresse schicken',
        subject: 'Hissi für Android testen',
        body: 'Hallo, bitte schalte mich für den Android-Test frei. Meine Google-Play-Adresse: ',
      },
    },
    copyright: '© 2026 a11yland. Gebaut für alle, die nicht die Treppe nehmen können.',
    links: { support: 'Support', privacy: 'Datenschutz', legal: 'Impressum', github: 'GitHub' },
  },
  support: {
    title: 'Support',
    description: 'Fragen, Fehler, Tester werden: so erreichst du Hissi.',
    tag: 'Hilfe',
    h1: 'Support',
    issues: {
      h2: 'Fragen und Fehler',
      text: 'Am besten als Issue auf GitHub, getrennt nach App. Hilfreich sind App-Version, Version des Betriebssystems und Gerät.',
      ios: 'Hissi für iOS auf GitHub',
      android: 'Hissi für Android auf GitHub',
    },
    mail: {
      h2: 'E-Mail',
      text: 'Oder direkt per Mail. Hissi ist ein Ein-Personen-Projekt, ich antworte, so schnell ich kann.',
    },
    tester: { h2: 'Tester werden', text: 'Beide Apps sind noch im Test.' },
    privacy: {
      h2: 'Datenschutz',
      text: 'Hissi braucht kein Konto und sammelt keine Daten. Favoriten liegen auf deinem Gerät, dein Standort verlässt das Gerät nicht.',
      link: 'Datenschutzerklärung',
    },
    source: {
      h2: 'Datenquelle',
      text: 'Die Aufzugsdaten stammen von accessibility.cloud, einem Projekt des gemeinnützigen Sozialhelden e.V. Liefert eine Quelle keinen Status, zeigt Hissi „Status unbekannt“ – niemals ein falsches „in Betrieb“.',
    },
  },
  legal: {
    updated: 'Stand',
    seeAlso: 'Siehe auch',
    home: 'Zur Startseite',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    tag: 'Zwischengeschoss',
    h1: 'Diese Etage gibt es nicht.',
    text: 'Hier hält der Aufzug nicht. Zurück ins Erdgeschoss:',
    home: 'Zur Startseite',
  },
};

export default de;
export type Strings = typeof de;
