/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          './App.tsx',
          './src/**/*.tsx'
     ],
     theme: {
          extend: {
               fontFamily: {
                    text: 'RoobertMedium',
                    title: 'RoobertBold',
                    main: 'RoobertHeavy'
               },
               colors: {
                    'white': '#FFFFFF',
                    gray: {
                         50: '#f1f1f1',
                         100: '#eaeaea',
                         200: '#d3d3d4',
                         300: '#727275',
                         400: '#676769',
                         500: '#5b5b5e',
                         600: '#565658',
                         700: '#444446',
                         800: '#333335',
                         900: '#282829',
                    },
                    green: {
                         50: '#e6f4ed',
                         100: '#daefe5',
                         200: '#b2dec8',
                         300: '#05944f',
                         400: '#058547',
                         500: '#04763f',
                         600: '#046f3b',
                         700: '#03592f',
                         800: '#024324',
                         900: '#02341c',
                    },
                    red: {
                         50: '#fce9e9',
                         100: '#fadede',
                         200: '#f4bcbc',
                         300: '#dc2626',
                         400: '#c62222',
                         500: '#b01e1e',
                         600: '#a51d1d',
                         700: '#841717',
                         800: '#631111',
                         900: '#4d0d0d',
                    }
               }
          },
     },
     plugins: [],
}

