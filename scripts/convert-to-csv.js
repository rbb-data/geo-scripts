const { dsvFormat, csvFormat } = require('d3-dsv')
const fs = require('fs')

const args = process.argv.slice(2)

const rawData = fs.readFileSync(args[0], 'utf8')

const parser = dsvFormat(',')
const csv = parser.parse(rawData)

const places = csv.map((row, idx) => ({
  id: idx,
  name: row.Vorname + row.Nachname,
  place: row.Ort,
  lat: row.lat,
  lng: row.lng
}))

const formatted = csvFormat(places)

fs.writeFileSync(args[1], formatted, 'utf8')

console.log('done')
