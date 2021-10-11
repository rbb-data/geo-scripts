# geo-scripts

**Collection of node scripts for geo data manipulation**

These scripts have been moved here from the [starter](https://github.com/rbb-data/starter)
(removed from the starter in pull request [#81](https://github.com/rbb-data/starter/pull/81)).

### `npm run create-geojson-mask <in.geojson> <out.geojson>`

Inverts a given geojson file and creates a mask that can be displayed on a map to draw focus on an area. Additional info:`npm run create-geojson-mask --help`.

### `npm run geocode-data <in.csv> <out.csv>`

This script runs through all entries in <in.csv> and tries to find a geocode specified in the column `Ort` and adds the columns lat lng to each row. Then it writes the result to <out.csv>.

### `npm run convert-to-csv <in.csv> <out.csv>`

This script essentially rename columns columns read from <in.csv> and writes the resulting data to <out.csv>.
You probably want to customize this script. 

### `npm run convert-to-geojson <in.csv> <out.geojson>`

This scripts convert <in.csv> to geojson format and writes the result to <out.geojson>.
This scripts expects specific columns in <in.csv> (`Vorname`, `Nachname`, `Ort`) - you probably want to customize this.
