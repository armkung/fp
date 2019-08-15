import * as fp from './index'

describe('fp', () => {
  describe('concat', () => {
    it('return array', () => {
      const result = fp.concat([])(1)

      expect(result).toEqual([1])
    })
    it('return array', () => {
      const result = fp.concat([])([1])

      expect(result).toEqual([1])
    })
  })
  describe('pipe', () => {
    it('return 2', () => {
      const result = fp.pipe(
        fp.nthArg(1)
      )(1, 2)

      expect(result).toEqual(2)
    })
  })
  describe('applySpec', () => {
    const data = { a: 1 }
    it('return object', () => {
      const result = fp.applySpec({ b: fp.get('a'), c: 2 })(data)

      expect(result).toEqual({ b: 1, c: 2 })
    })
  })
  describe('concatWith', () => {
    const data = [1]
    it('return array', () => {
      const result = fp.concatWith([2])(data)

      expect(result).toEqual([1, 2])
    })
  })
  describe('applyTo', () => {
    const fn = fp.identity
    it('return 1', () => {
      const result = fp.applyTo(1)(fn)

      expect(result).toEqual(1)
    })
    it('return 2', () => {
      const result = fp.applyTo([2])(fn)

      expect(result).toEqual(2)
    })
    it('return [3]', () => {
      const result = fp.applyTo([[3]])(fn)

      expect(result).toEqual([3])
    })
  })
  describe('objOf', () => {
    const data = 1
    it('return object', () => {
      const result = fp.objOf('a')(data)

      expect(result).toEqual({
        a: 1,
      })
    })
  })
  describe('is', () => {
    const data = 1
    it('return true', () => {
      const result = fp.is(Number)(data)

      expect(result).toEqual(true)
    })
  })
  describe('append', () => {
    const data = [1]
    it('return object', () => {
      const result = fp.append(2)(data)

      expect(result).toEqual([1, 2])
    })
  })
  describe('prepend', () => {
    const data = [1]
    it('return object', () => {
      const result = fp.prepend(2)(data)

      expect(result).toEqual([2, 1])
    })
  })
  describe('traverse', () => {
    const data = {
      a: {
        b: [
          {
            c: 1,
          },
        ],
        e: true,
      },
    }

    it('return object without mutation', () => {
      const fn = fp.traverse(
        fp.identity,
        (value, path, obj) => {
          if (fp.isNumber(value)) {
            return fp.set(path, value, obj)
          }
          return obj
        }
      )

      const result1 = fn({
        a: 1,
      })
      const result2 = fn({
        b: 2,
      })

      expect(result1).toEqual({ a: 1 })
      expect(result2).toEqual({ b: 2 })
    })

    it('return object', () => {
      const result = fp.traverse()(data)

      expect(result).toEqual(data)
    })

    it('return modified object', () => {
      const result = fp.traverse(
        fp.when(
          fp.overEvery([
            fp.isNumber,
            fp.pipe(
              fp.rest(fp.last),
              fp.get('a.e'),
              fp.isEqual(true)
            ),
          ]),
          fp.add(1)
        )
      )(data)

      expect(result).toEqual({
        a: {
          b: [
            {
              c: 2,
            },
          ],
          e: true,
        },
      })
    })

    it('return list', () => {
      const result = fp.traverse(
        fp.identity,
        (value, path, list) => fp.concat(list, [[path, value]]),
        []
      )(data)

      expect(result).toEqual([
        [['a'], { b: [{ c: 1 }], e: true }],
        [['a', 'b'], [{ c: 1 }]],
        [['a', 'b', '0'], { c: 1 }],
        [['a', 'b', '0', 'c'], 1],
        [['a', 'e'], true],
      ])
    })
  })

  describe('evolve', () => {
    const data = {
      a: {
        b: 1,
      },
    }
    it('return modified object', () => {
      const result = fp.evolve({
        a: {
          b: fp.add(1),
        },
      })(data)

      expect(result).toEqual({
        a: {
          b: 2,
        },
      })
    })
  })
})
