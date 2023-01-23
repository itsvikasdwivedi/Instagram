
import './App.css'
import Bio from './components/Bio'
import Content from './components/Content'
// import Gallery from './components/Gallery'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Bio />
        {/* <Gallery /> */}
      </div>
      <Content/>
    </>
  )
}

export default App
