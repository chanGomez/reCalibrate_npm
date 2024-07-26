# ⇲ reCalibrate ✳️

A npm package that lets you adjust the width and height of components in real time using a drag feature while in development.

```js
<ReCalibrate>
  <div className="one_simple_container">
    <p>I can now be changed!</p>
  </div>
</ReCalibrate>
```


### Installing

```bash
$ npm install recalibrate
```

### Exports

The default export is `<ReCalibrate>`.
Here's how to use it:

```js
// ES6
import ReCalibrate from 'ReCalibrate'; // The default

// CommonJS
let ReCalibrate = require('ReCalibrate');
let ReCalibrate = ReCalibrate;
```

## `<ReCalibrate>`

A `<ReCalibrate>` wraps an existing element and extends it with new event handlers and styles.
It does not create a wrapper element in the DOM.

ReCalibrate items are moved using CSS Transforms. This allows items to be dragged regardless of their current
positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<ReCalibrate>`. Use
an intermediate wrapper (`<ReCalibrate><span>...</span></ReCalibrate>`) in this case.
