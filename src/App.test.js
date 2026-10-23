import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { act } from 'react-dom/test-utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  global.chrome = { tabs: { query: jest.fn((_, callback) => callback([{ id: 1 }])), sendMessage: jest.fn() } };
  act(() => { ReactDOM.render(<App />, div); });
  expect(global.chrome.tabs.query).toHaveBeenCalledWith(
    { active: true, currentWindow: true }, expect.any(Function),
  );
  expect(global.chrome.tabs.sendMessage).toHaveBeenCalledWith(
    1, { header: 'table' }, undefined, expect.any(Function),
  );
  act(() => { ReactDOM.unmountComponentAtNode(div); });
  delete global.chrome;
});
