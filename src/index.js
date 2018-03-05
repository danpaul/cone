import React from 'react'
import ReactDOM from 'react-dom'
import { pure, toClass } from 'recompose'
import { isFunction } from 'lodash'
import ImmutableStore from 'immutable-js-store'

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.store.getState() };
    props.store.subscribe((data) => {
      this.setState({ data });
    });
  }
  render() {
    const Root = this.props.root;
    return <Root data={this.state.data} />;
  }
};

class Cone {
  constructor() {
    this.Actions = {};
    this.initStore = this.initStore.bind(this);
    this.AddAction = this.AddAction.bind(this);
  }
  initStore(initialData) {
    this.store = new ImmutableStore(initialData);
  }
  AddAction(actionName, action) {
    this.Actions[actionName] = (data = {}) => {
      action(data, this.store);
    }
  }
  Component(componentFunction) {
    const componentClass = toClass(componentFunction);
    componentClass.shouldComponentUpdate = (nextProps) => {
      nextProps.forEach((value, key) => {
        if (!isFunction(value) &&
          componentClass.props[key] !== value) {

          return true;
        }
      });
      return false;
    }
    return componentClass;
  }
  Root(element, componentFunction, initialData = {}) {
    const Root = pure(componentFunction);
    this.initStore(initialData);
    const store = this.store;
    document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
          <Wrapper initialData={initialData} root={Root} store={store} />,
          element
        );
    });
  }
}

const cone = new Cone();
const AddAction = cone.AddAction.bind(cone);
const Actions = cone.Actions;
const Component = cone.Component.bind(cone);
const Root = cone.Root.bind(cone);

export { AddAction, Actions, Component, Root };
