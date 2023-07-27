import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Home</h1>}></Route>
      <Route path='new' element={<h1>new</h1>}></Route>
      <Route path='/:id' >
        <Route index element={<h1>Id</h1>}></Route>
        <Route path='edit' element={<h1>Edit</h1>}></Route>
      </Route>
      <Route path='*' element={<Navigate to={'/'} />}></Route>

    </Routes>
  </BrowserRouter>


}

export default App
