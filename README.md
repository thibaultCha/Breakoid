# Breakoïd
Breakoïd is a simple JavaScript bricks breaking game. Built for fun and training on free time. Playable demo [here](http://thibaultcha.github.io/Breakoid/).

![](screen.png)

## How to
1. Take a canvas:
```html
<canvas id="canvasid" width="500" height="400">
    Your browser does not support the canvas element.
</canvas>
```

2. Include breakoid.js and write:
```javascript
var breakoid = new Breakoid('canvasid')
```

3. Press `S` to start, `R` to reload, `P` to pause or resume the game.

* Breakoïd calculates your bricks' width according to the canvas's width, the number of columns (NBCOLS) and the space between bricks (EMPTY_SPACE).
* Try to play with Breakoïd's constants to customize the game.

## Disclaimer
This is a very basic game and it's not optimized and does not support all collisions detection. The actual architecture is basic and was more about training myself on HTML5 canvas rather than build a complete game. If I had the time I would rewrite it and I know perfectly how.

## Licensing
```
Copyright (C) 2013 by Thibault Charbonnier.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

  