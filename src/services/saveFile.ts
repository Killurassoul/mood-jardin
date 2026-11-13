import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

// Android WebView ignores <a download> on blob URLs, so on native we write the file and open the share sheet.
export async function saveFile(fileName: string, base64: string, mime: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const { uri } = await Filesystem.writeFile({ path: fileName, data: base64, directory: Directory.Cache });
    await Share.share({ title: fileName, files: [uri] });
    return;
  }
  const a = document.createElement('a');
  a.href = `data:${mime};base64,${base64}`;
  a.download = fileName;
  a.click();
}

// unescape+encodeURIComponent: UTF-8 safe and no argument-count limit on large backups
export const textToBase64 = (text: string) => btoa(unescape(encodeURIComponent(text)));
