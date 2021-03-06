let get = require('../get');

suite('GET /device', async function() {
  test('device info', async function() {
    let res = await get(3000, '/device');
    let device = JSON.parse(res.body);
    device.dimensions.should.deep.equal([480, 854]);
    device.inputEvent.should.equal('/dev/input/event0');
    device.density.should.equal(320);
    device.pixelRatio.should.equal(2);
  });

  test('gaia commit', async function() {
    let res = await get(3000, '/device');
    let {sha, timestamp} = JSON.parse(res.body).gaia;
    sha.should.equal('f75bd584aca0a751a5bed115800250faa8412927');
    timestamp.should.equal('1445236798');
  });

  test('gecko commit', async function() {
    let res = await get(3000, '/device');
    let sha = JSON.parse(res.body).gecko;
    sha.should.equal('61dcc13d0848230382d5c85cdcf6721a05ee37c6');
  });

  test('target specific device', async function() {
    let res = await get(3000, '/device', {
      headers: {'X-Android-Serial': '04fb7d5bc6d37039'}
    });
    let {sha, timestamp} = JSON.parse(res.body).gaia;
    sha.should.equal('f75bd584aca0a751a5bed115800250faa8412927');
    timestamp.should.equal('1445236798');
  });

  test('target different device', async function() {
    let res = await get(3000, '/device', {
      headers: {'X-Android-Serial': 'f30eccef'}
    });
    let {sha, timestamp} = JSON.parse(res.body).gaia;
    sha.should.equal('f75bd584aca0a751a5bed115800250faa8412927');
    timestamp.should.equal('1445236798');
  });

  test('target specific device via URL path', async function() {
    let res = await get(3000, '/devices/04fb7d5bc6d37039');
    let {sha, timestamp} = JSON.parse(res.body).gaia;
    sha.should.equal('f75bd584aca0a751a5bed115800250faa8412927');
    timestamp.should.equal('1445236798');
  });

  test('target different device via URL path', async function() {
    let res = await get(3000, '/devices/f30eccef');
    let {sha, timestamp} = JSON.parse(res.body).gaia;
    sha.should.equal('f75bd584aca0a751a5bed115800250faa8412927');
    timestamp.should.equal('1445236798');
  });
});
