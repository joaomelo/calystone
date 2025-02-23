# Architecture

## Layers

The arrows represent wich modules depends on. In that case the control module depends on the view module but the view knows nothing about the control.

```mermaid
graph TD
  main
  subgraph core
    direction LR
    display
    services
    infra
    domain
  end
  utils
  main --> core
  display --> domain
  display -.-> services
  services --> domain
  services -.-> infra
  infra --> domain
  main --> utils
  core --> utils
```

## Main

Starts the applicaton, initializes app level state and stablish runtime dependencies.

## Display

Make the app moves. It grabs and transform state from `domain` and show it to the user, then captures events triggered by the user ans translates them into calls to `domain`.

```mermaid
graph LR;
  subgraph router
    routeA;
    routeB
  end
  subgraph views
    pageX;
    pageU;
  end
  subgraph widgets
    widgetN
    widgetM
  end
  subgraph external
    component
  end

  routeA --> pageX;
  routeB --> pageU
  pageX --> widgetN
  pageU --> widgetM;
  pageU --> widgetN;
  widgetM --> component
```

### Routes

The top structure starts at the route level. Routes are objects that define the entry points available to the user. The shape of the route objects are defined by the vue-router library API. 

The route will render a view component. 

The library supports the concept of nested routes to enable a sort of layout structure. This is not allowed in this app design. This approach couples the route configuration to the component tree and can become a maintence burden. 

Pages should mount their layout inside their own template. They can reuse capabilities by composing the layout with widgets.

### Views

Views are what the user see in the end. They access the domain via a central construct called Store. All data they need they grab from the store user signals are convert to calls to the store inner methods.

Views can be complex structures in order to deal with data orchestrations. They can abstract its capacities into subcomponets or composables to streamline code.

### Widgets

They are shared resources (components and composables) used by more than one view or other widgets.

Widgets are also used to function as single entry points for outside UI dependencies. Like if some button from a UI library is used in the app, for example. On that case, the button should be imported in a proxy ButtonBase widget and then used in pages, even if for a single page.

### Styles

Styles are guided by design tokens that came from the Prime Vue UI library (mainly colors) and from the Open Props library (mainly sizes).

The project uses vanilla CSS with design tokens coming from custom properties. The project does not use utility classes even when available. That is way open props is used instead of TailwindCss.

## Domain

Domain is the app logic running in a vacum without care about `views` and just with bare interfaces for `infra`.

### Separeta state from logic

Computation logic should be isolated in pure function whenever possible, even if they will be used to enable classes methods.

This isolation avoid big classes files that are hard to read, avoid side effects in state that are hard to locate and makes testing easier.

### Be simple and let upper layers carry some load

The domain has a concise as possible properties and methods to allow state mutation, asserting business rules, and exposing essencial data to the top layers.

These types are not meant to be flexible or adapt to every needs of the UI. The point here is simplicity and communality. Views will extedend upon the domain to reach their needs.

When adding something to the domain ask yourself, does the domain doesn't already expose this? if so, create the capability in the consumer.

## infra

infra is the module with the logic to persist and recover real data for medias like the file system and the local storage. It also provides services utilities for things like checking if the user browser supports the repository technology.

## Utils

Here resides features used by multiple modules that cares no business logic. 

Be aware that generic lib features are considered bad design. Everything should be written to attend the current needs.

# Design choices

These are not general design claims for the community. These are local desicions applicable only to these apps. Do not interpret this decisions as something we believe should be done for other apps.

## Avoid uncertain use of complexity

Nothing in this app, even utilities like features, is coded with a mindset to be later used in other apps or libs. this kind of design bring complexity. This app code has to be as focuses as possible. Some capability is added only when indispensible to achive some app known and present goal.

## Focused classes

Classes should be as single responsability as possible. They should do one thing and operate at a single level of abstraction.

You can create inner classes to isolate related groups of methods like in Hash and Hierarchy examples for the Nodes class.

[How small should a function be? - Robert C. Martin (Uncle Bob)](https://www.youtube.com/watch?v=rXjf8eiGsSI).

## Test Modules not Files

No need to unit test every function and also no need to worry about the testing emcompassing inner structures. Tests should focus on verifying modules outcomes with none to litte mocking. Inner modules functions can change at will with side effecting multiple tests.

[There is No Such Thing as a Unit Test](https://dev.to/awwsmm/there-is-no-such-thing-as-a-unit-test-50j3)

## Do not use global stores

Global store incentivise black holes modules that aim to solve many problems.This creates unintended dependencies. Expose every bit of state carefully by atomic exposure.

## Postpone branches and dependencies

If a inner class needs two piece of data to operate, require them at the constructor. Do not accept another class that maybe has the data in it and them create logic to check and throw. If this outer classes changes, now you have to update your inner class too. 

Let the code that constructs the inner class check if the data exists even if it envolves more boilerplate. The code will be easier to understand.