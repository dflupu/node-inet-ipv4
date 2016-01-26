# inet_ipv4
====

Install with:

```shell
$ npm install inet_ipv4
```

Usage:

```javascript
var inet_ipv4 = require('inet_ipv4');

inet_ipv4.aton('192.168.0.1')
// 3232235521

inet_ipv4.ntoa(3232235521)
// '192.168.0.1'

inet_ipv4.normalize('255.255.0x0001')
inet_ipv4.normalize('0xff000001')
inet_ipv4.normalize('037700000001')
// '255.255.0.1'

inet_ipv4.isValid('255.255.255.255')
// true
```

API Documentation
-----------------

### aton(str) -> int
http://linux.die.net/man/3/inet_aton
Returns null if the parameter is invalid.

### ntoa(int) -> str
http://linux.die.net/man/3/inet_ntoa
Returns null if the parameter is invalid.

### normalize(str) -> str
Converts the ip given as a parameter to a 4 part string format.
Returns null if the parameter is invalid.

### isValid(str) -> bool
Uses a regex to check if the parameter is a 4 part ip representation.

Tests
===============

```shell
$ npm test
```
