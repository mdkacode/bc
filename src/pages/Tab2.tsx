import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCard, IonCardContent, IonIcon, IonLabel, IonImg, IonModal, IonButton, IonGrid, IonRow } from '@ionic/react';
import './Tab2.css';
import { download, play, grid } from 'ionicons/icons';
import Axios  from "axios";
import { someFunction } from '../utils/download';
import ReactPlayer from 'react-player'
import {WhatsappShareButton} from 'react-share';

import "video-react/dist/video-react.css";

const Tab2: React.FC = () => {

 

  const [Play, isPlay ] = useState(false);
  const [viedoData, isviedoData ] = useState([]);
  const [getList,isGetList]  = useState(true);

  const [getModal,setList]  = useState(false);
  const [getVid,setVid]  = useState({vedioUrl:"",vId:""});
  const [getVidIndex,setVidIndex]  = useState(1);
  const [getcounter,setcounter]  = useState(1);
  const [isVedioPlay,setVedioPlay]  = useState(true);

  if (getList)
  {
    Axios.request({
      method:"GET",
      url:"http://192.168.0.102:7000/youtubeList?name=Top Punjabi Songs"
    }).then((e:any) =>{
      isviedoData( e.data.data );

      isGetList( false )
    })
  }

 
 
  const playViedo = ( e:any,index:number ) =>{
    // someFunction( e )
    setList(true)
    setVidIndex(index)
    setVid(e)
    setVedioPlay(true)
  }
  const nextVedio =()=>{
    let data = viedoData;
    console.log(data[getVidIndex+getcounter])
    setVid(data[getVidIndex+getcounter])
    setcounter(getcounter+1)
    setVedioPlay(true)
  }
  const onClose =()=>{
    setList(false);
    setcounter(1)
  }
  const pauseVedio =(isVedioPlay:any) =>{
    return isVedioPlay ? setVedioPlay(false) : setVedioPlay(true)
  }
  return (
    <>
    {getModal && <IonModal isOpen={getModal}>
        {/* <video src={getVid.vedioUrl} className="video-cafe" autoPlay controls /> */}
        <div onClick={ (e) => pauseVedio(isVedioPlay)} className='wrapper'>
        <ReactPlayer
          url={`http://192.168.0.102:7000/serve?name=${getVid.vId}`}
          playing={isVedioPlay}
          width='100%'
          height="100vh"
          className='player'
          loop
        />
        <div className='overlay'>
        	<IonGrid className="Position-botton">
            <IonRow>
              <IonButton color="danger" onClick={() => nextVedio()}>Next</IonButton>
              <IonButton onClick={() => onClose()}>Close</IonButton>
              
              
              </IonRow>
          </IonGrid>
        </div>
      </div>
    {/* <IonButton color="danger" onClick={() => nextVedio()}>Next</IonButton>
        <IonButton onClick={() => onClose()}>Close</IonButton> */}
      </IonModal>}
    <IonPage >

      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tik Tok </IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeaders> */}
        <IonGrid className="grid-area">
          <IonRow className="item-gallary">
{viedoData.map((e:any,index)=>{
  return <IonCard className="vid-image" style={{backgroundImage:`url(${e.picture})`}} onClick={() => playViedo( e,index )}>
          
          

          <IonCardContent className="title-grd" >
            <IonItem  >
              <IonLabel >{e.title.substr(0,35)}</IonLabel>
              {/* <a download="foo.txt"  href={e.vedioUrl}  >
            <IonIcon icon={download} color={"danger"} />
            </a> */}
            {/* <IonIcon icon={play} onClick={() => playViedo( e,index )} color={"success"} slot={"end"}/> */}
          
            </IonItem>
          </IonCardContent>
        </IonCard>

})}
</IonRow>
</IonGrid>
      </IonContent>
    </IonPage>
    </>
  );
};
export default Tab2;
