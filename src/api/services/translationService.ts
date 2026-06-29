import axios from 'axios';

const API_URL = 'https://libretranslate.de/translate';

export async function translateText(
  text: string,
  source: string,
  target: string
) {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source,
      target,
      format: 'text',
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation failed:', error);

    return 'Translation unavailable';
  }
}