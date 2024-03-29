# Mathematics for a Better World website

A mini website for the "Mathematics is Everywhere" theme of IDM 2021. It provides short texts
presenting various ways in which mathematics improves the world.

## Installation

The `dist` folder should be made public in the web server.

## Compilation

This website is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files. 

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
yarn
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```
  
- **scripts (ES6)**
    ```
    gulp scripts
    gulp dependencies
    ```

Either of these can be run separately.

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```

- **Watch and compile automatically on changes**
    ```
    gulp watch
    ```

## HTML generation

The HTML content is built dynamically by pug out of data files in different languages.

Each of the main pug files selects the language it'll be in with in its `init` block:

```
block init
  - lang = 'en';
```

The building scripts in `src/pug/lib.js` read the data files from the `data` directory.

To add a new language simply create or modify a pug file to initialize the right language code,
add the translation file to the data directory and then run `gulp html` to build the HTML.

### Item ordering

The `src/pug/config.json` file defines an "order" property which is used to sort the applications in the
home grid.

## License

Software Copyright 2021 IMAGINARY gGmbH, licensed under the MIT License.

Text by Philipp Legner (Mathigon) and IMAGINARY gGmbH. Licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

For image licenses see the file image_licenses.md.

If you create your own copy of this website using the included files you MUST modify the Impressum link to a page
indicating your own legal responsability. You must also include text in the footer indicating the name of your
own organization (and logo, optionally) and indication of any modifications to content done by you.
