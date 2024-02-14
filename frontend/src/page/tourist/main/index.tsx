import { Link } from "react-router-dom"
import "./main.css"

function Main() {
    return (
        <>
            <div className="main-video">
                <div className="middle-word">
                    <h1>Cruise Ship</h1>
                </div>
                <div className="buttom-right-word">
                    <Link to="https://www.youtube.com/watch?v=3iqEq10G-Z8&t=44s" target="_blank">
                        Credit Video By
                    </Link>
                </div>
                <video
                    autoPlay
                    loop
                    muted
                    src={require("../../../asset/cruise.mp4")}
                />
            </div>
        </>
    )
}

export default Main