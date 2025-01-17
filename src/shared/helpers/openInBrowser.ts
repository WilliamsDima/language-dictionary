import {Linking} from 'react-native';

export default async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (e) {
    console.log(e, 'error open link in browser');
  }
};
