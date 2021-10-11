const { dsvFormat } = require('d3-dsv')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
  .map((filename) => path.isAbsolute(filename)
    ? filename
    : path.join(__dirname, filename))

const rawData = fs.readFileSync(args[0], 'utf8')

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const features = csv
  .map((row, idx) => {
    // usually lat lng are supplied with `,` instead of `,` as decimal seperator <- fix this
    // also reducing the resolution with `toFixed` can save a lot of file size
    const lat = parseFloat(row.lat.replace(',', '.')).toFixed(3)
    const lng = parseFloat(row.lng.replace(',', '.')).toFixed(3)

    return {
      type: 'Feature',
      properties: {
        id: '' + idx,
        name: row.Vorname + row.Nachname,
        place: row.Ort
      },
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    }
  })

const geojson = {
  type: 'FeatureCollection',
  features: features
}

const formatted = JSON.stringify(geojson)

fs.writeFileSync(args[1], formatted, 'utf8')

console.log('done')
