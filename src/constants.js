/* eslint-disable max-len */
const ICON_RED = `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZWYzMzQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwIDIwIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmxvY2F0aW9uPC90aXRsZT48cGF0aCBkPSJNMTAgMjBzLTctOS4xMy03LTEzYzAtMy44NjYgMy4xMzQtNyA3LTdzNyAzLjEzNCA3IDd2MGMwIDMuODctNyAxMy03IDEzek0xMCA5YzEuMTA1IDAgMi0wLjg5NSAyLTJzLTAuODk1LTItMi0ydjBjLTEuMTA1IDAtMiAwLjg5NS0yIDJzMC44OTUgMiAyIDJ2MHoiPjwvcGF0aD48L3N2Zz4=`;
const MAP_MARKER_DEFAULT = new Image(40, 40);
MAP_MARKER_DEFAULT.src = ICON_RED;

const ICON_BLUE = `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDA3NWIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwIDIwIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmxvY2F0aW9uPC90aXRsZT48cGF0aCBkPSJNMTAgMjBzLTctOS4xMy03LTEzYzAtMy44NjYgMy4xMzQtNyA3LTdzNyAzLjEzNCA3IDd2MGMwIDMuODctNyAxMy03IDEzek0xMCA5YzEuMTA1IDAgMi0wLjg5NSAyLTJzLTAuODk1LTItMi0ydjBjLTEuMTA1IDAtMiAwLjg5NS0yIDJzMC44OTUgMiAyIDJ2MHoiPjwvcGF0aD48L3N2Zz4=`;
const MAP_MARKER_SELECT = new Image(40, 40);
MAP_MARKER_SELECT.src = ICON_BLUE;

const ICON_GREEN = `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDA5ODc0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwIDIwIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmxvY2F0aW9uPC90aXRsZT48cGF0aCBkPSJNMTAgMjBzLTctOS4xMy03LTEzYzAtMy44NjYgMy4xMzQtNyA3LTdzNyAzLjEzNCA3IDd2MGMwIDMuODctNyAxMy03IDEzek0xMCA5YzEuMTA1IDAgMi0wLjg5NSAyLTJzLTAuODk1LTItMi0ydjBjLTEuMTA1IDAtMiAwLjg5NS0yIDJzMC44OTUgMiAyIDJ2MHoiPjwvcGF0aD48L3N2Zz4=`;
const MAP_MARKER_NEW = new Image(40, 40);
MAP_MARKER_NEW.src = ICON_GREEN;

export {MAP_MARKER_DEFAULT, MAP_MARKER_NEW, MAP_MARKER_SELECT};
