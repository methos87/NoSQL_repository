const redis = require('redis');
const publisher = redis.createClient();

main();


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function main(){

    (async () => {

        const mychannel = {
            id: "01",
            name: "My channel",
            message: "This is my channel",
        };

        await publisher.connect();

        console.log("Publishing...")

        while (true) {

            await publisher.publish("mychannel", "This is my message!");
            await delay(500);
                
        };
    })();

};



