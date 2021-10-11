# geo-scripts
Collection of node scripts for geo data manipulation

These scripts have been moved here from the [starter](https://github.com/rbb-data/starter)
(removed from the starter in pull request [81](https://github.com/rbb-data/starter/pull/81)).

### `npm run --silent create-geojson-mask`

Inverts a given geojson file and creates a mask that can be displayed on a map to draw focus on an area (see `src/data/potsdam-mask.geo.json` for an example`. Additional info:`npm run create-geojson-mask --help`.

**NOTE:** The `--silent` flag is needed, otherwise invalid GeoJSON will be produced.

### `npm run geocode-data`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/raw_source_file.csv`. runs through all its
entries and tries to find a geocode specified in the column `Ort` and adds the columns lat lng to each row.
Then it saves the result in the file `../src/data/geocoded.csv`

### `npm run convert-to-csv`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a csv file.
Then it saves the result in the file `../public/markers.csv`

### `npm run convert-to-geojson`

**This is an example script that you need to customize for your project**

This script expects a csv at `../src/data/geocoded.csv` (you could change this to `../src/data/raw_source_file.cs`)
This is just a simple example on how to map an external file to the datastructure used in the project.
The output is a geojson file.
Then it saves the result in the file `../public/markers.geojson`
