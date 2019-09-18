require('dotenv').config();

const { SENDGRID_API_KEY, TO, FROM, FROM_NAME } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const fs = require('fs');
const image2base64 = require('image-to-base64');
const nightmare = require('nightmare')({ show: false });
const args = process.argv.slice(2);
const productUrl = args[0];
const budgetPrice = args[1];

const templates = require ('./utils/templates')

/**
 * SAMPLE AMZON URL
 * https://www.amazon.com/Insta360-Flowstate-Stabilization-Independently-MicroSDXC/dp/B07GXBYYWN
 * https://www.amazon.com/dp/B00VQBMK0U/ref=nav_timeline_asin?_encoding=UTF8&psc=1
 * https://www.amazon.com/DJI-Mavic-Quadcopter-Remote-Controller/dp/B078WP48CH/
 * https://www.amazon.com/Hydro-Flask-Double-Insulated-Stainless/dp/B00KDW1ZKE
 * 
 * Note: trim out amzon tracking info
 *
 * EXAMPLE USAGE && CURRENCY USD
 * node parser.js https://www.amazon.com/Insta360-Flowstate-Stabilization-Independently-MicroSDXC/dp/B07GXBYYWN 550
 */

function checkAmazonPrice() {
  nightmare
    .goto(productUrl)
    .inject('js', 'node_modules/jquery/dist/jquery.min.js')
    .wait('#priceblock_ourprice')
    .evaluate(() => {
      let item = {}; // obj
      item['productTitle'] = document.getElementById('productTitle').innerText;
      item['productImage'] = $('.imgTagWrapper')
      .find('img')
      .attr('src');
      item['currentPrice'] = document.getElementById(
        'priceblock_ourprice'
      ).innerText;
      return item;
    })
    .then(data => {
      //   console.log({ data });
      const productTitle = data.productTitle;
      let productImage = data.productImage;
  
      let currentPrice = data.currentPrice;

      currentPrice = currentPrice.replace(',', '');
      currentPrice = parseFloat(currentPrice.replace('$', ''));

      let msg = null;

      if (currentPrice < budgetPrice) {
        msg = `${productTitle} is cheap now! Sells at $ ${currentPrice}.00 and your budget is $ ${budgetPrice}.00`;
    // mailTitle, mailBody, toName, fromName, fromEmail, productLink, storeLink, storeName
    const mailTitle = 'IT IS CHEAP ON AMAZON!'
    const mailBody = msg
    const toName = 'User'
    const fromName = FROM_NAME
    const fromEmail = FROM
    const productLink = productUrl
    const storeLink = 'https://amazon.com'
    const storeName = 'Amazon'

    const niceEmail = templates.greenTemplate(mailTitle, mailBody, toName, fromName, fromEmail, productLink, storeLink, storeName)
      //   sendEmail(
      //     'IT IS CHEAP ON AMAZON!',
      //     `<p>${msg}. <br />
      // <strong>Visit product page on amazon <a href="${productUrl}">here..</a></strong>
      // </p>`, productImage
      //   );
      sendEmail(
        'IT IS CHEAP ON AMAZON!',
        niceEmail,
        productImage
      );

    } else {
        msg = `${productTitle} is still expensive at ${currentPrice} and your budget is $ ${budgetPrice}.00`;
      }

      console.log({ msg, currentPrice, productImage});
      console.log('Scraping done..');

      return nightmare.end();
    })
    .catch(err => console.log({ err }));
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


checkAmazonPrice();
