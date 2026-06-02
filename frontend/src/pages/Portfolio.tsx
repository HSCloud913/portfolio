import Nav from '../components/Nav'
import Hero from '../components/Hero'
import TechStack from '../components/TechStack'
import Projects from '../components/Projects'
import Career from '../components/Career'
import Contact from '../components/Contact'
import CursorGlow from '../components/CursorGlow'

export default function Portfolio() {
    return (
        <div style={{background: '#050508'}}>
            <CursorGlow/>
            <Nav/>
            <Hero/>
            <TechStack/>
            <Projects/>
            <Career/>
            <Contact/>
        </div>
    )
}
