import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <nav className="bg-gray-800 p-2 h-14 flex items-center">
        <div className='ml-16'>
            <img className="h-8 pl-2" src={require('./logo.jpg')} alt='Applicaton Logo'/>
        </div>
        <Link to='/users'>
            <div className='ml-14 text-white'>Home</div>
        </Link>
        
    </nav>
  )
}
