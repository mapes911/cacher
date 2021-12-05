// in-memory results cache.
// this could just as easily be moved to a key/value store like memcached or redis
// but will assume that we don't want to include something like that for this exercise.
let functionResultCache = {};

/**
 * Register a function to cache. This will return a function that, when called,
 * will check if it has already computed the result for that function and corresponding
 * arguments, and return that value instead of calling the original function.
 * 
 * @param {callback} functionToCache 
 * @returns {registerCacheFunction~inner}
 */
const registerCacheFunction = (functionToCache) => {
    const baseCacheKey = functionToCache.name.toLowerCase()

    /**
     * Cached function, which when called will first calculate a 'cacheKey'
     * based on the original function name and the arguments passed in.
     * Using the cacheKey it will attempt to return the value from the cache,
     * otherwise it will call the original function, cache the results and return the result.
     * 
     * @param  {...any} args 
     * @returns {*}
     */
    const cachedFunction = (...args) => {
        const argsString = args.map((arg) => `-${arg}`).join('')
        const cacheKey = `${baseCacheKey}${argsString}`

        if (functionResultCache.hasOwnProperty(cacheKey)) {
            return functionResultCache[cacheKey]
        }

        const result = functionToCache(...args)
        functionResultCache[cacheKey] = result
        return result
    }

    return cachedFunction;
}

export default registerCacheFunction
