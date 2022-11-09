import { useState, useRef, FormEvent, useEffect } from 'react'
import './App.scss'

function App() {
  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Array<object>>([])
  const searchRef = useRef<HTMLInputElement>(null)

  const handleKeydown = (e: KeyboardEvent, value: string): void => {
    let url = ''
    if (e.ctrlKey && e.key === 'Enter') {
      url = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${value}`
    }
    if (e.shiftKey && e.key === 'Enter') {
    }
    if (e.key === 'Enter') {
      url = `https://google.com/search?q=${value}&pws=0&gl=us&gws_rd=cr`
    }
    if (e.key === 'Escape') {
      console.log('hello Escape')
    }
    if (url) location.assign(url)
  }
  const jsonp = (url: string) => {
    let script = document.createElement('script')
    script.src = url
    document.querySelector('head')?.appendChild(script)
    document.querySelector('head')?.removeChild(script)
  }
  const handleSuggestions = (val: string): void => {
    const callback: string = 'autocompleteCallback'
    window[callback] = (res: Array<any>) => {
      setSuggestions(res[1])
    }
    const suggestEngine = {
      google: 'https://www.google.com/complete/search?client=chrome&hl=en',
      duckduckgo: 'https://duckduckgo.com/ac?',
    }
    jsonp(`${suggestEngine.google}&q=${val}&callback=${callback}`)
  }
  useEffect(() => {
    value && handleSuggestions(value)
  }, [value])
  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeydown(e, value))
    searchRef.current && searchRef.current.focus()
  }, [value])
  return (
    <div className='App'>
      <input
        ref={searchRef}
        type='text'
        aria-label='search'
        value={value}
        onInput={(e: FormEvent<HTMLInputElement>) => {
          setValue((e.target as HTMLInputElement).value)
        }}
      />
      <div>
        {suggestions.map((i, idx) => (
          <div key={idx}>{i}</div>
        ))}
      </div>
    </div>
  )
}

export default App
