
const { writeFileSync, mkdirSync } = require('fs')

require( 'dotenv' ).config();

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'


const mapboxKey = process.env['MAPBOX_KEY'];

if ( !mapboxKey ) {
    throw new Error('MAPBBOX_KEY is required')
}

const envFileContent =   `
    export const environment = {
        mapboxkey: "${ mapboxKey } "
    }
`

mkdirSync( './src/environments',{ recursive: true } )

writeFileSync( targetPath, envFileContent )
writeFileSync( targetPathDev, envFileContent )

