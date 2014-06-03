module.exports = (debug) ->
  ResourceWriteQueue = require('./resource_write_queue')(debug)

  class CachedResourceManager
    constructor: (@$timeout) ->
      @queuesByKey = {}

    keys: ->
      Object.keys @queuesByKey

    add: (CachedResource) ->
      @queuesByKey[CachedResource.$key] = new ResourceWriteQueue(CachedResource, @$timeout)

    getQueue: (CachedResource) ->
      @queuesByKey[CachedResource.$key]

    flushQueues: ->
      queue.flush() for key, queue of @queuesByKey
