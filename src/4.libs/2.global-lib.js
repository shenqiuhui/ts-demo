function globalLib(options) {
  console.log('globalLib', options)
}

globalLib.version = '1.0.0'

globalLib.doSomething = function () {
  console.log('globalLib do something')
}
