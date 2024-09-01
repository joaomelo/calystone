# Architecture

## Display

### Pages and Composables

Pages no nothing about the app structure. They receive pure reactive data in the format they need. Transformations must happen before. They will foward user gestures as events to be proccessed by someone else.

Every page has companion composable that will access the global state to transform and pass it to its views and also know about data functions and convert view events to proper data function calls.

This function are better than have control logic outside vue components. If the logic is the router or any non vue level it will loose the reactivity engine responsiviness.

The composables will return either or both a reactive data object and a dispatch function to process the event and returns nothing.

### Styles

Tailwind is used more to have a **consistent design token system** than to have its utility classes. If pure css is needed to layout that can be done in style scoped sections.

## Data

### Store

- Reads from the media layer.
- Cache data. 
- Control policies to auto update data.
- Pass commands to the media layer to update the persistence.

### Media

- Process calls to persists data
- Process calls to read data

There are three implementations of the media interface: FileSystemMedia for primary machines, WebRtcMedia for connected machines like mobile and MemoryMedia (for testing).