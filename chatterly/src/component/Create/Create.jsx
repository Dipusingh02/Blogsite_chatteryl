import React from 'react';
import "./Create.css";
import Navbar from '../Navbar/Navbar'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className='Create-image div-images'>  
          <br ></br>
          <br ></br>
          <br ></br>
          <br ></br>
          <br ></br>
          <h1>Create, What Connects! </h1>
          <br></br>
          <br></br>
          <br></br>
          <p>WELCOME TO <span style={{color: 'white', marginLeft: '6px'}}>CHATTERLY</span></p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className='Create-image__content'>
            <button className='Create-button'>
              Create
            </button>
            <div className='Create-button__space'></div>
            <button onClick={()=>{
              navigate('/home')
            }} className='Create-button'>
              Explore 
            </button>
          </div>
        </div>
        <div className='create-info__section div-images'>
          <h1>What are the Possibilities?</h1>
          <button className='Learn-button'>
            Learn More 
          </button>
        </div>
        <div className='create-info__cards div-images'>
          <br />
          <h1>
            Start Your Blogging Journey!
          </h1>
          <br />
          <div className='create-card__button-alignment'>
            <div className='create-info__container'>
              <div className="card">
                <hr />
                <br />
                <h3>Effortless Blog Creation</h3>
                <br />
                <div className='card-content'>
                  Create, edit, and publish blog posts with our intuitive and easy-to-use editor. No technical skills required!
                </div>
              </div>
              <br />
              <div className="card">
                <hr />
                <br />
                <h3>Monetize Your Content</h3>
                <br />
                <div className='card-content'>
                  Turn your blog into a business with built-in monetization tools. Earn from ads, sponsored posts, and more.              
                </div>
              </div>
              <br />
              <div className="card">  
                <hr />
                <br />
                <h3>Engage with Your Audience</h3>
                <br />
                <div className='card-content'>
                  Keep your readers engaged with comment sections, email subscriptions, and social media integrations.             
                </div> 
              </div>
            </div>
            <div className='register-section'>
              <button onClick={()=>{
                navigate('/signup');
              }} className='register-button'>
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create;
