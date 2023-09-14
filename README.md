<div align="center">
<p><a href="https://kee.so/" target="_blank"><img src="https://i.imgur.com/x5SRUoo.png" alt="kee.so" /></a></p>

Create now ➫ [🔗 kee.so](https://kee.so/)

</div>

---

# react-live-island

Dynamic Island for React

[![npm](https://img.shields.io/npm/v/react-live-island.svg?style=flat-square)](https://www.npmjs.com/package/react-live-island)
[![npm](https://img.shields.io/npm/dt/react-live-island?style=flat-square)](https://www.npmtrends.com/react-live-island)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-live-island?style=flat-square)](https://bundlephobia.com/result?p=react-live-island)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/react-live-island?style=flat-square)](https://github.com/nanxiaobei/react-live-island/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/nanxiaobei/react-live-island/blob/main/src/types.ts)

## Install

```sh
pnpm add react-live-island
# or
yarn add react-live-island
# or
npm i react-live-island
```

## Usage

```jsx harmony
import LiveIsland from 'react-live-island';

const Demo = () => {
  return <LiveIsland>{isSmall ? 'small' : 'large'}</LiveIsland>;
};
```

[![Edit react-live-island](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-live-island-4qoom5p9x4?fontsize=14&hidenavigation=1&theme=dark)

## Props

| Prop             | Type                              | Default   | Description                                   |
| ---------------- | --------------------------------- | --------- | --------------------------------------------- |
| className        | `string`                          | `''`      | Class name of the island                      |
| top              | `number\|string`                  | `10`      | Top egde of the island                        |
| smallClassName   | `string`                          | `''`      | Class name of the **small** island            |
| smallWidth       | `number\|string`                  | `96`      | Width of the **small** island                 |
| smallHeight      | `number\|string`                  | `30`      | Height of the **small** island                |
| largeClassName   | `string`                          | `''`      | Class name of the **large** island            |
| largeWidth       | `number\|string`                  | `400`     | Width of the **large** island                 |
| largeHeight      | `number\|string`                  | `180`     | Height of the **large** island                |
| largeRadius      | `number\|string`                  | `36`      | Border radius of the **large** island         |
| wrapperClassName | `string`                          | `''`      | Class name of the whole container             |
| triggerType      | `'click'\|'hover'`                | `'click'` | Trigger mode for open                         |
| initialAnimation | `boolean`                         | `false`   | Whether show animiation on enter              |
| onChange         | `(isSmall: boolean) => void`      | -         | Call when the island open & close             |
| children         | `(isSmall: boolean) => ReactNode` | -         | Render funtion to define the island's content |

## License

[MIT License](https://github.com/nanxiaobei/react-live-island/blob/main/LICENSE) (c) [nanxiaobei](https://lee.so/)
