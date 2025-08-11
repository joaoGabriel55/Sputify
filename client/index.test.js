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
    container = dom.window.document.body
  });

  it('renders a heading', () => {
    const heading = getByText(container, 'Welcome to Sputify');
    expect(heading).toBeInTheDocument();
  });
})