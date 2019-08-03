import { value, watch, Wrapper } from 'vue-function-api';
import { isNumber, SearchOptions, search } from './utils';


/**
 * 多关键词搜索，中文拼音搜索
 * @param {object[]} data source
 * @param {SearchOptions} opt options
 * @param {boolean} opt.excludeId specified if exclude property 'id', default: false
 * @param {string[]} opt.excludeProps specified which properties won't be searched, support index-path like 'a.b.c'
 * @param {string[]} opt.includeProps specified which properties searched, support index-path like 'a.b.c'
 * @param {number} opt.delay if provided, searching will be delayed by this millisecond(s), default: 300
 * @return {Touple} [keywords, result]
 */
export function useSearch<R extends {}>(data: Wrapper<R[]>, opt: SearchOptions = {}): [Wrapper<string>, Wrapper<R[]>] {
  const delay = isNumber(opt.delay) && !isNaN(opt.delay) ? opt.delay : 150;
  const separator = opt.separator || ' ';
  const keywords = value('');
  const searchFn = (row: R) => {
    for (const keyword of keywords.value.split(separator).filter(Boolean)) {
      if (!search(row, keyword, opt)) {
        return false;
      }
    }
    return true;
  };
  const result = value<R[]>(data.value);
  let timer = 0;
  watch(keywords, () => {
    clearTimeout(timer);
    timer = setTimeout(() => result.value = data.value.filter(searchFn), delay);
  });
  watch(data, () =>  result.value = data.value.filter(searchFn));
  return [keywords, result];
}
export { SearchOptions } from './utils';
