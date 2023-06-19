import React from 'react';
import { ImStarFull,ImStarHalf,ImStarEmpty } from 'react-icons/im';
import { Badge } from 'react-bootstrap';

const Rating = ({rating,numberofrating}) => {
  return (
    <>
      <div>
        {rating>=1
          ?<ImStarFull/>
          :rating>=.5
          ?<ImStarHalf/>
          :<ImStarEmpty/>
        }
        {rating>=2
          ?<ImStarFull/>
          :rating>=1.5
          ?<ImStarHalf/>
          :<ImStarEmpty/>
        }
        {rating>=3
          ?<ImStarFull/>
          :rating>=2.5
          ?<ImStarHalf/>
          :<ImStarEmpty/>
        }
        {rating>=4
          ?<ImStarFull/>
          :rating>=3.5
          ?<ImStarHalf/>
          :<ImStarEmpty/>
        }
        {rating>=5
          ?<ImStarFull/>
          :rating>=4.5
          ?<ImStarHalf/>
          :<ImStarEmpty/>
        }
      </div>
        
      <h6>
        Total 
        <Badge bg="secondary">{numberofrating}</Badge> 
        Ratings
      </h6>
    </>
  )
};

export default Rating;

