import React from 'react';

function Footer() {
  return (
    <footer>
      <div className='footercontainer'>
        <div className='footer1'>
          <div className='newslettertext'>
            <h2>Stay up to date</h2>
            <p>
              Subscribe to our newsletter to receive update and learn more about
              PataBoda.
            </p>
          </div>
          <div className='newsletter'>
            <input id='email' placeholder='Enter your email address' />
            <button id='sub'>Subscribe</button>
          </div>
        </div>
        <div className='footer2'>
          <div id='section1'>
            <h1>iCare Health</h1>
            <p>
              We believe the best care is delivered when it is delivered <br /> with
              love. Who knows more about the nuances, preferences, <br /> and type of
              care that should be provided to your loved one <br /> than a family
              member or trusted friend?
            </p>
            <h3>© iCare Health 2022</h3>
          </div>
          <div id='section2'>
            <h2>Counties</h2>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Nairobi</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Mombasa</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Kisumu</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Kiambu</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Taita Taveta</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Kajiado</a>
            </p>
          </div>
          <div id='section2'>
            <h2>Company</h2>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Home</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Products</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Contact Us</a>
            </p>
          </div>
          <div id='section2'>
            <h2>Others</h2>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>FAQs</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Terms of Service</a>
            </p>
            <p>
              <a href='https://i-care-frontend.vercel.app/'>Privacy and Policy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
