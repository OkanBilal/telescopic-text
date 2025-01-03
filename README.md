# TelescopicText

[![npm](https://img.shields.io/npm/v/@telescopic-text/react)](https://www.npmjs.com/package/@telescopic-text/react)
[![License](https://img.shields.io/npm/l/@telescopic-text/react)](LICENSE)

**TelescopicText** is a React component inspired by [telescopictext.org](https://www.telescopictext.org/) and the principles outlined in Howard Rheingold's seminal work, [Tools for Thought](https://www.rheingold.com/texts/tft/). It embodies the idea of creating tools that extend our ability to explore, express, and communicate complex ideas interactively.

By enabling text to progressively expand and reveal layers of meaning, **TelescopicText** serves as both a creative medium and a thinking tool. It’s perfect for crafting educational content, interactive stories, or interfaces that prioritize clarity and discovery, turning text into an evolving and interactive experience.

---

## Table of Contents

1. [Installation](#installation)  
2. [Usage Example](#usage-example)  
3. [Props](#props)  
4. [TelescopicItem Type](#telescopicitem-type)  
5. [Local Storage / Persistence](#local-storage--persistence)  
6. [Styling](#styling)  
7. [Advanced Usage](#advanced-usage)  
8. [License](#license)

---

## Installation

Install via your favorite package manager (NPM, Yarn, or PNPM):

```bash
npm install @telescopic-text/react
```

Or with Yarn:

```bash
yarn add @telescopic-text/react
```

or with PNPM:

```bash
pnpm add @telescopic-text/react
```

---

## Usage Example

```tsx
import React from "react";
import TelescopicText from "@telescopic-text/react";

const MyComponent: React.FC = () => {
const data = [
  "Once upon a time, ",
  {
    word: "in the mountain range",
    expandTo: [
      "in the heart of a misty mountain range, there lived a ",
      {
        word: "dragon named Ignis",
        expandTo: [
          "dragon named Ignis. His shimmering scales glinted like molten gold in the sunlight, and his breath was a searing inferno capable of turning stone to ash."
        ]
      },
    ]
  },
  " Ignis dwelled in a cavern ",
  {
    word: "so deep.",
    expandTo: [
      "so deep and vast that it echoed with the whispers of ancient winds and the soft hum of magic."
    ]
  },
];

  return (
    <div>
      <h1>Telescopic Text Demo</h1>
      <TelescopicText nodes={data} />
    </div>
  );
};

export default MyComponent;
```

---

## Props

| **Prop**              | **Type**                                                     | **Default**            | **Description**                                                                                                                                     |
|-----------------------|--------------------------------------------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **nodes**             | `TelescopicItem[]`                                          | **(required)**         | The top-level array of items to render. Each item can be a string, a React node, or a `TelescopicTextNodeData` object.                              |
| **persistenceKey?**   | `string`                                                    | `"telescopic-text"`    | A key to store the user’s expand/collapse state in `localStorage`.                                                                                  |
| **enablePersistence?**| `boolean`                                                   | `true`                 | If `true`, the expand/collapse state is saved and restored from `localStorage`. If `false`, no persistence is used.                                 |
| **baseClassName?**    | `string`                                                    | `""`                   | A default CSS class for text segments.                                                                                                              |
| **linkClassName?**    | `string`                                                    | `""`                   | A CSS class for items with a `link` property.                                                                                                       |
| **expandableClassName?** | `string`                                                | `""`                   | A CSS class for items that are expandable. Applied to the clickable text before it’s expanded.                                                      |

---

## TelescopicItem Type

The component allows for three kinds of items inside the `nodes` array:

1. **String**  
   Just a basic string to be rendered.  
   Example: `"Hello"`  

2. **React Node**  
   Any valid React element.  
   Example: `<MyCustomComponent />`  

3. **`TelescopicTextNodeData` object**  
   This is an object with the following shape:

   ```ts
   interface TelescopicTextNodeData {
     id?: string;
     word?: string | React.ReactNode;
     link?: string;
     linkClassName?: string;
     expandableClassName?: string;
     baseClassName?: string;
     expandTo?: TelescopicItem[];
   }
   ```

   - **id?**  
     A unique string identifier used for generating keys. If omitted, the index is used.

   - **word?**  
     The visible text or React node. If it’s expandable, clicking/tapping on this will expand into the `expandTo` array.

   - **link?**  
     If provided, the `word` becomes a hyperlink. The link opens in a new tab/window by default.

   - **linkClassName?**  
     CSS class used specifically for this link item. If not provided, falls back to the `linkClassName` prop on the parent component.

   - **expandableClassName?**  
     CSS class used for the clickable text that’s expandable. If not provided, falls back to the parent’s `expandableClassName`.

   - **baseClassName?**  
     CSS class for non-expandable text. Overrides the parent’s `baseClassName`.

   - **expandTo?**  
     An array of items (strings, React nodes, or more objects) to reveal when this word is clicked. This is optional—if omitted, the object is not expandable.

---

## Local Storage / Persistence

By default, **TelescopicText** will store two arrays in `localStorage` under the key specified by `persistenceKey`:

- **expanded**: The keys of items that have been expanded.  
- **clicked**: The keys of items that have already been clicked.

When a user revisits the page, the component will restore the expanded/clicked state automatically, maintaining the previously expanded text.

If you do **not** want to persist state, set:

```tsx
<TelescopicText
  nodes={data}
  enablePersistence={false}
/>
```

---

## Styling

Because the text is broken up into multiple spans or anchors, you can use the `baseClassName`, `linkClassName`, and `expandableClassName` props to style them appropriately. For example:

```css
/* Example CSS classes */
.base-text {
  color: #333;
}

.link-text {
  color: #3B82F6;
  text-decoration: underline;
  cursor: pointer;
}

.expandable-text {
  color: #C44336;
  font-weight: bold;
  cursor: pointer;
}
```

Then:

```tsx
<TelescopicText
  nodes={data}
  baseClassName="base-text"
  linkClassName="link-text"
  expandableClassName="expandable-text"
/>
```

---

## License

This component is distributed under the **MIT License**. Feel free to use it in your personal or commercial projects. Contributions and pull requests are welcome!