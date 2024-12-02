import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  return (
    <header>
      <div className='header'>
        <Link to={'/'}>RTX logos</Link>
        <Link to={'/hero'}>Crud</Link>
      </div>
    </header>
  )
}

export default Header
