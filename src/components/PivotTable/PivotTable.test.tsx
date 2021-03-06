import * as React from 'react';
import { shallow } from 'enzyme';
import { Span, TableRowKeyValues, TableColumnMetrics, prettifyNumber } from './index';

const rowSubResultText = 'Total';
const rows: [string, string[]][] = [
  ['Homes', ['Condo', 'Townhouse', 'Semi-detached', 'Detached', 'Trailer']],
  ['Jobs', ['Engineer', 'Designer', 'Product Manager', 'Marketer', 'Customer Success', 'People Operations']],
  ['Vehicles', ['Sedan', 'Minivan', 'Pickup Truck', 'Sport']],
];

const expectedRowVals: [string, string[]][] = JSON.parse(JSON.stringify(rows))
.map((row: [string, string[]]) => {
  row[1].push(`${row[0]} Total`);
  return row;
});

const columns: [string | number, number[][]][] = [
  ['Condo', [
    [13425, 621352, 634123, 42135, 21516],
    [9175123, 391723, 283615566, 21757],
    [973621, 259673, 4589193, 12369, 86886, 8572812]
  ]],
  ['Engineer', [
    [213, 9, 82, 98, 762],
    [45, 866, 65, 11, 20]
  ]]
];

describe('<PivotTable>', () => {
  describe('renders <TableRowKeyValues>', () => {
    it('with correct values', () => {
      const wrapper = shallow(<TableRowKeyValues rows={rows} rowSubResultText={rowSubResultText} />);
      const values = wrapper.find(Span);
      let valIdx = 0;

      expectedRowVals.forEach(([cat, subCats]) => {
        const catVal = values.get(valIdx);
        expect(catVal && catVal.props.children).toBe(cat);
        valIdx += 1;

        subCats.forEach(s => {
          const val = values.get(valIdx);
          expect(val && val.props.children).toBe(s);
          valIdx += 1;
        });
      });
    });
  });

  describe('renders <TableColumnMetrics>', () => {
    it('with correct values', () => {
      const wrapper = shallow(<TableColumnMetrics columns={columns} />); 
      const values = wrapper.find(Span);
      let valIdx = 0;

      columns.forEach(([title, cols], i) => {
        expect(wrapper.find('TableColumnTitle').get(i).props.children).toBe(title);

        cols.forEach(metrics => {
          metrics.forEach(n => {
            const val = values.get(valIdx);
            expect(val && val.props.children).toBe(prettifyNumber(n));
            valIdx += 1;
          });
        });
      });
    });
  });
});
