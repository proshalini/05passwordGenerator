import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [password, setpassword] = useState("")
  const [numberAllowed, setnumberAllowed]=useState(false)
  const [characterAllowed, setcharacterAllowed]=useState(false)
  const [length, setlength]=useState(8)
  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str +="0123456789"
    if(characterAllowed) str+="!@#$%^&*()_+=[]{}~`"

    for(let i=1;i<=length;i++)
    {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)

  },[length,numberAllowed,characterAllowed,setpassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback( () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  
  return (

      <div className="w-full max-w-md mx-auto rounded-lg shadow-md px=4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center my-3'>Password Generator</h1> 
        <div className='flex shadow rounded-lg overflow-hidden mb-4 mx-3'>
          <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ml-3 rounded-lg hover:bg-blue-400 cursor-pointer'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength (e.target.value)}}/>
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center hap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setnumberAllowed((prev) => !prev);
            }
            }/>
            <label>Numbers</label>
          </div>
          <div className='flex items-center p-x-1'>
            <input
            type='checkbox'
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={()=>{
              <div className='flex items-center p-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setnumberAllowed((prev) => !prev);
            }
            }/>
            <label>Numbers</label>
          </div>
            }
            }/>
            <label>Characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
