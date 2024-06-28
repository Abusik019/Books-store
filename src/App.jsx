import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks';
import Book from './pages/Book';

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}>
            <Route index element={<PageOne/>}/>
            <Route path=':id' element={<PageTwo/>}/>
          </Route>
        </Routes>      
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllBooks/>}/>
          <Route path='/:id' element={<Book/>}/>
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App