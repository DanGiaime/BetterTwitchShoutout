// create a function that takes a username from the request body
// calls the /helix/user endpoint from the twitch api
// then returns the user's description
// if the user doesn't exist, return a 404

const axios = require('axios');
exports.handler = async (event, context) => {
    console.log(event.queryStringParameters);
    console.log(event.queryStringParameters.username);
    let username = event.queryStringParameters.username;
    username = username.replace('@', '');
    const url = `https://api.twitch.tv/helix/users?login=${username}`;
    const response = await axios.get(url, {
        headers: {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
    });

    let userExists = response && response.data && response.data.data && response.data.data.length != 0;
    if (!userExists) {
        return { statusCode: 200, body: "They're awesome!"};
    }
    let descriptionExists = response.data.data[0] && response.data.data[0].description;
    if(!descriptionExists) {
        return { statusCode: 200, body: "They're awesome!"};
    }
    return { statusCode: 200, body: response.data.data[0].description};
};