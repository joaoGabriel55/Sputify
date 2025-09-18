import fs from 'fs';
import path from 'path';
import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');

let dom;
let container;

// jest.mock('./js/tracks.js', () => ({
//   fetchTracks: jest.fn(() => Promise.resolve([
//     { id: 1, title: 'Track 1', artist: 'Artist 1' },
//     { id: 2, title: 'Track 2', artist: 'Artist 2' }
//   ])),
//   fetchTrack: jest.fn((id) => Promise.resolve(
//     { id: id, title: `Track ${id}`, artist: `Artist ${id}` }
//   ))
// }));

describe('index.html', () => {
  beforeEach(() => {
    // require('./api/index.js')
    // require('./js/tracks.js')
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    
    dom.window.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, title: 'Track 1', artist: 'Artist 1' },
        { id: 2, title: 'Track 2', artist: 'Artist 2' }
      ])
    }));
    
    container = dom.window.document.body;
    dom.window.document.body.innerHTML = html;
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clear mock calls between tests
  });

  it('renders a heading', () => {
    const heading = getByText(container, 'Welcome to Sputify');
    expect(heading).toBeInTheDocument();
  });

  it('renders the track list', async () => {
    dom.window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, title: 'Track 1', artist: 'Artist 1' },
        { id: 2, title: 'Track 2', artist: 'Artist 2' }
      ])
    });
    
     const title1 = getByText(container, 'Track 1');
      const title2 = getByText(container, 'Track 2');
      const artist1 = getByText(container, 'Artist 1');
      const artist2 = getByText(container, 'Artist 2');

      expect(title1).toBeInTheDocument();
      expect(title2).toBeInTheDocument();
      expect(artist1).toBeInTheDocument();
      expect(artist2).toBeInTheDocument();
  });
})