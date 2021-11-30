#!/usr/bin/env node

require("dotenv").config();

const { csvParse, csvFormat } = require("d3-dsv");
const fs = require("fs");
const path = require("path");
var rp = require("request-promise");

const transformPath = (filename) =>
  path.isAbsolute(filename) ? filename : path.join(__dirname, filename);

var { argv } = require("yargs")
  .usage("Usage: $0 --in *.csv --out *.csv")
  .option("in", {
    describe: "Input file in csv format",
    type: "string",
  })
  .option("out", {
    describe: "Geo-coded output file",
    type: "string",
  })
  .option("loc-col", {
    describe: "Name of the column that contains locations",
    type: "string",
  })
  .demandOption(["in", "out", "loc-col"])
  .middleware((argv) => {
    return {
      in: transformPath(argv.in),
      out: transformPath(argv.out),
    };
  });

function timeout(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
}

const rawData = fs.readFileSync(argv.in, "utf8");
const data = csvParse(rawData);
const nRows = data.length;

// csv.length = 2
const geoCodedData = data.map(async (row, i) => {
  const options = {
    uri: "https://api.openrouteservice.org/geocode/search",
    qs: {
      api_key: process.env.OPENROUTSERVICE_KEY,
      "boundary.country": "DE",
      layers: "address",
    },
    headers: {
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
    },
    json: true, // Automatically parses the JSON string in the response
  };

  try {
    const request = {
      ...options,
      qs: { ...options.qs, text: row[argv.locCol] },
    };

    // try not to hit the api limit
    await timeout(i * 2000);

    if (row[argv.locCol] === "") throw new Error(`Ort nicht angegeben: ${i}`);

    const addressRes = await rp(request);

    if (!addressRes.features[0])
      throw new Error(`Ort ${row[argv.locCol]} nicht gefunden`);

    console.log(
      i + 1,
      "/",
      nRows,
      row[argv.locCol],
      addressRes.features[0].geometry.coordinates
    );

    return {
      ...row,
      lat: addressRes.features[0].geometry.coordinates[1],
      lng: addressRes.features[0].geometry.coordinates[0],
    };
  } catch (e) {
    console.error(e.message);
    return {
      ...row,
      lat: null,
      lng: null,
    };
  }
});

Promise.all(geoCodedData).then((resolvedGeoCoded) => {
  const formatted = csvFormat(resolvedGeoCoded);

  fs.writeFileSync(argv.out, formatted, "utf8");
});
