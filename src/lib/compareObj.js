/*
  Step 1: Check if both objects have same number of keys
*/

function keyNum(k1, k2) {
    return k1.length === k2.length;
}

/*
Step 2: put objects in the correct order
*/

function changeOrder(o1, o2) {
    /* This will check that all keys are equal and exist also
        * The first object's keys will look like this in array form: [a, b, c, d]
        * The next object's keys will probably be out of order relative to the first object's keys: [b, d, a, c]
        * The iterator will start on the first key of the first array and find it in the second, and create a new object in order
        * 
        * Example of first iteration:
        * 
        * (values of each key will obviously come with the key)
        * 
        *     ▼
        *    [a, b, c, d]
        *      
        *           ▼
        *    [b, d, a, c]
        * 
        *    new:
        *    [a]
        * 
        */

    let newObj = {};
    let equal = false;

    let baseObjKeys = Object.keys(o1);

    let returnObj = {
        newObj: "",
        equal: equal
    }

    for(let i = 0; i < baseObjKeys.length; i++) {
        if(typeof o2[baseObjKeys[i]] === 'undefined') {
            return returnObj;
        }

        newObj[baseObjKeys[i]] = o2[baseObjKeys[i]];
    }

    equal = true;

    returnObj = {
        newObj: newObj,
        equal: equal
    }

    return returnObj;
}

/*
Step 3: Check if all the values with respect to their corresponding keys are equal
*/

function valEqu(o1, o2, k1) {
    for(let i = 0; i < k1.length; i++) {
        if(o1[k1[i]] !== o2[k1[i]]) {
            return false;
        }
    }

    return true;
}

/*
If all of these checks pass, the objects are equal.
*/

export default function compareObj (o1, o2) {
    let k1 = Object.getOwnPropertyNames(o1);
    let k2 = Object.getOwnPropertyNames(o2);

    let keyNumB = keyNum(k1, k2);
    let changeOrderB = changeOrder(o1, o2);
    // let keyEquB = keyEqu(k1, k2);
    let valEquB = valEqu(o1, changeOrderB.newObj, k1);

    if(keyNumB === true && changeOrderB.equal === true && valEquB === true) {
        return true;
    }

    return false;
}