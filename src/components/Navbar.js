import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { Switch } from '@headlessui/react'
import Search from './Search'
import useStore from '@/store/index'

const Navbar = ({ appName, appId }) => {
  const ACTION_KEY_DEFAULT = ['Ctrl', 'Control', 'CONTROL']
  const ACTION_KEY_APPLE = ['⌘', 'Command']
  const [open, setOpen] = useState(false)
  const [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT)
  const router = useRouter()
  const searchButtonRef = useRef()
  const searchInputRef = useRef()
  const theme = useStore(state => state.theme)
  const setDark = useStore(state => state.themeDark)
  const setLight = useStore(state => state.themeLight)
  const [enabled, setEnabled] = useState(false)

  // checking for platform
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      ;/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? setActionKey(ACTION_KEY_APPLE)
        : setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  // setting check action
  useEffect(() => {
    function onKeyDown(e) {
      if (actionKey.map(k => e.key === k.toString()) && e.key === '/') {
        e.preventDefault()
        searchButtonRef.current.click()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [actionKey])

  return (
    <>
      <nav
        className={clsx(
          'fixed inset-x-0 top-0 z-10 grid grid-cols-[auto,auto] gap-3 px-8 py-4 shadow md:px-16 xl:px-36 lg:px-28 md:grid-cols-nav',
          {
            'text-yellow-900 bg-white': theme,
            'text-yellow-200 bg-neutral-900 border-b-[0.5px] border-current':
              theme === 'light'
          }
        )}
      >
        <div className="">
          <Link href="/">
            <a className="inline-flex items-center w-auto space-x-">
              <Image
                src={require('@/img/glab.png')}
                alt="glab icon"
                height={40}
                width={40}
                className="inline w-auto h-8"
              />
              <h1 className="inline w-auto text-xl font-semibold">{appName}</h1>
            </a>
          </Link>
        </div>
        <div
          className={clsx(
            'flex items-center justify-end space-x-3 md:col-start-3 md:row-start-1 md:col-end-4',
            {
              'text-yellow-900': theme === 'dark',
              'text-yellow-200': theme === 'light'
            }
          )}
        >
          <a href="https://twitter.com/glab_cli" target="_blank">
            <FaTwitter className="w-auto h-8 text-current transition-colors" />
          </a>
          <a href="https://github.com/profclems/glab" target="_blank">
            <FaGithub className="w-auto h-8 text-current transition-colors" />
          </a>

          {/* menu button */}
          <Switch
            checked={enabled}
            onChange={() => {
              setEnabled(!enabled)
              if (theme !== 'light') {
                setLight()
                localStorage.setItem(appId, 'light')
              } else {
                setDark()
                localStorage.setItem(appId, 'dark')
              }
            }}
            className={clsx(
              'relative inline-flex flex-shrink-0 h-[30px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
              {
                'bg-yellow-900': theme === 'dark',
                'bg-yellow-200': theme === 'light'
              }
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={clsx(
                'pointer-events-none h-[26px] w-[26px] rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200 inline-flex items-center justify-center',
                {
                  'translate-x-7 bg-neutral-900': theme === 'light',
                  'bg-white': theme === 'dark'
                }
              )}
            >
              {theme === 'light' ? (
                <HiMoon className="w-auto h-4" />
              ) : (
                <HiSun className="w-auto h-4" />
              )}
            </span>
          </Switch>
        </div>
        <div className="flex flex-col space-y-5 lg:space-y-0 lg:items-center lg:flex-row-reverse col-span-full lg:col-start-2 lg:col-end-3">
          <div className="space-x-1 font-semibold lg:ml-2">
            <Link href="/docs">
              <a
                className={clsx('px-3 py-2 rounded cursor-pointer', {
                  'bg-yellow-200': router.pathname.split('/')[1] === 'docs',
                  'text-yellow-900':
                    theme === 'light' &&
                    router.pathname.split('/')[1] === 'docs'
                })}
              >
                Docs
              </a>
            </Link>
            <a
              href="https://opencollective.com/glab"
              target="_blank"
              className="px-3 py-2 rounded cursor-pointer"
            >
              Donate
            </a>
          </div>
          <button
            type="button"
            ref={searchButtonRef}
            className={clsx(
              'block w-full px-4 py-2 text-xs font-semibold bg-yellow-200 rounded sm:text-sm md:text-base focus:outline-none',
              {
                'text-yellow-900': theme === 'light'
              }
            )}
            onClick={() => setOpen(true)}
          >
            Search Docs (Press “
            <abbr title={actionKey[1]} className="no-underline">
              {actionKey[0]}
            </abbr>{' '}
            + /” to focus)
          </button>
        </div>
      </nav>
      <Search open={open} setOpen={setOpen} searchInputRef={searchInputRef} />
    </>
  )
}

export default Navbar
