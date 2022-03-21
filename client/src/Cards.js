import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
function Cards(){
  const [people, setPeople] = useState([
    {
      name: "prince",
      url:"https://www.chicagotribune.com/resizer/3U1sOcVhiya2oB1GGaSO2GfYD8A=/415x508/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/NKTE7ZA6RJAAPNMPH4XN2IRRTA.jpg"
    },
    {
      name: 'fredie mercury',
      url: "https://cdns-images.dzcdn.net/images/artist/d690b6b1e9ff8f0a7944b2293b540966/500x500.jpg"
    }
  ])

  

  return (
    <div>
      <h1>Cards</h1>

      {people.map(person => (
        <TinderCard
        className= "swipe"
        key={(person.name)}
        preventSwipe={['up', 'down']}>
          <div style={{ backgroundImage: `url(${person.url})`}} className='card'>
            <h3>{person.name}</h3>
              </div>
        </TinderCard>
      ))}
    </div>
  )
}

export default Cards;