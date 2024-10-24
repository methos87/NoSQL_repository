SETUP:

    node -v
    nvm -v

    npm install redis
    npm install prompt-sync
    
USAGE:  



    ** index.js **

        1. uncommit the function what you want to use in the index.js file.

            // await alapok();              // SET, GET, EXPIRE, TTL, DEL, EXIST, INCR, TIME
            // await listak();              // LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN
            // await halmazok();            // SADD, SREM, SISMEMBER, SINTER, SCARD, SMEMBERS
            // await rendezett_halmazok();  // ZADD, ZRANGE, ZSCORE
            // await hashmap();             // HMSET, HGET, HEXIST, HINCRBY
            // await tranzakciok();         // MULTI, EXEC

        2. node index



    ** publisher.js + subscriber.js **

        Run this in the first terminal:
            
            node publisher

        Run this in and another terminal:
            
            node subscriber