---
layout: post
title: The Shapes of CSS
date: 2022-01-04 21:25 +0800
---
Square Shape
```css
#square {
  width: 100px;
  height: 100px;
  background: red;
}
```

Rectangle Shape
```css
#rectangle {
  width: 200px;
  height: 100px;
  background: red;
}
```

Circle Shape
```css
#circle {
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 50%
}
```

Oval Shape
```css
#oval {
      width: 200px;
      height: 100px;
      background: red;
      border-radius: 100px / 50px;
}
```

Triangle Up Shape
```css
#triangle-up {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;
}
```

Triangle Top Left Shape
```css
#triangle-topleft {
      width: 0;
      height: 0;
      border-top: 100px solid red;
      border-right: 100px solid transparent;
}
```