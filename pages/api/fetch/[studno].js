/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

axios.defaults.withCredentials = true;

async function getClassAndName(SUSID) {
  const mainPage = await axios('https://fystudent.foonyew.edu.my/main.php', {
    method: 'GET',
    headers: {
      Cookie: `PHPSESSID=${SUSID}`,
    },
  });
  const { document } = new JSDOM(mainPage.data).window;
  const [, _class, name] = document.querySelector('h1').textContent.split(' ');
  return {
    _class,
    name,
  };
}
async function getMoneyLMAO(SUSID) {
  const moneyData = [];

  for (const fuckMyLifePi of 'flmp') {
    const moneyLMAO = await axios(
      'https://fystudent.foonyew.edu.my/jf_inquiry_list.php',
      {
        method: 'POST',
        headers: {
          Cookie: `PHPSESSID=${SUSID}`,
        },
        data: `action=change&jfil_cbo_FCODE=${fuckMyLifePi.repeat(
          3,
        )}&submit=+%E7%A1%AE%E5%AE%9A%E6%B8%B8%E8%A7%88+`,
      },
    );
    const { document } = new JSDOM(moneyLMAO.data).window;

    // w100 NOT FUCKING w-100
    moneyData.push(Array.from(document.querySelectorAll('table.w100 tr'))
      .slice(1)
      .map((e) => Array.from(e.querySelectorAll('td'))
        .map((t) => t.textContent.trim())));
  }

  return moneyData;
}

async function scrape(studno) {
  const res = await axios('https://fystudent.foonyew.edu.my/login.php', {
    method: 'POST',
    data: 'txt_user=200156&txt_password=070915-01-1132&send.x=34&send.y=9',
  });
  const SUSID = res.headers['set-cookie'][0].split(';')[0].split('=')[1];

  await axios('https://fystudent.foonyew.edu.my/login.php', {
    method: 'POST',
    data: `txt_user=${studno}&txt_password=fuckfoonyew&send.x=34&send.y=9`,
    headers: {
      Cookie: `PHPSESSID=${SUSID}`,
    },
  });

  // convert string to DOM(something that you can querySelector)
  // get browser window object
  // curly braces to destruct, we only want to get the document children from window object

  const { _class, name } = await getClassAndName(SUSID);
  const result = {
    ...(await getClassAndName(SUSID)),
    money: await getMoneyLMAO(SUSID),
  };
  fs.writeFileSync(
    path.join(__dirname, 'result.json'),
    JSON.stringify(result, null, '\t'),
  );
  const final = {
    stud_no: studno,
    class: _class,
    name,
    payment: await getMoneyLMAO(SUSID),
  };

  return final;
}

// define 过后立刻call
// get - get from server(return onlys)
// post - send somthing, and the server return(send and return)

export default function handler(req, res) {
  scrape(req.query.studno).then((result) => {
    res.json(result);
  });
}
