# vue-search
Search function using vue-function-api, support chinese pinyin.

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
      { name: 'foo' },
      { name: 'bar' },
    ]);
    const [keywords, filtered] = useSearch(list);
    return { keywords, filtered };
  },
});
</script>
```
