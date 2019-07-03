/* eslint-disable */

import * as fp from 'lodash/fp'

const _fp = {}

// no curry
_fp.ifElse = (predicate, whenTrueFn, whenFalseFn) => (...args) =>
  predicate(...args) ? whenTrueFn(...args) : whenFalseFn(...args)

_fp.when = (predicate, whenTrueFn) => (...args) =>
  _fp.ifElse(predicate, whenTrueFn, fp.identity)(...args)

_fp.applyTo = (...args) => fn => fp.apply(fn)(fp.flatten(args))

_fp.traverse = (
  transform = fp.identity,
  fn = (value, path, obj) => fp.set(path, value, obj),
  result = {}
) =>
  function reduce(acc, keys = []) {
    return _fp.when(
      fp.overSome([fp.isArray, fp.isPlainObject]),
      fp.pipe(
        fp.toPairs,
        fp.map(([key, value]) => {
          const path = keys.concat(key)
          const mappedValue = transform(value, path, fp.get(key, acc), result)
          result = fn(mappedValue, path, result)

          reduce(mappedValue, path)
        }),
        () => result
      )
    )(acc)
  }

// curry
export * from 'lodash/fp'

_fp.dropRightWhileWithKey = fp.dropRightWhile.convert({ cap: false })
_fp.dropWhileWithKey = fp.dropWhile.convert({ cap: false })
_fp.everyWithKey = fp.every.convert({ cap: false })
_fp.filterWithKey = fp.filter.convert({ cap: false })
_fp.findWithKey = fp.find.convert({ cap: false })
_fp.findFromWithKey = fp.findFrom.convert({ cap: false })
_fp.findIndexWithKey = fp.findIndex.convert({ cap: false })
_fp.findIndexFromWithKey = fp.findIndexFrom.convert({ cap: false })
_fp.findKeyWithKey = fp.findKey.convert({ cap: false })
_fp.findLastWithKey = fp.findLast.convert({ cap: false })
_fp.findLastFromWithKey = fp.findLastFrom.convert({ cap: false })
_fp.findLastIndexWithKey = fp.findLastIndex.convert({ cap: false })
_fp.findLastIndexFromWithKey = fp.findLastIndexFrom.convert({ cap: false })
_fp.findLastKeyWithKey = fp.findLastKey.convert({ cap: false })
_fp.flatMapWithKey = fp.flatMap.convert({ cap: false })
_fp.flatMapDeepWithKey = fp.flatMapDeep.convert({ cap: false })
_fp.flatMapDepthWithKey = fp.flatMapDepth.convert({ cap: false })
_fp.forEachWithKey = fp.forEach.convert({ cap: false })
_fp.forEachRightWithKey = fp.forEachRight.convert({ cap: false })
_fp.forInWithKey = fp.forIn.convert({ cap: false })
_fp.forInRightWithKey = fp.forInRight.convert({ cap: false })
_fp.forOwnWithKey = fp.forOwn.convert({ cap: false })
_fp.forOwnRightWithKey = fp.forOwnRight.convert({ cap: false })
_fp.mapWithKey = fp.map.convert({ cap: false })
_fp.mapKeysWithKey = fp.mapKeys.convert({ cap: false })
_fp.mapValuesWithKey = fp.mapValues.convert({ cap: false })
_fp.partitionWithKey = fp.partition.convert({ cap: false })
_fp.rejectWithKey = fp.reject.convert({ cap: false })
_fp.removeWithKey = fp.remove.convert({ cap: false })
_fp.someWithKey = fp.some.convert({ cap: false })
_fp.takeRightWhileWithKey = fp.takeRightWhile.convert({ cap: false })
_fp.takeWhileWithKey = fp.takeWhile.convert({ cap: false })
_fp.timesWithKey = fp.times.convert({ cap: false })

_fp.concatWith = fp.concat.convert({ rearg: true })

_fp.is = fp.curry(
  (constructor, value) =>
    /* istanbul ignore next */
    (value != null && value.constructor === constructor) || value instanceof constructor
)

_fp.evolve = fp.curry(function evolve(transformations, object) {
  const result = {}
  let transformation
  let key
  let type
  for (key in object) {
    transformation = transformations[key]
    type = typeof transformation
    /* istanbul ignore next */
    result[key] =
      type === 'function'
        ? transformation(object[key])
        : transformation && type === 'object'
        ? evolve(transformation, object[key])
        : object[key]
  }
  return result
})

_fp.applySpec = fp.curry((destObj, srcObj) =>
  fp.mapValues(_fp.ifElse(fp.isFunction, _fp.applyTo(srcObj), fp.identity), destObj)
)

_fp.append = fp.curry((elem, list) => fp.concat(list, [elem]))

_fp.prepend = fp.curry((elem, list) => fp.concat([elem], list))

_fp.objOf = fp.curry((key, value) => fp.set(key, value, {}))

export default fp => {
  Object.keys(_fp).forEach((key) => {
    fp[key] = _fp[key]
  })
}
