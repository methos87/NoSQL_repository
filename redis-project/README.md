# SETUP:
    
```bash
node -v
nvm -v
```


```bash
npm install redis
npm install prompt-sync
```

## USAGE:  



### index.js 

1. uncommit the function what you want to use in the index.js file.

    ```
    // await alapok();              // SET, GET, EXPIRE, TTL, DEL, EXIST, INCR, TIME
    // await listak();              // LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN
    // await halmazok();            // SADD, SREM, SISMEMBER, SINTER, SCARD, SMEMBERS
    // await rendezett_halmazok();  // ZADD, ZRANGE, ZSCORE 
    // await hashmap();             // HMSET, HGET, HEXIST, HINCRBY
    // await tranzakciok();         // MULTI, EXEC
    ```

2. Run the following command:

```bash
node index
```


### publisher.js + subscriber.js

Run this in the first terminal:

```bash
node publisher
```

Run this in and another terminal:
    
```bash
node subscriber
```