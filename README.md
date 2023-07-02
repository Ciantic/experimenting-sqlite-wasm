# Just testing SQLite.org's WASM module

Deno benchmark of index.ts below:

```bash
deno bench -A index.ts`
```

```
sqlite3 version 3.42.0 2023-05-16 12:36:15 831d0fb2836b71c9bc51067c49fee4b8f18047814f2ff22d817d25195cf350b0

benchmark               time (avg)             (min … max)       p75       p99      p995
---------------------------------------------------------- -----------------------------
SelectObjects           52.17 ms/iter   (48.87 ms … 65.65 ms)  52.01 ms  65.65 ms  65.65 ms
SelectArrays            28.85 ms/iter    (27.01 ms … 42.3 ms)   29.3 ms   42.3 ms   42.3 ms
Step rows, get({})      50.73 ms/iter    (49.25 ms … 52.7 ms)   50.8 ms   52.7 ms   52.7 ms
Step rows, get([])      26.97 ms/iter   (26.53 ms … 27.69 ms)  27.08 ms  27.69 ms  27.69 ms
```

