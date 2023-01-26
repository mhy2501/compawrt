import MyNavBar from '../components/MyNavBar'
import Hero from '../components/Hero'
import HomeImg from '../assets/background.png'
import { Outlet } from 'react-router-dom'

function Home(){
    return (
        <>
            <MyNavBar />
            <Hero 
            cName= 'heroImg'
            img= {HomeImg}
            title= 'ComPawrt is a place where you can report and save stray animals.'
            text= 'Found one?'
            btnText= 'Report Now'
            url= '/signup'
            />
            {/* <Outlet /> */}
        </>
    )
}

export default Home