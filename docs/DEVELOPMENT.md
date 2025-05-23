# Contributions

While I'm passionate about this project, I maintain it alongside my full-time job and family commitments. To ensure sustainable development and maintain mental health, I've decided to keep the project closed to external contributions for now.

*this file is still under construction from this point on, do not consider the information reliable*

# Architecture and Development Guidelines

## Modules

These are the top-level modules of the system. The arrows represent wich other modules that module depends on.

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
  display --> services
  services --> domain
  services --> infra
  infra --> domain
  main --> utils
  core --> utils
```

## Main

Starts the applicaton, initializes app level state and connect runtime dependencies.

## Display

Make the app move. It collects and transform state from using the `services` module and show the state to the user, then the `display` captures events triggered by the user and translates them into calls to `services`.

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
    useZ
  end  
  store

  routeA --> pageX;
  routeB --> pageU
  pageX --> widgetN
  pageU --> widgetM;
  pageU --> widgetN;
  pageU --> useZ;
  views --> store;
  widgets --> store;
```

### Routes

The top structure starts at the route level. Routes are objects that define the url entry points available to the user. The shape of the route objects is defined by the vue-router library API. 

The route will render one or more view components. 

The library supports the concept of nested routes to enable a sort of layout structure. This is discouraged in this app design. This approach couples the route configuration to the component tree and can become a maintence burden. 

Vies should mount their layout inside their own templates. They can reuse capabilities by composing the layout with widgets.

### Views

While routes are url/component configuration, the views are what the user reaslly see. Views access the services and domain via a central construct called store. All data they need, they grab from the store and user signals are convert to calls to the store inner objects methods.

The distinc feature of a view is that it was designed to be placed as an route component. So it is not meant for reuse.

They can be complex structures in order to deal with data orchestrations. They can abstract its capacities into subcomponets or composables to streamline code. If this sub strucutures are used only in one page they will live beside the page, if they are shared by multiple page, they should be moved to the widgets module.

### Widgets

They are shared resources (components and composables) used by more than one view or other widgets. Widgets get the page context by props and are able to implement features using the state in the Store.

We tried a pattern of isolating the widgets from the Store and use only props and events. This end up promoting complexity by demanding coupled siamese components meant only to access the store. Now views and widgets are encouraged to use services from the store to delivery their capabilities.

Nevertheless, shared UI logic decoupled from the business rules like button, toolbars and so on are encouraged to be externalized in components in the utils module. Also access to UI libraries is discouraged in the widgets module, prefer creating proxy ui components in utils.

### Styles

Styles are guided by design tokens that came from the Prime Vue UI library (mainly colors) and from the Open Props library (mainly sizes).

The project uses vanilla CSS with design tokens coming from custom properties. The project does not use utility classes even when available. That is way open props is used instead of TailwindCss.

## Domain

Domain is the app logic running in a vacum without care about any other core module. 

This is a simple module focus on representing data and behaviour that is not dependent of external medida. These domain structures are not meant to encapsulate UI tasks. The point here is simplicity and communality. 

Service will later provide the UI with the appropriate use cases that are able to communicate with the infra structures.

## Infra

Infra is the module with the logic to persist and recover real data for media like the file system and the local storage. It also provides services utilities for things like checking if the user browser supports the repository technology.

Infra knows about the domain so it can manipulate the proper data structures but should not know about display and services.

### Orthogonality 

Diferent adapters tend to have some similarities as sometimes they offer diferent groups of featues from the same base technology or cloud provider. This tend to incentivize creating logic for cooperation between them.

This should be avoided. Changes on services needs tend to break this cooperations without relly effecting the core features the adpater should be concern. Let cooperation be done in the service layer and avoid dependencies between adapaters. 

To make things easier in the service layer, concentrate in fatctories or façades between diferent concrete adapters implementations from the same shared interface.

Be sure to demand clear data as possible for instantiation and let main and services decide if configuration is available to actually create adpaters.

## Services

Services implement typical use cases that will be consumed by one or more UIs.

Services are incouraged to have a small surface will no many methods so they represent a specilized use case that is quite independent of the other use cases. 

At the same time, this methods are encourage to be deep and absorve complexity like validation and integration. Auxiliare classes are encouraged but must be hiddes to the services consumers by methods the service itself. The point is that the services methods should express their behaviour.

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