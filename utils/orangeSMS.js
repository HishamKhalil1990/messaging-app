require("dotenv").config();
https = require("https");
const axios = require("axios");

// enviroment variables
const ORANGE_USER = "Abu.Odeh";
const ORANGE_PASS = "AbuOdehAO#2022";
// orange urls
const urls = {
  tokenURL: `https://orangebulksms.orange.jo/api/user/generateIntegrationToken`,
  sendURL: `https://orangebulksms.orange.jo/api/job/intSMS`,
};

// https agent
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getToken = async () => {
  try {
    const headers = {
      username: ORANGE_USER,
      password: ORANGE_PASS,
    };
    const { data } = await axios({
      url: urls.tokenURL,
      method: "post",
      headers,
      httpsAgent: agent,
    });
    return data.result ? data.result.integrationToken : null;
  } catch (err) {
    return;
  }
};

const sendSMS = async (message, numbers) => {
  const statusList = [];
  const token = await getToken();
  return new Promise((resolve, reject) => {
    if (token) {
      const headers = { integration_token: token };
      numbers.forEach((number) => {
        const data = {
          phone_numbers: [number],
          content: message,
          sender_id: "AbuOdeh",
        };
        axios({
          url: urls.sendURL,
          method: "post",
          data,
          headers,
          httpsAgent: agent,
        })
          .then((result) => {
            statusList.push({
              number,
              status: result.data.status,
            });
            if (statusList.length == numbers.length) {
              resolve(statusList);
            }
          })
          .catch((err) => {
            statusList.push({
              number,
              status: "faild",
            });
            if (statusList.length == numbers.length) {
              resolve(statusList);
            }
          });
      });
    } else {
      resolve("network error");
    }
  });
};

module.exports = {
  sendSMS,
};
