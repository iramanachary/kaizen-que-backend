import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form';
import FormList from './pages/FormList';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<FormList/>}/>
           <Route path='/form-data' element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
