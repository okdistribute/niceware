# niceware-eff

This package is a fork of niceware that uses a wordlist based on the [EFF's New Wordlists for Random Passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases). Because this wordlist is much smaller, it is only useful in scenarios such where brute force attacks are minimized by some other mechanism, such as only giving attackers one chance to guess the password.

## Usage in Node

To install:

```
npm install niceware
```

To generate an 8-byte passphrase:

```
const niceware = require('niceware')

// The number of bytes must be even
const passphrase = niceware.generatePassphrase(8)

// Result: [ 'deathtrap', 'stegosaur', 'nilled', 'nonscheduled' ]
```

## Usage in browser

To use Niceware in modern browsers, include
[browser/niceware.js](browser/niceware.js) in a script
tag. Niceware is then available in the `window.niceware` object.

```
<script src='niceware.js'></script>
<script>
  const passphrase = window.niceware.generatePassphrase(8)
</script>
```

Niceware uses `window.{crypto, msCrypto}.getRandomValues` for entropy in the browser.

## Docs

NOTE: When used in the browser, `Buffer` is replaced with `window.Uint8Array`.

* [niceware](#exp_module_niceware--niceware) ⏏
    * [.bytesToPassphrase(bytes)](#module_niceware--niceware.bytesToPassphrase) ⇒ <code>Array.&lt;string&gt;</code>
    * [.passphraseToBytes(words)](#module_niceware--niceware.passphraseToBytes) ⇒ <code>Buffer</code>
    * [.generatePassphrase(size)](#module_niceware--niceware.generatePassphrase) ⇒ <code>Array.&lt;string&gt;</code>

<a name="exp_module_niceware--niceware"></a>

### niceware ⏏
**Kind**: Exported constant  
<a name="module_niceware--niceware.bytesToPassphrase"></a>

#### niceware.bytesToPassphrase(bytes) ⇒ <code>Array.&lt;string&gt;</code>
Converts a byte array into a passphrase.

**Kind**: static method of [<code>niceware</code>](#exp_module_niceware--niceware)  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Buffer</code> | The bytes to convert |

<a name="module_niceware--niceware.passphraseToBytes"></a>

#### niceware.passphraseToBytes(words) ⇒ <code>Buffer</code>
Converts a phrase back into the original byte array.

**Kind**: static method of [<code>niceware</code>](#exp_module_niceware--niceware)  

| Param | Type | Description |
| --- | --- | --- |
| words | <code>Array.&lt;string&gt;</code> | The words to convert |

<a name="module_niceware--niceware.generatePassphrase"></a>

#### niceware.generatePassphrase(size) ⇒ <code>Array.&lt;string&gt;</code>
Generates a random passphrase with the specified number of bytes.
NOTE: `size` must be an even number.

**Kind**: static method of [<code>niceware</code>](#exp_module_niceware--niceware)  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The number of random bytes to use |


## Niceware ports

* Chrome extension, thanks to Noah Feder: https://chrome.google.com/webstore/detail/niceware-password/dhnichgmciickpnnnhfcljljnfomadag
* pip package, thanks to Alex Willmer: https://pypi.python.org/pypi/niceware
* CLI, thanks to Alex Cross: https://www.npmjs.com/package/nicepass

## Credits

Niceware was inspired by
[Diceware](http://world.std.com/~reinhold/diceware.html). Its wordlist is
derived from [the SIL English word list](https://web.archive.org/web/20180803153208/http://www-01.sil.org/linguistics/wordlists/english/). This project
is based on my work on OpenPGP key backup for the Yahoo
[End-to-End](https://github.com/yahoo/end-to-end) project.
