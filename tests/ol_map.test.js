const newOLmap = require('../js/ol_map.js');
const lonlat = "-116.989193,32.743617";

test('Outputs the code for an OpenLayers Map', () => {
    expect(newOLmap(lonlat)).toBe('new map');
});