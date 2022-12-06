import React from 'react';

function Home() {
  return (
    <div className='home'>
      <div className='home-banner'>
        <div className='home-banner-text'>
          <h1>We Help Families Care for their Loved Ones</h1><br />
          <p>
            We Help Families Care for their Loved Ones PASCO provides home
            health care services and supports so that every person may live a
            fulfilled life in their home and community regardless of disability.
          </p><br />
          <button type='button'>Register Patient</button>
        </div>
      </div>
      <br />
      {/* <img src={motherchild} alt='Mother Child' /> */}
    </div>
  );
}

export default Home;
