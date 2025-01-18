import React, { useState } from 'react';
import './Homepage.css';
import leaf from '../../Image/Forestleaf.jpg';
import fors2 from '../../Image/forest2.webp';
import fors3 from '../../Image/forest4.webp';
import fors4 from '../../Image/forest5.jpg';

function Homepage() {
    const [image, setImage] = useState(null);
    const[imgurl,setImgurl]=useState('');
    const [birdDetails, setBirdDetails] = useState([]);
    const[birdName1,setBirdname1]=useState('');
    const[birdName2,setBirdname2]=useState('');
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setImgurl(imageUrl);  // Set the URL of the selected image
        }
    };

    const handleSubmit = (event) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log('token',token);
        event.preventDefault();
        if (!image) return; // Prevent submission if no image is selected
        const formData = new FormData();
        formData.append('photo', image);

        fetch('http://127.0.0.1:8000/api/upload-image/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
              },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.bird_names);
            setBirdname1(data.bird_names[0]);
            setBirdname2(data.bird_names[1]);
            setBirdDetails(data.bird_details); // Set bird details in state
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <div className='homeDiv1'>
                <img className='leafBackg' src={leaf} alt="Background Leaf" />
                <div className='headingmain'>Forestics</div>

                <div className='homeDiv2'>
                    <div className='cont'>
                        <div className='points'>
                            <div className='point'>
                                <div className='startquotes'>"</div>
                                Explore and learn <br /> about nature with ease
                                <div className='endquotes'>"</div>
                            </div>
                            <div className='point'>
                                <div className='startquotes'>"</div>
                                Accurate identification <br /> at your fingertips
                                <div className='endquotes2'>"</div>
                            </div>
                        </div>
                        <img className='homeimgs' src={fors2} alt="Forest 2" />
                    </div>

                    <div className='cont'>
                        <img className='homeimgs' src={fors3} alt="Forest 3" />
                        <div className='block2'>
                            <div className='points'>
                                <div className='point'>
                                    <div className='startquotes'>"</div>
                                    Inspiring environmental <br /> awareness and conservation
                                    <div className='endquotes3'>"</div>
                                </div>
                                <div className='point'>
                                    <div className='startquotes'>"</div>
                                    A space to showcase and <br /> admire captivating <br /> wildlife photography
                                    <div className='endquotes4'>"</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='cont'>
                        <div className='point'>
                            <div className='startquotes'>"</div>
                            Join a vibrant community <br /> of nature lovers
                            <div className='endquotes5'>"</div>
                        </div>
                        <img className='homeimgs' src={fors4} alt="Forest 4" />
                    </div>
                    <center>
                    <form className='birdimgform' onSubmit={handleSubmit}>
                        <div className="ImageByUser">
                            <label className='imageLabel'>Upload your Bird Image</label>
                            <input
                                className='birdImageInput'
                                accept="image/*"
                                onChange={handleImageChange}
                                type='file'
                            />
                            <button type='submit' className='submit'>Done</button>
                            </div>
                           
                       
                    </form>
                   
                           
                    </center>
                    <div className='birdname'>Bird Predicted : {birdName1}</div>
                    <div className='birdname'>Bird Similar to : {birdName2}</div>
                    {/* Render Bird Details */}
                    <div className="bird-details">
                        {birdDetails.map((bird, index) => (
                            <div key={index} className="bird-item">
                                <p className='birdname'>{bird.name}</p>
                                <p className="birddetails">{bird.detail}</p>
                                <p className="birdhabitat">{bird.habitat}</p>
                                <p className="birddiet">{bird.diet}</p>
                                <p className="consstat">{bird.conservationstatus}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
