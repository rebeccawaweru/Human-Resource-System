import { Box } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { cat1 } from '../../assets';
function Carousell() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Box sx={{mt:12,ml:-65,width:"300%",background:"white",height:"30vh",pt:5}}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
          
          src={cat1}
          alt="Second slide"
        />
    
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Box>
  );
}

export default Carousell