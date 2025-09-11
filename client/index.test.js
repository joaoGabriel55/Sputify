import fs from 'fs';
import path from 'path';
import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })

    var jsFiles = [
        'js/tracks.js'
    ];

    var scriptsContent = ``;
    for(var i =0; i < jsFiles.length; i++){
        console.log(__dirname + '/' + jsFiles[i])
      let scriptContent = fs.readFileSync( jsFiles[i], 'utf8');
      scriptsContent = scriptsContent + `
      /* ******************************************************************************************* */
      /* `+jsFiles[i]+` **************************************************************************** */
      `+scriptContent;
    };

    let scriptElement = dom.window.document.createElement('script');
    scriptElement.textContent = scriptsContent;
    scriptElement.defer = true;
    dom.window.document.head.appendChild(scriptElement);
    container = dom.window.document.body;
  });

  it('renders a heading', () => {
    const heading = getByText(container, 'Welcome to Sputify');
    expect(heading).toBeInTheDocument();
  });

  // it('renders the track list', () => {
  //   global.fetch = jest.fn(() => {
  //     console.log('Mock fetch called');

  //     Promise.resolve({
  //       json: () => Promise.resolve([
  //         { id: 1, title: 'Track 1', artist: 'Artist 1' },
  //         { id: 2, title: 'Track 2', artist: 'Artist 2' }
  //       ])
  //     })
  //   });

  //   const title1 = getByText(container, 'Track1');
  //   const title2 = getByText(container, 'Track2');
  //   const artist1 = getByText(container, 'Artist 1');
  //   const artist2 = getByText(container, 'Artist 2');

  //   expect(title1).toBeInTheDocument();
  //   expect(title2).toBeInTheDocument();
  //   expect(artist1).toBeInTheDocument();
  //   expect(artist2).toBeInTheDocument();
  // });
})