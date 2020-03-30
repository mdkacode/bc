import React from 'react';
import PropTypes from 'prop-types';


export const DownloadLink = ({ to,name  }) => {

  return (
    <a
      
      href={to}
      download
    >
    </a>
  );
};


DownloadLink.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
};

export default DownloadLink;