# plumvillageapp-shared
Shared types, constants, or util functions to support Plum Village App codebases

## Developing this package

It is likely that you will want to develop this package in conjunction with one
or more of the Plum Village App codebases.

To do this, you can use [yalc](https://github.com/wclr/yalc)

### yalc quickstart

First install `yalc` globally:
```bash
npm install -g yalc
```

Then, in the root of this package, run:
```bash
yalc publish
```

Then, in the codebase you want to use this package in, run:
```bash
yalc add @plumvillage/plumvillageapp-shared
```

### Tests

Run the tests with `yarn test`. They run on pull requests, and every merge to `main` releases a new minor version
once they pass.

## How to use this code as a dependency
To find out the available published versions(tags) of this repo, navigate to [this repo's published tags](https://github.com/plumvillage/plumvillageapp-shared/tags)
Once you know which version you want, use the following command to add it to dependencies 
```
yarn add "@plumvillage/plumvillageapp-shared@https://github.com/plumvillage/plumvillageapp-shared.git#v<REPLACE_WITH_VERSION>"
```
