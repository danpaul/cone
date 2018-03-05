# Cone

Cone is a minimal React framework enforcing stateless components, unidirectional data flow and immutable data. The frameworks motivation is simplicity. These are a few of its benefits:

* Zero effort rendering optimizations. The data store is an immutable object. Internally, the components are able to do a deep check for data equality and simply no-op for themselves and all of their children if data has not changed. Due to the properties of the immutable data store, the deep check has the performance of a shallow check (the top level data in the hierarchy only and alwyas changes if a child has changed). [Watch this for more info.](https://www.youtube.com/watch?v=I7IdS-PbEgI&feature=youtu.be)
* Strict separation of concerns. Data is only in the data store. Logic is only in the action handlers. Presentation is only in the components. No component state, no lifecycyle methods.
* Deterministic rendering. Given a state of the data store there is only one possible state of the view layer.
* Debugability. Due to the deterministic nature of the rendering you avoid a huge class of bugs related to timing, component lifecycle methods, hidden state, etc. Your entire app state is contained in the history so, you can more easily pinpoint when and where things are going wrong.

## Getting started
`npm install https://github.com/danpaul/cone --save`

Describe cone here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
