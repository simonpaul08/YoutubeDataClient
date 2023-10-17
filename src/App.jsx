import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Results from './pages/Results'
import RequestCallback from './components/RequestCallback'
import { useState } from 'react'
import { useDataContext } from './context/DataContext'

function App() {

  const [isModal, setIsModal] = useState(false);
  const { data } = useDataContext();

  const showModal = () => {
    setIsModal(true);
  }

  const closeModal = () => {
    setIsModal(false);
  }

  return (
    <>
      {isModal && <RequestCallback closeModal={closeModal}/>}
      <Header showModal={showModal}/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='results' element={data ? <Results /> : <Navigate to="/"/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
