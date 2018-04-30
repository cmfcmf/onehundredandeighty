const expect = require('chai').expect;

describe('MultiMap.js', () => {
    const MultiMap = require('../../js/MultiMap.js');
    it('creates empty lists for nen-existent keys', () => {
        const m = new MultiMap();
        expect(m.get('foo').length).to.eq([].length);
        expect(m.get('trolololol').length).to.eq([].length);
    });
    it('stores values', () => {
        const m = new MultiMap();
        m.push('test_list', 42);
        m.push('test_list', 1234);
        m.push('test_list_2', 'foo');
        expect(m.get('test_list').length).to.eq(2);
        expect(m.get('test_list')[0]).to.eq(42);
        expect(m.get('test_list')[1]).to.eq(1234);
        expect(m.get('test_list_2').length).to.eq(1);
        expect(m.get('test_list_2')[0]).to.eq('foo');
    });
});