import * as assert from 'assert';
import {
    centroid, distance, distanceMoreThan, sameLocation, squaredDistance
  } from './locations';


describe('locations', function() {

  it('sameLocations', function() {
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 0, y: 0}), true);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 0, y: 1}), true);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 1, y: 0}), true);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 1, y: 1}), true);

    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 1, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 0}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 1, y: 0}), false);
    assert.strictEqual(sameLocation({x: 0, y: 1}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 1, y: 0}, {x: 1, y: 1}), false);

    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 0, y: 0}), false);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 0, y: 1}), false);
    assert.strictEqual(sameLocation({x: 1, y: 1}, {x: 1, y: 0}), false);
  });

  it('squaredDistance', function() {
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 1, y: 1}), 2);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 0, y: 1}), 1);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 1, y: 0}), 1);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 2, y: 0}), 4);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 0, y: 2}), 4);
    assert.strictEqual(squaredDistance({x: 0, y: 0}, {x: 2, y: 2}), 8);
  });

  it('distance', function() {
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 1, y: 1}) - Math.sqrt(2)) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 0, y: 1}) - 1) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 1, y: 0}) - 1) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 2, y: 0}) - 2) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 0, y: 2}) - 2) < 1e-3);
    assert.ok(Math.abs(distance({x: 0, y: 0}, {x: 2, y: 2}) - Math.sqrt(8)) < 1e-3);
  });

  it('centroid', function() {
    assert.deepStrictEqual(centroid([{x: 0, y: 1}]), {x: 0, y: 1});
    assert.deepStrictEqual(centroid([{x: 1, y: 2}]), {x: 1, y: 2});

    assert.deepStrictEqual(centroid([{x: 0, y: 0}, {x: 1, y: 2}]), {x: 0.5, y: 1});
    assert.deepStrictEqual(centroid([{x: 0, y: 0}, {x: 1, y: 2}]), {x: 0.5, y: 1});
    assert.deepStrictEqual(centroid([{x: 0, y: 1}, {x: 1, y: 2}]), {x: 0.5, y: 1.5});
    assert.deepStrictEqual(
        centroid([{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 3}]), {x: 1, y: 2});
  });

  it('distanceMoreThan', function() {
    // TODO: write these in task 3
    /**
     * Statement/ Branch Coverage:
     * 1. no ifs
     * 2. x < region.x1 only
     * 3. x < region.x2 only
     * 4. y < region.y1 only
     * 5. y < region.y2 only
     * 
     * 6. x < region.x1 AND y < region.y1
     * 7. x < region.x1 AND y < region.y2
     * 
     * 8. x < region.x2 AND y < region.y1
     * 9. x < region.x2 AND y < region.y2
     */
    assert.deepStrictEqual(distanceMoreThan({x: 100, y: 100}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), false);
    assert.deepStrictEqual(distanceMoreThan({x: 17, y: 100}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), true);
    assert.deepStrictEqual(distanceMoreThan({x: 70, y: 100}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), false);
    assert.deepStrictEqual(distanceMoreThan({x: 100, y: 19}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), false);
    assert.deepStrictEqual(distanceMoreThan({x: 100, y: 42}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), true);

    assert.deepStrictEqual(distanceMoreThan({x: 17, y: 19}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), true);
    assert.deepStrictEqual(distanceMoreThan({x: 17, y: 38}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), true);

    assert.deepStrictEqual(distanceMoreThan({x: 70, y: 19}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), false);
    assert.deepStrictEqual(distanceMoreThan({x: 70, y: 38}, {x1: 34, y1: 20, x2: 55, y2: 60}, 11), true);
  });

});