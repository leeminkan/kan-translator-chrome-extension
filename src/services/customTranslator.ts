import type { CustomTranslatorResponse } from "./customTranslator.type";
import { getAsync } from "./base.util";

export class CustomTranslator {
  _baseUrl = "https://translator-api-beta.vercel.app";

  get uid() {
    return "custom";
  }

  get friendlyName() {
    return "Custom Translate";
  }

  async translateAsync(sourceText) {
    let url = `${this._baseUrl}/api/translator`;
    url += `?word=${sourceText}`;

    return (await getAsync(url)) as CustomTranslatorResponse;
  }
}

export const customTranslator = new CustomTranslator();
