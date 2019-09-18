exports.greenTemplate = (mailTitle, mailBody, toName, fromName, fromEmail, productLink, storeLink, storeName) => {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />

    <!-- For development, pass document through inliner -->
    <!-- Template Disclaimer https://designmodo.com/email-newsletter-templates -->

    <style type="text/css">
      /* Your custom styles go here */
      * {
        margin: 0;
        padding: 0;
        font-size: 100%;
        font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica,
          Arial, sans-serif;
        line-height: 1.65;
      }

      img {
        max-width: 100%;
        margin: 0 auto;
        display: block;
      }

      body,
      .body-wrap {
        width: 100% !important;
        height: 100%;
        background: #f8f8f8;
      }

      a {
        color: #98CC4C;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .text-center {
        text-align: center;
      }

      .text-right {
        text-align: right;
      }

      .text-left {
        text-align: left;
      }


      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 20px;
        line-height: 1.25;
      }

      h1 {
        font-size: 32px;
      }

      h2 {
        font-size: 28px;
      }

      h3 {
        font-size: 24px;
      }

      h4 {
        font-size: 20px;
      }

      h5 {
        font-size: 16px;
      }

      p,
      ul,
      ol {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 20px;
      }

      .container {
        display: block !important;
        clear: both !important;
        margin: 0 auto !important;
        max-width: 580px !important;
      }

      .container table {
        width: 100% !important;
        border-collapse: collapse;
      }

      .container .masthead {
        padding: 80px 0;
        background: #98CC4C;
        color: white;
      }

      .container .masthead h1 {
        margin: 0 auto !important;
        max-width: 90%;
        text-transform: uppercase;
      }

      .container .content {
        background: white;
        padding: 30px 35px;
      }

      .container .content.footer {
        background: none;
      }

      .container .content.footer p {
        margin-bottom: 0;
        color: #888;
        text-align: center;
        font-size: 14px;
      }

      .container .content.footer a {
        color: #888;
        text-decoration: none;
        font-weight: bold;
      }

      .container .content.footer a:hover {
        text-decoration: underline;
      }

      /* adDed */
      .button {
        border-radius: 2px;
      }
    
      .button a.goto {
        padding: 13px 23px;
        background: #84B242;
        border: 1px solid #84B242;
        border-radius: 3px;
        font-size: 23px;
        color: #efefef; 
        text-decoration: none;
        display: inline-block;
        font-weight: bold;
      }

      .button a.goto:hover {
        background: #98CC4C;
        color: #fff; 
      }

      .content a {
        font-size: 1.1em;
        color: #84B242; 
        text-decoration: none;
        font-weight: 400;
      }

      .content a:hover {
        color: #98CC4C; 
      }
    </style>
  </head>
  <body>
    <table class="body-wrap">
      <tr>
        <td class="container">
          <!-- Message start -->
          <table>
            <tr>
              <td align="center" class="masthead">
                <h1>${mailTitle}</h1>
              </td>
            </tr>
            <tr>
              <td class="content">
                <h2>Hi ${toName},</h2>

                <p class='content'>
                  ${mailBody}
                </p>

                <table>
                  <tr>
                    <td align="center">
                      <p>
                        <span class="button"> 
                          <a href="${productLink}" class="goto">View product</a>
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>

                <p class='content'>
                  By the way, if you're wondering where you can find more of
                  such products, visit
                  <a href="${storeLink}">${storeName} Online</a>.
                </p>

                <p><em>– My${storeName}Bot</em></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="container">
          <!-- Message start -->
          <table>
            <tr>
              <td class="content footer" align="center">
                <p>
                  Sent by <a href="#">${fromName}</a>, Blackish Street, IN Pandora
                </p>
                <p>
                  <a href="mailto:${fromEmail}">${fromEmail}</a> |
                  <a href="#">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `
}