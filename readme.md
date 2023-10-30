# Wasm Safari bug test

While working on ogv.js WebAssembly codecs I found that the version of
the dav1d AV1 decoder I was using, at -O3, produces a failure in at
least some cases on ARM64 Safari but not on x86_64 Safari, or on other
browsers.

Bug seems to go back at least 6 months from old WebKit nightlies I tested
and remains in latest.

The symptom is a failed signature validation for call_indirect, which is
likely due to corruption of a function pointer.

Live copy at

https://brionv.com/misc/wasm-safari-bug/

Source/deps

* test case - https://github.com/brion/wasm-safari-bug
* upstream ogv.js - https://github.com/brion/ogv.js tag wasm-safari-bug-1
* upstream dav1d - https://code.videolan.org/brion/dav1d - tag wasm-simd6
* emscripten 3.1.47

-- brion vibber
2023-10-30
