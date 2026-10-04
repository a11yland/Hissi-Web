/** English strings. Typed against the German source, so a missing key fails `astro check`. */
import type { Strings } from './de';

const en: Strings = {
  meta: {
    title: 'Hissi – Elevator status for Berlin and Brandenburg',
    description:
      'Hissi tells you whether the elevator is running before you are standing at the station. For iPhone, Apple Watch and Android.',
    ogAlt: 'Hissi – Is the elevator running? Know beforehand.',
  },
  nav: {
    skip: 'Skip to content',
    brand: 'Hissi, back to the top',
    switchText: 'DE',
    switchLabel: 'Auf Deutsch wechseln',
    legalNav: 'Legal and help',
    test: 'Test now',
  },
  platforms: { ios: 'iOS', android: 'Android' },
  platformsLabel: 'Available on',
  status: { ok: 'Running', unk: 'Unknown', down: 'Out of order' },
  eg: {
    num: 'G',
    tag: 'Ground floor',
    h1: { lead: 'The elevator is ', strike: 'broken', mid: '. ', hl: 'Now you know beforehand.' },
    intro:
      'You are on the platform with a wheelchair, a stroller or the suitcase that feels like it is full of bricks. And there is the sign: “Out of service”. Hissi tells you that while you are still at home.',
    chipsLabel: 'Platforms',
    chips: ['iPhone', 'Apple Watch', 'Android', 'free'],
    tester: { text: 'Both apps are still in testing. You can try them now: ', link: 'become a tester' },
    lift: {
      call: 'Call the elevator',
      callAgain: 'Next elevator',
      caption: 'Try it. Examples, not real reports.',
      sound: 'Sound',
      announce: 'Doors open. {where}: {state}, {when}.',
      examples: [
        { status: 'ok', state: 'Running', where: 'Alexanderplatz, U2 to street level', when: 'for 3 days' },
        { status: 'down', state: 'Out of order', where: 'Hauptbahnhof, platforms 5/6', when: 'since 07:40' },
        { status: 'unk', state: 'Unknown', where: 'Warschauer Straße, bridge', when: 'no current report' },
        { status: 'ok', state: 'Running', where: 'Ostkreuz, Ringbahn platform 11', when: 'for 12 days' },
      ],
    },
  },
  forms: {
    num: '1',
    tag: 'Shapes',
    h2: 'Three shapes. That is all you need to learn.',
    intro:
      'Colour alone is not enough, as anyone with red-green colour blindness knows. So every status in Hissi has its own shape, and the word always sits next to it.',
    items: [
      { status: 'ok', title: 'Circle means running.', text: 'All round. The operator reports the elevator in service. Off you go.' },
      { status: 'unk', title: 'Square means unknown.', text: 'Square, because nobody knows for sure. No current report, so pack a plan B.' },
      { status: 'down', title: 'Cross means out of order.', text: 'Nothing moving right now. Usually with a time, so you know for how long.' },
    ],
    honesty: 'If a source delivers no status, Hissi shows “Status unknown” – never a false “in service”.',
  },
  everywhere: {
    num: '2',
    tag: 'Everywhere',
    h2: 'Right where you already look.',
    rows: [
      {
        title: 'On your wrist',
        text: 'Apple Watch with its own app and complications. One glance on the platform, and the phone stays in your pocket.',
        platforms: ['ios'],
      },
      {
        title: 'On the lock and home screen',
        text: 'Widgets for your favorites, plus a Live Activity when you want to keep an eye on one particular elevator on the go. On Android, disruption alerts speak up instead.',
        platforms: ['ios', 'android'],
      },
      {
        title: 'In your ear',
        text: 'Ask Siri. The answer comes without tapping anything.',
        platforms: ['ios'],
      },
      {
        title: 'On the map',
        text: 'All elevators near you. Your location stays on your device.',
        platforms: ['ios', 'android'],
      },
      {
        title: 'On all your devices',
        text: 'Set favorites up once, synced via iCloud to iPhone and Watch. On Android they stay local.',
        platforms: ['ios', 'android'],
      },
    ],
    screens: {
      label: 'Screenshots (German interface)',
      favorites: 'iPhone: favorites list with three elevators, status as shape and word. German interface.',
      search: 'iPhone: station search, results grouped by region, station and network. German interface.',
      nearby: 'iPhone: nearby stations with distance and elevator status. German interface.',
      watch: 'Apple Watch: favorites list with status. German interface.',
      android: 'Android: favorites list in the dark theme. German interface.',
    },
  },
  privacy: {
    num: '3',
    tag: 'Privacy',
    h2: 'What Hissi knows about you:',
    answer: 'Nothing.',
    chipsLabel: 'What Hissi does not have',
    chips: ['no account', 'no ads', 'no analytics', 'location stays on the device'],
    note: {
      lead: 'The elevator reports come from the transit operators, via ',
      link: 'accessibility.cloud',
      tail: '. How fresh a status is depends on the operator, which is why Hissi always shows you since when a report applies.',
    },
    maps: 'Maps come from Apple Maps, on Android from the Google Maps SDK – the request carries the station’s coordinates, not yours.',
    more: 'Full privacy policy',
  },
  finnish: {
    num: '4',
    tag: 'Language lesson',
    h2: 'Why “Hissi”? Because it is Finnish for elevator.',
    pron: { word: 'hissi', ipa: '[ˈhisːi]', text: ' Two syllables, with a nice long s.' },
    cards: [
      { fi: 'Hissi toimii.', gloss: 'The elevator works.', status: 'ok', use: 'The sentence you want to hear.' },
      { fi: 'Hissi tulee.', gloss: 'The elevator is coming.', status: 'unk', use: 'Eventually, anyway.' },
      { fi: 'Hissi on rikki.', gloss: 'The elevator is broken.', status: 'down', use: 'Now you know that beforehand.' },
    ],
  },
  roof: {
    num: 'R',
    tag: 'Roof',
    h2: 'Last stop. Everybody off, please.',
    audience: 'Made for everyone who depends on elevators – with a wheelchair, a walker, a stroller or heavy luggage.',
    storesLabel: 'Availability',
    stores: {
      soon: {
        ios: { small: 'Soon on the', strong: 'App Store' },
        android: { small: 'Soon on', strong: 'Google Play' },
      },
      testing: {
        ios: { small: 'Test now via', strong: 'TestFlight' },
        android: { small: 'Test now on', strong: 'Google Play' },
      },
      badgeAlt: {
        ios: 'Download on the App Store',
        android: 'Get it on Google Play',
      },
      mail: { text: 'Want to test before release? ', link: 'Send me an e-mail', subject: 'Testing Hissi' },
      androidGate: {
        text: 'For the Android test I first need the Google account e-mail you use with Google Play: ',
        link: 'send your address',
        subject: 'Testing Hissi for Android',
        body: 'Hi, please add me to the Android test. My Google Play address: ',
      },
    },
    copyright: '© 2026 a11yland. Built for everyone who cannot take the stairs.',
    links: { support: 'Support', privacy: 'Privacy', legal: 'Legal notice', github: 'GitHub' },
  },
  support: {
    title: 'Support',
    description: 'Questions, bugs, becoming a tester: how to reach Hissi.',
    tag: 'Help',
    h1: 'Support',
    issues: {
      h2: 'Questions and bugs',
      text: 'Best as an issue on GitHub, one tracker per app. App version, operating-system version and device help.',
      ios: 'Hissi for iOS on GitHub',
      android: 'Hissi for Android on GitHub',
    },
    mail: {
      h2: 'E-mail',
      text: 'Or directly by e-mail. Hissi is a one-person project; I answer as fast as I can.',
    },
    tester: { h2: 'Become a tester', text: 'Both apps are still in testing.' },
    privacy: {
      h2: 'Privacy',
      text: 'Hissi needs no account and collects no data. Favorites stay on your device; your location never leaves the device.',
      link: 'Privacy policy',
    },
    source: {
      h2: 'Data source',
      text: 'Elevator data comes from accessibility.cloud, a project by the non-profit Sozialhelden e.V. If a source delivers no status, Hissi shows “Status unknown” – never a false “in service”.',
    },
  },
  legal: {
    updated: 'Last updated',
    seeAlso: 'See also',
    home: 'Back to the start page',
  },
  notFound: {
    title: 'Page not found',
    tag: 'Mezzanine',
    h1: 'This floor does not exist.',
    text: 'The elevator does not stop here. Back to the ground floor:',
    home: 'Back to the start page',
  },
};

export default en;
