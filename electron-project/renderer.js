const redis = require('redis');
const client = redis.createClient();
const _ = require('lodash')

client.on('error', err => console.log('Redis Client error: ', err));

client.connect();


function ask_username(){
    let name_div1 = document.getElementById('name_field');
    let name_input = document.getElementById('input_name');
    client.SET('user', name_input.value);
    client.GET('user').then(function(result){
        name_div1.textContent = 'Welcome ' + result + '! \n';
    });
};


function get_time(){
    let name_div2 = document.getElementById('name_field2');
    client.TIME().then(function(time_result){
        name_div2.textContent = time_result;
    }); 
};


async function get_info(){
    let name_div3 = document.getElementById('name_field3');
    const data = await client.INFO("server");

    const Info = data.split("\n").filter(line => line.includes(":"));
    let formattedInfo = "<table>";

    Info.forEach(line => {
        const [key, value] = line.split(":");
        formattedInfo += `<tr><td><strong>${key.trim()}</strong></td><td>${value.trim()}</td></tr>`;
    });
    formattedInfo += "</table>";

    name_div3.innerHTML = formattedInfo;

};


//client.disconnect();