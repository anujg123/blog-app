import React from 'react'
import LogoutBtn from './LogoutBtn'
import Container from '../container/container'
import Logo from '../Logo'
import { Link , useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Header() {
  const authstatus = useSelector((state)=>state.auth.status);
  

  const navItems =[
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name : 'Login',
      slug : '/login',
      active : !authstatus, 
    },
    {
      name : 'Signup',
      slug : '/signup',
      active : !authstatus,
    },
    {
      name : 'All Posts',
      slug : '/all-post',
      active : authstatus,
    },
    {
      name : 'Add Post',
      slug : '/add-post',
      active : authstatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => Navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authstatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
