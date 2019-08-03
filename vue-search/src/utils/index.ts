import { mapToPinyin } from "./pinyin-map";

export type SearchOptions = {
  delay?: number;
  excludeId?: boolean;
  excludeProps?: string[];
  includeProps?: string[];
  separator?: string;
};
export function isNumber(v: any): v is number {
  return typeof v === 'number';
}
export function search(row: object, keywords: string, option: Partial<SearchOptions> = {}, path = '') {
  const excludeId = option.excludeId === undefined ? true : option.excludeId;
  const excludeProps = option.excludeProps || [];
  const includeProps = option.includeProps || [];
  for (const [prop, col] of Object.entries(row)) {
    const propPath = path === '' ? prop : path + '.' + prop;
    if (
      includeProps.length > 0 && includeProps.every((includeProp) => !includeProp.match(new RegExp(`^${propPath}`))) &&
      col !== undefined &&
      col !== null ||
      (excludeId && propPath.toLowerCase().endsWith('id') ||
      excludeProps.includes(prop))
    ) {
      continue;
    } else if (typeof col !== 'object' && searchToken(col, keywords)) {
      return true;
    } else if (Array.isArray(col)) {
      for (const item of col) {
        if (typeof item !== 'object') {
          if (searchToken(item, keywords)) {
            return true;
          }
        } else if (search(item, keywords, option, propPath)) {
          return true;
        }
      }
    } else if (typeof col === 'object') {
      if (search(col, keywords, option, propPath)) {
        return true;
      }
    }
  }
}
export function searchToken(token: string | number, keywords: string) {
  const lower = token.toString().toLowerCase();
  const lowerKeyords = keywords.toLowerCase();
  return lower.includes(lowerKeyords) || toPinyin(lower).includes(lowerKeyords);
}
export function toPinyin(str: string) {
  const pinyinArr: string[] = [];
  for (const letter of str) {
    pinyinArr.push(mapToPinyin(letter) || letter);
  }
  return pinyinArr.join('');
}
