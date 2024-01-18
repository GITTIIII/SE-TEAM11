import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Form, Card } from 'antd';
import "./showRoom.css"
import { GetAllRoom } from '../../../services/https/room';
import { RoomInterface } from '../../../interface/IRoom';

// const gridStyle: React.CSSProperties = {
//   width: '25%',
//   textAlign: 'left',
// };

const { Meta } = Card;

export default function ShowRoom() {
  const [listRoom, setAllRoom] = useState<RoomInterface[]>([]);
  const getAllRoom = async () => {
    let res = await GetAllRoom();
    if (res) {
      setAllRoom(res);
    }
  };
  useEffect(() => {
    getAllRoom();
  }, []);
  return (
    <div className='showRoom-bg'>
      <Card
        // hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://img.freepik.com/premium-photo/panoramic-window-villa-with-blue-sea-views_88088-755.jpg?w=1060" />}
      >
        <Meta title="Room Number" description="Room Type & Room Zone" />
        {/* <p></p> */}
      </Card>
    </div>
    //   {/* <Card>
    //   <Card.Grid hoverable={false} style={gridStyle}>
    //     <p>
    //       <b>Phone Number:</b>
    //     </p>
    //   </Card.Grid>
    //   <Card.Grid hoverable={false} style={{ width: '75%', textAlign: 'left' }}>
    //     <p>
    //       <b>Plan Name:</b>
    //     </p>
    //     <p>
    //       <b>Port Destination:</b>
    //     </p>
    //     <p>
    //       <b>Port Origin:</b>
    //     </p>
    //     <p>
    //       <b>Room Number:</b>
    //     </p>
    //     <p>
    //       <b>Food Set Name:</b>
    //     </p>
    //   </Card.Grid>
    // </Card> */}
  );
}
