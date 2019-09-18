# pricecrawler bot
Scrapes traditional and modern websites created with reactjs or angular for favorable price alerts via email. The price bot just loves your wishlist!

What?
--------
Recall when you were eyeing that nice 65″ tv or mavic drone that often goes on sale? Hire a bot to run those checks for you today! Call, I mean clone this repo and have a 30-day free trial then try your own store. Remember to read the legal attachment in your mail so you remain ethical!<br />

Pricecrawler bot performs web scraping on selected online shopping stores using tools such as request and cheerio. DOM traversal is based on the latter which may need help from common headless browsers. Once a budget price is reached for a desired item a nice-looking email alert with product preview and link is sent. Featured stores are <a href='https://jumia.co.ke'>jumia kenya</a>  and <a href='https://amazon.com'>amazon</a>. 

Setup
--------
Clone and run yarn install.<br />
Create a Sendgrid mailing account and fill out .env as necessary. See example file<br />
Scrape jumia kenya: `$ node jumiabot.js <product_url> <my_budget_price_ksh>`<br />
Scrape amazon: `$ node amazonbot.js <product_url> <my_budget_price_usd>`<br />
<br />
![Screenshot 2019-09-17 at 16 20 46](https://user-images.githubusercontent.com/39657549/65045801-21e51c00-d968-11e9-9035-ade9225673c9.png)
<br />
Preview more screenshots <a href='https://github.com/leonardnjura/pricecrawler/pull/1'>here</a>.


Licence
--------
This app is protected by MIT licence.<br />
