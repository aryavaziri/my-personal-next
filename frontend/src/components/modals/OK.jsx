
const OK = ({ message, active, setActive, refresh }) => {
  active && message && console.log(message)
  return (
    <div className={`fixed z-[80] top-0 left-0 w-screen pt-[40vh] bg-slate-100/50 dark:bg-dark/50 h-screen backdrop-blur-[2px] ${!active && "hidden"}`} onClick={() => { setActive(false) }} >
      <div className={`max-w-xs rounded-lg overflow-hidden mx-auto bg-arya3`}>
        <h1 className={`text-center text-2xl dark:text-dark p-4 py-2`} >
          {message ? message : `You are not able to do this action`}
        </h1>
        <div className={`flex justify-evenly w-full `}>
          <button onClick={() => { setActive(false); refresh() }} className={`hover:bg-light/80 text-dark text-2xl grow p-2`} >OK</button>
        </div>
      </div>
    </div>
  )
}

export default OK