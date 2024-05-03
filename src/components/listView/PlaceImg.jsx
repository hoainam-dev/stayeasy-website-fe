
export default function PlaceImg({place,index=0,className=null}) {
    if (!place.photos?.length) {
      return '';
    }
    if (!place || !place.photos) {
      return null; 
    }
    if (!className) {
      className = 'object-cover';
    }
    // upload photo
    return (
      <img className={className} src={'http://localhost:8080/uploads/'+ place.photos[index]} alt=""/>
    );
  }