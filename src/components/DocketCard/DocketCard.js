import '../DocketCard/DocketCard.scss'

import React from 'react';

function DocketCard({ docket, onClick, selectedDocket }) {
  const handleDocketClick = () => {
    // Call the onClick function with the docket data
    onClick(docket.docket_name);
  };

  return (
    <button className={'docket ' + (selectedDocket === docket.docket_name ? 'selected' : '') } onClick={handleDocketClick}>
      {docket.docket_name}
    </button>
  );
}

export default DocketCard;