import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { ShoppingCart, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ModeToggle from './mode-toggle'
import Menu from './menu'

const Header = () => {
  return (
    <header className='w-full border-b'>
    <div className='wrapper flex-between'>
      <div className='flex-start'>
        <Link href='/' className='flex-start'>
          <Image
            priority={true}
            src='/images/logo.svg'
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
          />
          <span className='hidden lg:block font-bold text-2xl ml-3'>
            {APP_NAME}
          </span>
        </Link>
      </div>
      <Menu />
    </div>
  </header>
  )
}

export default Header;