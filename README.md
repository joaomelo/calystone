# Architecture

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

# Techinical Decision

## Why not Tailwind

Some times we need to use pure CSS to solve things like layout grids or background-image. Better have a consistent approach to styling, rely on the language itself and have visual consistency with tokens via custom properties.