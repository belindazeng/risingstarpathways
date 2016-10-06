# Rising Star Pathways
Website for Rising Star Pathways. 

# Getting Started
Development makes use of [Gulp](http://gulpjs.com/).

# Development Process
The development process is rather simple. An overview of the directory structure is presented below.

## Directory Overview

+-- gulpfile.json
+-- _html
|   +-- common
|   |   +-- footer.html
|   |   +-- header.html
|   +-- index.html
|   +-- [PAGE].html
|   ...
+-- _img
|   +-- [STATIC FOLDER SOURCE]
|   |   +-- [STATIC IMAGE SOURCES]
|   |   ...
|   +-- [STATIC IMAGE SOURCES]
|   ...
+-- _js
|   +-- blueberry.js
|   +-- creative.js
|   +-- [JSFILE].js
|   ...
+-- _less
|   +-- blueberry.less
|   +-- custom.less
|   +-- creative.less
|   +-- mixins.less
|   +-- variables.less
+-- _public [NOT IN REPO]

## Start Development

To start the development process, follow normal node convention.
1. Install `node` (v6.2.2) and `npm` (v3.10.6)
2. Install `gulp` globally: `npm install -g gulp`
3. Install required packages as specified by the `package.json`: `npm install`

The above should be sufficient to set the development environment. To begin development, simply execute `gulp dev`.

The `dev` command simply runs `build` and watches some commonly changed files, rebuilding when changes are noticed. 

The `build` command does the bulk of the work, outputting the results to a directory `public` (as can be seen in the above schema) and which can be directly published. Understanding what the build command does is important to the development process.

## The `build` command
The buuld command takes all the `html/*.html` files and concatenates the header and footer, producing files with the same name at the root level of the site. Additionally, it transpiles the `*.less` files into a single `css/custom.css` and `css/custom.css.min` file. Similarly, any `*.js` files are minified and uglified and placed in the `js/` directory of the site. The `img` folder is directly copied to the root, as is, so its files are accessible under `img/`. 

## Deploying to Github
The deployment process to the github page is simple. However, note that as of the writing of the README, the github website does not work correctly as it is deployed to the project page. Therefore, all relative links fail since they redirect to the root (`/`) of the site.

## Launching to InMotionHosting


## Copyright and License
Modifications Copyright 2016 Rising Start Pathways.

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-creative/blob/gh-pages/LICENSE) license.
