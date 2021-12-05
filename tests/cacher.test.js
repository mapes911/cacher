import registerCacheFunction from '../src/cacher'

describe('Cache Add Function', () => {
    const addMock = jest.fn((a, b) => a + b)
    let cachedAddFunc = registerCacheFunction(addMock)

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('calls add function once', () => {
        const result = cachedAddFunc(10, 20)
        expect(result).toBe(30)
        expect(addMock.mock.calls.length).toBe(1)
        expect(addMock.mock.calls[0][0]).toBe(10)
        expect(addMock.mock.calls[0][1]).toBe(20)
    }) 
    
    test('returns cached result on second call', () => {
        const result1 = cachedAddFunc(20, 30)
        const result2 = cachedAddFunc(20, 30)
        expect(result1).toBe(50)
        expect(result2).toBe(50)
        expect(addMock.mock.calls.length).toBe(1)
        expect(addMock.mock.calls[0][0]).toBe(20)
        expect(addMock.mock.calls[0][1]).toBe(30)
    }) 
    
    test('calls function again on new args', () => {
        const result1 = cachedAddFunc(40, 50)
        const result2 = cachedAddFunc(40, 50)
        const result3 = cachedAddFunc(60, 70)
        expect(result1).toBe(90)
        expect(result2).toBe(90)
        expect(result3).toBe(130)
        expect(addMock.mock.calls.length).toBe(2)
    })
})

describe('Cache Concat Function with arbitrary number of args', () => {
    const concatMock = jest.fn((...args) => args.map((arg) => arg).join(' '))
    let cachedConcatFunc = registerCacheFunction(concatMock)

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('calls concat function once', () => {
        const result = cachedConcatFunc(10, 'and', 200)
        expect(result).toBe('10 and 200')
        expect(concatMock.mock.calls.length).toBe(1)
        expect(concatMock.mock.calls[0][0]).toBe(10)
        expect(concatMock.mock.calls[0][1]).toBe('and')
        expect(concatMock.mock.calls[0][2]).toBe(200)
    }) 
    
    test('returns cached result on second call', () => {
        const result1 = cachedConcatFunc('strings', 'are', 'cool')
        const result2 = cachedConcatFunc('strings', 'are', 'cool')
        expect(result1).toBe('strings are cool')
        expect(result2).toBe('strings are cool')
        expect(concatMock.mock.calls.length).toBe(1)
        expect(concatMock.mock.calls[0][0]).toBe('strings')
        expect(concatMock.mock.calls[0][1]).toBe('are')
        expect(concatMock.mock.calls[0][2]).toBe('cool')
    }) 
    
    test('calls function again on new args', () => {
        const result1 = cachedConcatFunc('how', 'many', 'args', 20)
        const result2 = cachedConcatFunc('how', 'many', 'args', 20)
        const result3 = cachedConcatFunc('these', 'are', 'different')
        expect(result1).toBe('how many args 20')
        expect(result2).toBe('how many args 20')
        expect(result3).toBe('these are different')
        expect(concatMock.mock.calls.length).toBe(2)
    })
})

describe('Cache with different function names', () => {
    const add = (a, b) => a + b
    const sub = (a, b) => a - b
    let cachedAddFunc = registerCacheFunction(add)
    let cachedSubFunc = registerCacheFunction(sub)

    test('generates proper keys', () => {
        expect(cachedAddFunc(10, 10)).toBe(20)
        expect(cachedSubFunc(10, 10)).toBe(0)
        expect(cachedAddFunc(10, 10)).toBe(20)
        expect(cachedAddFunc(50, 50)).toBe(100)
        expect(cachedSubFunc(50, 50)).toBe(0)
    })
})