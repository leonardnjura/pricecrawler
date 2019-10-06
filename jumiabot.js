require('dotenv').config();

const { SENDGRID_API_KEY, TO, FROM, FROM_NAME } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const fs = require('fs');
const image2base64 = require('image-to-base64');
const request = require('request');
const cheerio = require('cheerio');
const args = process.argv.slice(2);
const productUrl = args[0];
const budgetPrice = args[1];

const templates = require ('./utils/templates')

/**
 * SAMPLE JUMIA URL
 * https://www.jumia.co.ke/65x8500f-smart-uhd-4k-2160pixels-android-version-seven-16gb-storage-series-8-2018-model-sony-mpg132635.html
 * https://www.jumia.co.ke/lg-gc-j247sluv-668l23.59-ft-side-by-side-fridge-platinum-silver-did-17834654.html
 * https://www.jumia.co.ke/samsung-galaxy-note-10-6.8-256gb-12gb-ram-dual-sim-black-22499669.html
 * https://www.jumia.co.ke/huawei-p30-pro-6.47-256gb-8gb-dual-sim-black-23869683.html
 * 
 * EXAMPLE USAGE && CURRENCY: KES
 * node parser.js https://www.jumia.co.ke/65x8500f-smart-uhd-4k-2160pixels-android-version-seven-16gb-storage-series-8-2018-model-sony-mpg132635.html 200000
 
 */

function checkJumiaPrice() {
  generateHtml(productUrl)
    .then(data => {
      //   console.log({data})
      scrapeJumiaPrice(data);
    })
    .catch(err => console.log({ err }));
}

function generateHtml(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, res, htmlData) => {
      if (error) reject(error);
      else resolve(htmlData);
    });
  });
}

function scrapeJumiaPrice(html) {
  const $ = cheerio.load(html);

  const productTitle = $('h1').text();
  let productImage = $('#imgs')
    .find('img')
    .attr('data-src');
    let currentPrice = $('.-mtxs')
    .text();
    // console.log({productTitle})
    // console.log({productImage})
    // console.log({currentPrice})

  currentPrice = currentPrice.replace(',', '');
  currentPrice = parseFloat(currentPrice.replace('KSh', ''));

  let msg = null;

  if (currentPrice < budgetPrice) {
    msg = `${productTitle} is cheap now! Sells at Ksh ${currentPrice}.00 and your budget is Ksh ${budgetPrice}.00`;
    // mailTitle, mailBody, toName, fromName, fromEmail, productLink, storeLink, storeName
    const mailTitle = 'IT IS CHEAP ON JUMIA!'
    const mailBody = msg
    const toName = 'User'
    const fromName = FROM_NAME
    const fromEmail = FROM
    const productLink = productUrl
    const storeLink = 'https://jumia.co.ke'
    const storeName = 'Jumia'

    const niceEmail = templates.greenTemplate(mailTitle, mailBody, toName, fromName, fromEmail, productLink, storeLink, storeName)
    // sendEmail(
    //   'IT IS CHEAP ON JUMIA!',
    //   `<p>${msg}. <br />
    //   <strong>Visit product page on jumia <a href="${productUrl}">here..</a></strong>
    //   </p>`,
    //   productImage
    // );
    sendEmail(
        'IT IS CHEAP ON JUMIA!',
        niceEmail,
        productImage
      );
  
  } else {
    msg = `${productTitle} is still expensive at ${currentPrice} and your budget is Ksh ${budgetPrice}.00`;
  }

  console.log({ msg, currentPrice, productImage });
  console.log('Scraping done..');
}

function base64_encode(file) {
  // will encode pdf or some local image file, to encode remote image use npm pkg
  let f = fs.readFileSync(file);
  return Buffer.from(f).toString('base64');
}
// let logo_base64 = base64_encode('./assets/images/russell-peters.jpg');
let legal_base64 = base64_encode('./assets/documents/legal.pdf');

async function sendEmail(subject, body, imagePath) {
  const product_base64 = await image2base64(imagePath);
  const email = {
    to: TO, // Test with https://temp-mail.org/en/
    from: FROM,
    subject: subject,
    text: body,
    html: body,
    attachments: [
      {
        content: product_base64,
        filename: 'product',
        type: 'image/jpg',
        disposition: 'attachment',
        contentId: '1'
      },
      {
        content: legal_base64,
        filename: 'legal',
        type: 'application/pdf',
        disposition: 'attachment',
        contentId: '2'
      }
    ]
  };

  return sgMail.send(email).catch(err => console.log(err));
}

checkJumiaPrice();
