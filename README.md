# Rising Star Pathways
Website for Rising Star Pathways.

# Getting Started
Development makes use of [Gulp](http://gulpjs.com/).

# Development Process
The development process is rather simple. See [Directory Overview](#directory-overview) and [Start Development](#start-development).
 if interested in changing the code. Otherwise see [Launching to InMotionHosting](#launching-to-inmotionhosting) and [Deploying to Github](#deploying-to-github) for deployment details.

## Directory Overview

```
+-- gulpfile.json
+-- _html
|   +-- common
|   |   +-- footer.html
|   |   +-- header.html
|   +-- cn
|   |   +-- common
|   |   |   +-- footer.html
|   |   |   +-- header.html
|   |   +-- index.html
|   |   +-- [PAGE].html
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
```

The structure should be mostly self-explanatory. Note that the website is translated into multiple languages. The structure for the translation mimics the structure of the English site, except we have the translations stored in a subdirectory corresponding to the language.

## Start Development

To start the development process, follow normal node convention.
1. Install `node` (v6.2.2) and `npm` (v3.10.6)
2. Install required packages as specified by the `package.json`: `npm install`
3. If you'd rather not install `gulp` globally, there's some helpful script definitions in `package.json` that should do for now. You can simply install everything locally and prepend gulp commands with `npm run`.

The above should be sufficient to set the development environment. To begin development, simply execute `gulp dev`.

The `dev` command simply runs `build` and watches some commonly changed files, rebuilding when changes are noticed.

The `build` command does the bulk of the work, outputting the results to a directory `public` (as can be seen in the above schema) and which can be directly published. Understanding what the build command does is important to the development process. See [The `build` command](#the-build-command) for an thorough explanation.

## The `build` command
The build command takes all the `html/**/*.html` files and concatenates the header and footer, producing files with the same relative path at the root level of the site. Additionally, it transpiles the `*.less` files into a single `css/custom.css` and `css/custom.css.min` file. Similarly, any `*.js` files are minified and uglified and placed in the `js/` directory of the site. The `img` folder is directly copied to the root, as is, so its files are accessible under `img/`.

## Deploying to Github
The deployment process to the github page is simple. Simply run `gulp gh-pages` and the site will deploy to the `gh-pages` branch of github. Note that some links will fail to work, as they are absolute to the root of the site (any link which begins with `/` will fail). As of the writing of the README, the deployment process has not been fixed entirely, so the `gh-pages` site is not the best place to test.

## Launching to InMotionHosting
The easiest way to launch to InMotion Hosting (ie, deploy to `www.risingstarpathways.com`) is to do as follows.

1. If you've already set-up ssh access with the repository following our recommended settings, then simply run `gulp deploy`. See [Setting up SSH Access](#setting-up-ssh-access) for details.

## Setting up SSH Access
In order to simplify deployment to production, we've set-up a git repository in the InMotion Host instance. The address of the repository is:

```shell
ssh://rising40@biz157.inmotionhosting.com:2222/home/rising40/repos/risingstarpathways.git
```

Note the username, `rising40`, and the host as `biz157.inmotionhosting.com`. We recommend you take the following steps in order to simplify continued deployment.

1. Edit your `~/.ssh/config` file to include the below, which maps the `risingstar` host to the correct server address, specifies the port, a default user, and the location of the ssh keys for credential.
```
Host risingstar
  Hostname biz157.inmotionhosting.com
  User rising40
  Port 2222
  IdentityFile ~/.ssh/id_rsa
```
2. [Note: This step is not described in full detail.] Make sure the IdentityFile specified in the above is the same key as that uploaded to InMotionHosting for SSH access.
3. With the above complete, the remote repository is now located at:
```shell
ssh://rising40@risingstar/home/rising40/repos/risingstarpathways.git
```
Therefore, simply add the above as a remote to github.
```shell
git remote add production ssh://rising40@risingstar/home/rising40/repos/risingstarpathways.git
```
4. Run `git push production gh-pages`


# Copyright and License
Modifications Copyright 2016 Rising Start Pathways.

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-creative/blob/gh-pages/LICENSE) license.
