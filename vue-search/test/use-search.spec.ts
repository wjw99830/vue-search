import Vue from 'vue';
import { useSearch } from '../src/main';
import { value, plugin } from 'vue-function-api';

Vue.use(plugin);

type Data = {
  keywords: string;
  filtered: any[];
};

const mock = [
  { name: 'foo', age: 20, hobbies: ['reading', 'music'] },
  {
    name: 'bar',
    age: 23,
    wh: {
      weight: '65kg',
      height: '174cm',
    },
    hobbies: ['游戏'],
  },
];

describe('useSearch', () => {
  it('should return a filtered array and a keywords wrapper', (done) => {
    const A = Vue.extend({
      render(this: Data, h) {
        return h('div', [
          h('input', {
            domProps: {
              value: this.keywords,
            },
            on: {
              input: (val: string) => this.keywords = val,
            },
          }),
          this.filtered.map(item => h('span', item.name)),
        ]);
      },
      setup() {
        const list = value<any[]>(mock);
        const [keywords, filtered] = useSearch(list, {
          includeProps: ['name', 'age', 'wh.height', 'hobbies'],
        });
        return { keywords, filtered };
      },
    });
    const a = new A() as any;
    expect(a.filtered.length).toBe(2);
    a.keywords = '65kg';
    // default search delay: 150ms
    setTimeout(() => {
      expect(a.filtered.length).toBe(0);
      a.keywords = 'youxi';
      setTimeout(() => {
        expect(a.filtered.length).toBe(1);
        expect(a.filtered[0].name).toBe('bar');
        done();
      }, 300);
    }, 300);
  });
});
