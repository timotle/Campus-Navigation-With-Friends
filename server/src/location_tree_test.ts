import * as assert from 'assert';
import { buildTree, closestInTree, findClosestInTree, LocationTree } from './location_tree';
import { Region, Location } from './locations';


describe('location_tree', function() {

  it('buildTree', function() {
    assert.deepStrictEqual(buildTree([]), {kind: "empty"});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}]),
        {kind: "single", loc: {x: 1, y: 1}});
    assert.deepStrictEqual(buildTree([{x: 2, y: 2}]),
        {kind: "single", loc: {x: 2, y: 2}});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}, {x: 3, y: 3}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "single", loc: {x: 1, y: 1}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "single", loc: {x: 3, y: 3}}});
    assert.deepStrictEqual(buildTree([{x: 1, y: 3}, {x: 3, y: 1}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "empty"},
         ne: {kind: "single", loc: {x: 3, y: 1}},
         sw: {kind: "single", loc: {x: 1, y: 3}},
         se: {kind: "empty"}});

    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
    assert.deepStrictEqual(buildTree(
        [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}]),
        {kind: "split", at: {x: 2, y: 2},
          nw: {kind: "split", at: {x: 0.5, y: 0.5},
            nw: {kind: "single", loc: {x: 0, y: 0}},
            ne: {kind: "empty"},
            sw: {kind: "empty"},
            se: {kind: "single", loc: {x: 1, y: 1}}},
          ne: {kind: "empty"},
          sw: {kind: "empty"},
          se: {kind: "split", at: {x: 3, y: 3},
              nw: {kind: "single", loc: {x: 2, y: 2}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "split", at: {x: 3.5, y: 3.5},
                nw: {kind: "single", loc: {x: 3, y: 3}},
                ne: {kind: "empty"},
                sw: {kind: "empty"},
                se: {kind: "single", loc: {x: 4, y: 4}}}}});
    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 3}, {x: 7, y: 1},
         {x: 1, y: 7}, {x: 3, y: 5}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "split", at: {x: 6, y: 2},
              nw: {kind: "empty"},
              sw: {kind: "single", loc: {x: 5, y: 3}},
              ne: {kind: "single", loc: {x: 7, y: 1}},
              se: {kind: "empty"}},
         sw: {kind: "split", at: {x: 2, y: 6},
              nw: {kind: "empty"},
              ne: {kind: "single", loc: {x: 3, y: 5}},
              sw: {kind: "single", loc: {x: 1, y: 7}},
              se: {kind: "empty"}},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
  });

  it('closestInTree', function() {
    // TODO: implement this in Task 4
    /**
     * Branch/ Statement Coverage:
     */
    const testRegion: Region = {x1: 0, x2: 6, y1: 0, y2: 6};
    const locs: Location[] = [{x: 0, y: 0}, {x: 2, y: 2}, {x: 4, y: 4}, {x: 6, y: 6}];
    const tree: LocationTree = buildTree(locs);
    assert.deepStrictEqual(closestInTree(tree, locs[1], testRegion, {loc: undefined, dist: Infinity}), 
                            {loc: locs[1], dist: 0});

    const tree1: LocationTree = {kind: "single", loc: {x: 1, y: 1}};
    const testRegion1: Region = {x1: 0, x2: 10, y1: 0, y2: 10};
    const output1 = closestInTree(tree1, {x: 4, y: 5}, testRegion1, {loc: undefined, dist: Infinity})
    assert.deepStrictEqual(output1.loc, {x: 1, y: 1});

    const locs2: Location[] = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 4, y: 4}, {x: 6, y: 6}];
    const tree2: LocationTree = buildTree(locs2);
    const output2 = closestInTree(tree2, {x: 0, y: 0}, testRegion1, {loc: undefined, dist: Infinity});
    assert.deepStrictEqual(output2.loc, {x: 1, y: 1})

    const locs3: Location[] = [{x: 6, y: 6}, {x: 5, y: 5}, {x: 7, y: 7}];
    const tree3: LocationTree = buildTree(locs3);
    const output3 = closestInTree(tree3, {x: 10, y: 10}, testRegion1, {loc: undefined, dist: Infinity});
    assert.deepStrictEqual(output3.loc, {x: 7, y: 7});

    const locs4: Location[] = [{x: 1, y: 1}, {x: 9, y: 9}];
    const tree4: LocationTree = buildTree(locs4);
    const initial = {loc: {x: 1, y: 1}, dist: 1};
    const output4 = closestInTree(tree4, {x: 1, y: 2}, testRegion1, initial);
    assert.deepStrictEqual(output4, initial);
  });

// TODO: uncomment these in Task 4
  it('findClosestInTree', function() {
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 2, y: 1}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 3}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: 4.9, y: 4.9}]),
      [{x: 5, y: 5}, Math.sqrt((5-4.9)**2+(5-4.9)**2)]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: -1, y: -1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 4, y: 1}, {x: -1, y: -1}, {x: 10, y: 10}]),
      [{x: 5, y: 1}, 1]);
  });
});