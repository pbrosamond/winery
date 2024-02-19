import '../DocketCard/DocketCard.scss'

function DocketCard({docket}) {
    
    return (
        <p className='docket'>{docket.docket_name}</p>
    );
  };
  
  export default DocketCard;