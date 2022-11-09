import { useState, useRef, FormEvent, useEffect } from 'react'
import './App.scss'

function App() {
  const [suggestions, setSuggestions] = useState<Array<object>>([])
  const searchRef = useRef<HTMLInputElement>(null)
  const searchValueRef = useRef<string>(null)
  const $ = (el: string) => document.querySelector(el)

  const handleKeydown = (e: KeyboardEvent): void => {
    document.activeElement !== searchRef.current && searchRef.current.focus()
    const value = encodeURIComponent(searchValueRef.current)
    let url = ''
    if (e.key === 'Enter') {
      url = `https://google.com/search?q=${value}&pws=0&gl=us&gws_rd=cr`
    }
    if (e.ctrlKey && e.key === 'Enter') {
      url = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${value}`
    }
    if (e.shiftKey && e.key === 'Enter') {
      url = `https://github.com/search?q=${value}`
    }
    if (url) {
      open(url, '_blank')
      return
    }
    handleSuggestions()
  }
  const jsonp = (url: string) => {
    const script = document.createElement('script')
    script.src = url
    $('head')?.appendChild(script)
    $('head')?.removeChild(script)
  }
  const handleSuggestions = (): void => {
    const callback: string = 'autocompleteCallback'
    window[callback] = (res: Array<any>) => {
      setSuggestions(res[1])
    }
    const suggestEngine = {
      google: 'https://www.google.com/complete/search?client=chrome&hl=en',
      duckduckgo: 'https://duckduckgo.com/ac?',
    }
    jsonp(
      `${suggestEngine.google}&q=${searchValueRef.current}&callback=${callback}`,
    )
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
  }, [])
  return (
    <div className='App'>
      <input
        ref={searchRef}
        type='text'
        aria-label='search'
        onInput={(e: FormEvent<HTMLInputElement>) => {
          searchValueRef.current = (e.target as HTMLInputElement).value
        }}
      />
      <div>
        {searchValueRef.current &&
          suggestions.map((i, idx) => <div key={idx}>{i}</div>)}
      </div>
    </div>
  )
}

export default App
