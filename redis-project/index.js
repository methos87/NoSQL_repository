const redis = require('redis');
const client = redis.createClient();
const prompt = require('prompt-sync')();
const publisher = redis.createClient();

main();

async function main(){

    await client.on('error', err => console.log("Redis Client error", err));
    await client.connect();

    // await alapok();              // SET, GET, EXPIRE, TTL, DEL, EXIST, INCR, TIME
    // await listak();              // LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN
    // await halmazok();            // SADD, SREM, SISMEMBER, SINTER, SCARD, SMEMBERS
    // await rendezett_halmazok();  // ZADD, ZRANGE, ZSCORE
    // await hashmap();             // HMSET, HGET, HEXIST, HINCRBY
    // await tranzakciok();         // MULTI, EXEC

    await client.disconnect();  

};


async function alapok(){

    let result;
    let ex_time;
    let check_user;
    let new_check_user;


    const username = prompt("Please enter your username: ");
    await client.SET("username", username);

    const password = prompt("Please enter your temporary password: ");
    await client.SET("password", password);

    const counter = prompt("Please enter a expire time for this password: ");
    await client.EXPIRE("password", counter);

    result = await client.GET("password");
    ex_time = await client.TTL("password")

    console.log("Your password is set! (" + result + ")");
    console.log("This password will expire in " + ex_time + " seconds!");

    check_user = await client.EXISTS("username");
    console.log("Number of users: " + check_user);

    new_check_user = await client.DEL("username");
    console.log("User deleted!");
    console.log("Number of users: " + new_check_user);

    const new_counter = await client.INCR("counter");
    console.log("Your password expire time automatically increased by 1, now the expire time is:  " + new_counter);

    time_server = await client.TIME();
    console.log("Server time: " + time_server);

};


async function listak(){

    let user_name;

    const firstname = prompt("Please enter your firstname: ");
    await client.RPUSH("name", firstname);

    const lastname = prompt("Please enter your lastname: ");
    await client.RPUSH("name", lastname);

    const title = prompt("Please enter your title: ");
    await client.LPUSH("name", title);

    user_name = await client.LRANGE("name", 0, -1);
    console.log("Welcome " + user_name);

    const mylist_len = await client.LLEN("name");
    console.log("Your name list size is: " + mylist_len);

    await client.LPOP("name");
    console.log("One element from the left is deleted!");

    const new_mylist_len = await client.LLEN("name");
    console.log("Your name list size is: " + new_mylist_len);

    await client.DEL("name");

};


async function halmazok(){

    let result1;
    let result2;
    let result3;
    let check_data;
    let intersection;
    let number;

    const data1 = prompt("Please enter your data: ");
    await client.SADD("data", data1);

    const data2 = prompt("Please enter your data: ");
    await client.SADD("data", data2);

    result1 = await client.SMEMBERS("data");
    console.log("Your data: " + result1);
    
    const data3 = prompt("Please check your data is in set, type the data: ");
    check_data = await client.SISMEMBER("data", data3);

    if (check_data == 1){
        console.log("Yes, your data is in set!");
    }
    else{
        console.log("No, your data is not in the set!");
    }

    const data4 = prompt("Write the data what you want to remove: ");
    await client.SREM("data", data4);

    result2 = await client.SMEMBERS("data");
    console.log("Your data: " + result2);

    await client.SADD("data2", data1);
    await client.SADD("data2", "potato");
    await client.SADD("data2", "red");
    await client.SADD("data2", "sun");

    result3 = await client.SMEMBERS("data2");
    console.log("Second data: " + result3);

    intersection = await client.SINTER("data", "data2");
    console.log("Intersection of the two set is: " + intersection);

    number = await client.SCARD("data");
    console.log("Your set length is: " + number);

};



async function rendezett_halmazok(){

    let results;
    let check;

    const student1 = await client.zAdd("myzset", [{ value: 'Mate', score: 4 }]);
    const student2 = await client.zAdd("myzset", [{ value: 'Noel', score: 3 }]);
    const student3 = await client.zAdd("myzset", [{ value: 'Noemi', score: 5 }]);

    results = await client.zRangeWithScores("eredmenyek", 0 , -1);
    console.log(results);

    const check_student = prompt("Write the name of the student: ");
    check = await client.ZSCORE("eredmenyek", check_student);
    console.log("Score of " + check_student + " is " + check);


};


async function hashmap(){

    let price1;
    let price2;
    let check1;
    let check2;

    const car = await client.HSET("car", "type", "opel", "model", "zafira", "price", 10000);
    const read = await client.HGET("car", "type");

    console.log(read);

    check1 = await client.HEXISTS("car", "type");
    console.log(check1);


    check2 = await client.HEXISTS("car", "year");
    console.log(check2);

    price1 = await client.HGET("car", "price");
    console.log(price1);

    await client.HINCRBY("car", "price", 2000);

    price2 = await client.HGET("car", "price");
    console.log(price2);
};



async function tranzakciok(){

    try {
        await client.multi()
                        .set("user1", "Erno")
                        .set("user2", "Orsi")
                        .set("user3", "Janos")
                        .exec();
        console.log("Mulit replies: ". replies);
    } catch (err) {
        console.error(err);
    };
};

