/** Release state and contact data. Flip a URL on, commit, push - nothing else changes. */

export type Platform = 'ios' | 'android';
export type Stage = 'store' | 'testing' | 'soon';

export const release = {
  ios: {
    /** TestFlight public link, e.g. 'https://testflight.apple.com/join/XXXXXXXX' */
    testflightURL: 'https://testflight.apple.com/join/JzqZMpsJ' as string | undefined,
    appStoreURL: 'https://apps.apple.com/us/app/hissi/id6817517722' as string | undefined,
    /** Numeric App Store id; enables the Smart App Banner. */
    appStoreID: '6817517722' as string | undefined,
  },
  android: {
    /** Play closed-testing opt-in link, e.g. 'https://play.google.com/apps/testing/com.a11yland.Hissi' */
    playTestingURL: 'https://play.google.com/apps/testing/com.a11yland.Hissi' as string | undefined,
    playStoreURL: undefined as string | undefined,
  },
};

export function stage(platform: Platform): Stage {
  const r = platform === 'ios'
    ? { store: release.ios.appStoreURL, testing: release.ios.testflightURL }
    : { store: release.android.playStoreURL, testing: release.android.playTestingURL };
  return r.store ? 'store' : r.testing ? 'testing' : 'soon';
}

/** The link a store button points at; undefined while nothing is public yet (→ mailto). */
export function storeHref(platform: Platform): string | undefined {
  return platform === 'ios'
    ? release.ios.appStoreURL ?? release.ios.testflightURL
    : release.android.playStoreURL ?? release.android.playTestingURL;
}

export const recruiting = (): boolean => stage('ios') === 'testing' || stage('android') === 'testing';

export const contact = {
  email: 'Kobe24LAL@gmx.de',
  issuesIOS: 'https://github.com/a11yland/Hissi-iOS/issues',
  issuesAndroid: 'https://github.com/a11yland/Hissi-Android/issues',
  github: 'https://github.com/a11yland',
  accessibilityCloud: 'https://transit.accessibility.cloud',
  sozialhelden: 'https://sozialhelden.de',
} as const;

export const imprint = {
  name: 'Ingo Stöcker',
  trading: 'a11yland',
  street: 'Blankenburger Straße 130',
  city: '13156 Berlin',
  country: 'Deutschland',
} as const;
