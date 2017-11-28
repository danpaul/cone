# About

Cone is a minimal React framework enforcing stateless components, unidirectional data flow and immutable data. The frameworks motivation is simplicity. These are a few of its benefits:

* Zero effort rendering optimizations. The data store is an immutable object. Internally, the components are able to do a deep check for data equality and simply no-op for themselves and all of their children if data has not changed. Due to the properties of the immutable data store, the deep check has the performance of a shallow check (the top level data in the hierarchy only and alwyas changes if a child has changed). [Watch this for more info.](https://www.youtube.com/watch?v=I7IdS-PbEgI&feature=youtu.be)
* Strict separate of concerns. Data is only in the data store. Logic is only in the action handlers. Presentation is only in the components. No component state, no lifecycyle methods.
* Deterministic rendering. Given a state of the data store there is only one possible state of the view layer.
* Debugability. Due to the deterministic nature of the rendering you avoid a huge class of bugs related to timing, component lifecycle methods, hidden state, etc. Your entire app state is contained in the history so, you can more easily pinpoint when and where things are going wrong.

## Getting started
`npm install https://github.com/danpaul/cone --save`

## Hello World

The below assumed a build env is setup and some html markup exists with a `<div id="mount"></div>` element.

```javascript
import React from 'react';
import { AddAction, Actions, Component, Root } from 'cone';

/**
 * Define initial data strucuture
 */
const INITIAL_DATA = { visible: false };

/**
 * Define app actions. These are exposed to the componets and allow
 * 	triggering state change. When called, callback gets passed an options object
 * 	as the first argument and the data store as the second argument. The
 *  store is an Immutable JS map.
 */
AddAction('toggleVisible', (options, store) => {
	store.set('visible', !store.get('visible'));
});

/*
 * Define root component. This is bound to app data and gets re-rendered
 * 	on app data change. The data is an Immutable JS Map containing all app state.
 * 	
 * The first argument defines which HTML element the app is injected into. The
 *  last argument is optional and is a regular JS object containing the app's
 *  initial state.
 */
Root(document.getElementById('mount'), (props) => {
	const { data } = props;
	return (
		<div>
			<Message message={data.get('visible') ? 'olah mundo' : ''} />
			<a onClick={Actions.toggleVisible}>Toggle</a>
		</div>
	);
}, INITIAL_DATA);

/**
 * Child component. All non-root components are child components.
 */
const Message = Component(({ message }) => {
	return <h1>{ message }</h1>;
});

```