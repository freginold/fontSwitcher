# fontSwitcher
Dynamically add [Google Fonts](https://www.google.com/fonts) and [Adobe Edge Web Fonts](https://edgewebfonts.adobe.com/index) and apply them on the fly.  Create or add font stacks with a single line of JavaScript.

### Usage:
To use fontSwitcher, include this line between your `<head>` and `</head>` tags, or at the end of your `<body>` tag:

```html
<script src="http://freginold.github.io/fontSwitcher/fontSwitcher.min.js"></script>
```

Or to use a specific version, to avoid possible breakage when a new version is released, link to a specific version number.  Current version is 3.0:

```html
<script src="http://freginold.github.io/fontSwitcher/fontSwitcher_v3_0.min.js"></script>
```

In its simplest format, call fontSwitcher in one of three ways:

```javascript
fontSwitcher('fontName#flag', '#id');
fontSwitcher('fontName#flag', '.class');
fontSwitcher('fontName#flag', 'tag');
```

where `fontName` is the new font to load and `flag` is used to specify whether the font is a Google font (`#g`) or an Adobe font (`#a`).  If it's neither -- such as a native font or a generic font -- then no flag is necessary.  Flags can be either upper-case or lower-case.

The second argument is used to specify whether the font should be applied to elements by ID, class, or tag name (new in v3.0).  Typical CSS format is used: IDs should be preceded by a `#`, classes should be preceded by a `.`, and tags are just the tag names (`a`, `div`, etc.).

So to load the Google font "Lobster" and apply it to the "smallTitle" class, the code would look like this:

```javascript
fontSwitcher('Lobster#G', '.smallTitle');
```

However, you can also create and apply an entire font stack with one command, rather than just load an individual font.  Use an array to specify fallback fonts or a font stack.  Both Google and Adobe fonts can be loaded with the same function call.  For example:

```javascript
fontSwitcher(['Aclonica#A', 'Permanent Marker#G', 'Lucida Console', 'monospace'], '#thisID');
```

or, for easier readability:
```javascript
fontSwitcher(
  ['Aclonica#A', 'Permanent Marker#G', 'Lucida Console', 'monospace'],
  '#thisID'
);
```
Capitalization and spacing matter for Google font names.  Spacing matters for Adobe fonts (as well as system and generic fonts) but capitalization does not.

You can use Google's [Web Font Loader](https://github.com/typekit/webfontloader#get-started) instead, but fontSwitcher automatically applies the new font to any element(s) you specify, so you can apply multiple fonts (or whole font stacks) quickly and easily.

For any font that does not include a `#g` or `#a` flag, no request is made to Google or Adobe, so fontSwitcher can be used to apply native or system fonts (or Google/Adobe fonts that have already been loaded) without any additional HTTP requests being generated.

More improvements will be coming, including support for font various styles and effects.  Adobe fonts by default include a range of weights and styles.

Before using a specific font (with or without fontSwitcher) always make sure that the font's license allows the type of use you need it for.  Some fonts require attribution.

*Note:* If you're planning to use fontSwitcher locally, you'll need to add the `http:` prefix to the Adobe `src` link; otherwise it won't pull any Adobe fonts.

### Release log:

* Version 3.0:
  - can now apply fonts by ID and tag name, as well as by class
* Version 2.0:
  - added support for Adobe Edge Web Fonts
  - added flags to specify font source
  - can now create `<link>`/`<script>` elements for multiple Google/Adobe fonts with the same call
* version 1.4:
  - added support for generic fonts
* version 1.3:
  - added support for fallback fonts
* version 1.2:
  - supports multiple Google fonts at once
* version 1.1:
   - auto-creates `<link>` element if not already present
