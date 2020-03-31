import axios from 'axios';

export function someFunction(values:any) {

    return (dispatch:any) => {
  
     
  
      const method = 'GET';
  
      const url = 'http://go.api/download_file';
  
     
  
      axios
  
        .request({
  
          url,
  
          method,
  
          responseType: 'blob', //important
  
        })
  
        .then(({ data }) => {
  
          const downloadUrl = window.URL.createObjectURL(new Blob([data]));
  
          const link = document.createElement('a');
  
          link.href = downloadUrl;
  
          link.setAttribute('download', 'vedio.mp4'); //any other extension
  
          document.body.appendChild(link);
  
          link.click();
  
          link.remove();
  
        });
  
    };
  
  }