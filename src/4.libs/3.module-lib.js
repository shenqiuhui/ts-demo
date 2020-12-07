const version = '1.0.0'

function doSomething() {
  console.log('moduleLib do sonmething')
}

function moduleLib(options) {
  console.log('moduleLib', options)
}

moduleLib.version = version
moduleLib.doSomething = doSomething

module.exports = moduleLib
