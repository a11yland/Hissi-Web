/** Release state and contact data. Flip a URL on, commit, push - nothing else changes. */

export type Platform = 'ios' | 'android';
export type Stage = 'store' | 'soon';

export const release = {
  ios: {
    appStoreURL: 'https://apps.apple.com/us/app/hissi/id6817517722' as string | undefined,
    /** Numeric App Store id; enables the Smart App Banner. */
    appStoreID: '6817517722' as string | undefined,
  },
  android: {
    playStoreURL: 'https://play.google.com/store/apps/details?id=com.a11yland.Hissi' as string | undefined,
  },
};

/** The store link of a platform; undefined while it is not listed yet. */
export function storeHref(platform: Platform): string | undefined {
  return platform === 'ios' ? release.ios.appStoreURL : release.android.playStoreURL;
}

export function stage(platform: Platform): Stage {
  return storeHref(platform) ? 'store' : 'soon';
}

/** At least one platform is in its store. */
export const available = (): boolean => stage('ios') === 'store' || stage('android') === 'store';

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
