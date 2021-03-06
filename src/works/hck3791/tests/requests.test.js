import { expect, fixture, html } from '@open-wc/testing';
import '../components/requests-component';
import { requests } from './data-test';

describe('Requests test', () => {
  let el, rows, cells;

  before(async () => {
    const component = html`<requests-component .data=${requests}></requests-component>`;
    el = await fixture(component);
    rows = el.shadowRoot.querySelectorAll('tr');
    cells = rows[1].querySelectorAll('td');
  });

  it('Number of rows/cells', async () => {
    expect(rows.length).to.equal(6);
    expect(cells.length).to.equal(2);
  });

  it('Generate links', async () => {
    const link = cells[0].firstChild;
    expect(link.nodeName).to.equal('A');
    expect(link.getAttribute('href')).to.not.equal('');
  });
});
