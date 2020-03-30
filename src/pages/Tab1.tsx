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
  const [getVid,setVid]  = useState("");
  
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

 
  const playViedo = ( e:any ) =>{
    console.log(e)
    setList(true)
    setVid(e)
  }
  return (
    <IonPage>

{getModal && <IonModal isOpen={getModal}>
        <video src={getVid} autoPlay controls />
        <IonButton onClick={() => setList(false)}>Close</IonButton>
      </IonModal>}

      
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
{viedoData.map((e:any)=>{
  return <IonCard>
          <IonImg className="vid-image" src={e.picture} />
          

          <IonCardContent>
            <IonItem>
              <IonLabel>{e.title}</IonLabel>
              <a download="foo.txt"  href={e.vedioUrl}  >
            <IonIcon icon={download} color={"danger"} />
            </a>
            <IonIcon icon={play} onClick={() => playViedo( e.vedioUrl )} color={"success"} slot={"end"}/>
          
            </IonItem>
          </IonCardContent>
        </IonCard>

})}
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
