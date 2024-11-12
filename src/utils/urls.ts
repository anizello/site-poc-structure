type UrlParams = Record<string, string | number>;

export function replaceUrlParams(url: string, params: UrlParams): string {
  return url.replace(/:(\w+)/g, (_, key) => {
    if (!(key in params)) {
      throw new Error(`Missing required URL parameter: ${key}`);
    }
    return String(params[key]);
  });
}
