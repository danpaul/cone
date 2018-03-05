import React from 'react'
import { AddAction, Actions, Component, Root } from '../../src'

/**
 * Define initial data strucuture
 */
const INITIAL_DATA = { visible: false }

/**
 * Define app actions. These are exposed to the componets and allow
 *   triggering state change. When called, callback gets passed an options object
 *   as the first argument and the data store as the second argument. The
 *  store is an Immutable JS map.
 */
AddAction('toggleVisible', (options, store) => {
  store.set('visible', !store.get('visible'))
})

/*
 * Define root component. This is bound to app data and gets re-rendered
 *   on app data change. The data is an Immutable JS Map containing all app state.
 *
 * The first argument defines which HTML element the app is injected into. The
 *  last argument is optional and is a regular JS object containing the app's
 *  initial state.
 */
Root(document.querySelector('#demo'), (props) => {
  const { data } = props
  return (
    <div>
      <Message message={data.get('visible') ? 'olah mundo' : ''} />
      <a onClick={Actions.toggleVisible}>Toggle</a>
    </div>
  )
}, INITIAL_DATA)

/**
 * Child component. All non-root components are child components.
 */
const Message = Component(({ message }) => {
  return <h1>{ message }</h1>
})
