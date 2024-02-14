import React,{useState,useEffect} from 'react';
import { Card  } from 'antd';
import './showRoom.css';
import { RoomInterface } from '../../../interface/IRoom';
import { GetAllRoom } from '../../../services/https/room';

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
    width:'100%',
    height: '480px',
    color:'white',
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    position:'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  };

export default function ShowRoom(){
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const getRooms = async () => {
      let res = await GetAllRoom();
      if(res){
      setRooms(res);
      }
  };
  console.log(rooms);
  
  useEffect(() => {
    getRooms();
  }, []);

  return(
      
    <div className='showRoom-bg'>
      <div className='showRoom-blur'>
      <div style={{justifyItems: 'center', alignItems: 'center'}}>
          <div style={{display:'flex',flexDirection:'row',flexWrap: 'wrap', position:'relative', justifyContent: 'center', alignItems: 'center'}}>
            {rooms.map((room, index) => (
              <Card
                key={index}
                // hoverable
                style={{ width: 300,height: 300, margin: 16}}
                cover={<img alt="Room Image" src={room.Room_img} width={300} height={215} />}
              >
                <Meta title={room.Room_number} description={`${room.RoomType?.RoomType_name}, ${room.RoomZone?.RoomZone_name}`} />
              </Card>                  
            ))}
        </div>
      </div>
      </div>
    </div>  
  )
}