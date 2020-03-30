import React,{useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCard, IonCardContent, IonIcon, IonLabel, IonImg, IonModal, IonButton } from '@ionic/react';
import './Tab1.css';
import { download, play } from 'ionicons/icons';
import Axios  from "axios";
const Tab1: React.FC = () => {

 

  const [Play, isPlay ] = useState(false);
  const [viedoData, isviedoData ] = useState([]);
  const [getList,isGetList]  = useState(true);

  const [getModal,setList]  = useState(false);
  const [getVid,setVid]  = useState({vedioUrl:""});
  const [getVidIndex,setVidIndex]  = useState(1);
  const [getcounter,setcounter]  = useState(1);
  
  if (getList)
  {
    Axios.request({
      method:"GET",
      url:"http://34.93.156.149:7000/vpost"
    }).then((e:any) =>{
      isviedoData( e.data.data );
      isGetList( false )
    })
  }

 
  const playViedo = ( e:any,index:number ) =>{
    
    setList(true)
    setVidIndex(index)
    setVid(e)
  }
  const nextVedio =()=>{
    let data = viedoData;
    console.log(data[getVidIndex+getcounter])
    setVid(data[getVidIndex+getcounter])
    setcounter(getcounter+1)
  }
  const onClose =()=>{
    setList(false);
    setcounter(1)
  }
  return (
    <>
    {getModal && <IonModal isOpen={getModal}>
        <video src={getVid.vedioUrl} className="video-cafe" autoPlay controls />
        <IonButton color="danger" onClick={() => nextVedio()}>Next</IonButton>
        <IonButton onClick={() => onClose()}>Close</IonButton>
      </IonModal>}
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Tik Tok </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeaders> */}
{viedoData.map((e:any,index)=>{
  return <IonCard  onClick={() => playViedo( e,index )}>
          <IonImg className="vid-image"   src={e.picture} />
          

          <IonCardContent >
            <IonItem >
              <IonLabel>{e.title}</IonLabel>
              <a download="foo.txt"  href={e.vedioUrl}  >
            <IonIcon icon={download} color={"danger"} />
            </a>
            <IonIcon icon={play} onClick={() => playViedo( e,index )} color={"success"} slot={"end"}/>
          
            </IonItem>
          </IonCardContent>
        </IonCard>

})}
      </IonContent>
    </IonPage>
    </>
  );
};
export default Tab1;
