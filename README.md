# vue-search
Search function using vue-function-api, support chinese pinyin.

# Install
> yarn add @wpkg/vue-search
> npm i @wpkg/vue-search

# Usage
```vue
<template>
  <div>
    <input v-model="keywords"/>
    <div v-for="item of filtered" :key="item.name">{{ item.name }}</div>
  </div>
</template>
<script>
import Vue from 'vue';
import { value } from 'vue-function-api';
import { useSearch } from 'vue-search';
export default Vue.extend({
  setup() {
    const list = value<any[]>([
      {
        name: 'foo',
        hobbies: [{
          name: 'reading',
          id: 0
        }],
        wh: {
          weight: '75kg',
          height: '180cm',
        },
      },
      {
        name: 'bar',
        hobbies: [{
          name: 'music',
          id: 1,
        }],
        wh: {
          weight: '55kg',
          height: '170cm',
        },
      },
    ]);
    const [keywords, filtered] = useSearch(list, {
      // includeProps: ['name', 'wh.height', 'hobbies.name'],
      // excludeProps: [],
      // excludeId: true,
    });
    return { keywords, filtered };
  },
});
</script>
```
