const redis = require('redis');

main();

async function main(){

    (async () => {

        const client = redis.createClient();

        const subscriber = client.duplicate();

        await subscriber.connect();

        await subscriber.subscribe("mychannel", (message) => {
            console.log(message); 
        });

    })();

};