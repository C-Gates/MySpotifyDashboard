import './ListItem.scss';

function ListItem({ item, index }) {

  let artist = item;

  if (!item) {
    artist = {
      'id' : '',
      'name ': '',
      'artist' : '',
    }
  }

  return (
    <div className="list-item">
      <div key={artist.id} className='track' >
        <span className='count'>{index+1}. </span>
      {artist.name} <span></span>
      </div>
    </div>
  )
}

export default ListItem;