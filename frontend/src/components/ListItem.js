import './ListItem.scss';

function ListItem({ item , index, image }) {

  let track = item;
  console.log(track)

  if (!item) {
    track = {
      'id' : '',
      'name ': '',
      'artist' : '',
      'image' : ''
    }
  } 

  return (
    <div className="list-item">
      <div key={track.id} className='track' >
        <span className='count'>{index+1}. </span>
      {track.name} - <span>{track.artist}</span>
      { track.image && 
        <span> <img src={track.image.length() > 0 ? track.image[0].href : null} /> </span> 
      }
      </div>
    </div>
  )
}

export default ListItem;