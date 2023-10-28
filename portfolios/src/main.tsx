import ReactDOM from 'react-dom/client'
import App from './App.tsx'


import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { SearchContext } from './context/Search.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <SearchContext>
      <App />
      <ToastContainer />
    </SearchContext>
  </>,
)
