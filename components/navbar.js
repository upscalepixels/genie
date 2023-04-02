import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()

  const isActive = (pathname) => {
    return router.pathname === pathname ? 'active' : ''
  }

  return (
    <div className="navbar container">
      <Link href="/" passHref>
        <div className={isActive('/')}>Shirt</div>
      </Link> 
      <Link href="/painting" passHref>
        <div className={isActive('/painting')}>Painting</div>
      </Link>  
      <Link href="/logo" passHref>
        <div className={isActive('/logo')}>Logo</div>
      </Link>        
    </div>
  )
}

export default Navbar
