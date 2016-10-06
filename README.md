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
The easiest way to launch to InMotion Hosting (ie, deploy to risingstarpathways.com) is to do as follows.

1. Deploy the application to github pages using `gulp deploy` command.
2. Switch into the `gh-pages` branch and `git pull` the latest version.
3. If you've already set-up ssh access with the repository, then simply run `git push production gh-pages`

## Setting up SSH Access
In order to simplify deployment to production, we've set-up a git repository in the InMotion Host instance. The repository is located at:

```
ssh://rising40@risingstar/home/rising40/repos/risingstarpathways.git
```

Note the username, `rising40`, and the host as `risingstar`. In order for the above to work on your local machine, please do the following.

1. Edit your `~/.ssh/config` file to include the below, which maps the `risingstar` host to the correct server data.

```
Host risingstar
  Hostname biz157.inmotionhosting.com
  User rising40
  Port 2222
  IdentityFile ~/.ssh/id_rsa
```
2. Make sure the IdentityFile specified in the above is the same key as that uploaded to InImage Hosting for SSH access.

 
# Copyright and License
Modifications Copyright 2016 Rising Start Pathways.

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-creative/blob/gh-pages/LICENSE) license.
