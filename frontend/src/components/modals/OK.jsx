
const OK = ({ message, active, setActive, refresh }) => {
  // console.log(message)
  active && message && console.log(message)
  return (
    <div className={`fixed z-[80] top-0 left-0 w-screen pt-[40vh] bg-light/80 dark:bg-dark/80 h-screen backdrop-blur-[2px] ${!active && "hidden"}`} onClick={() => { setActive(false) }} >
      <div className={`max-w-xs sm:max-w-sm rounded-lg overflow-hidden mx-auto bg-arya3`}>
        <h1 className={`text-center text-2xl dark:text-dark p-6 py-4`} >
          {message ? message : `You are not able to do this action`}
        </h1>
        <div className={`flex justify-evenly w-full `}>
          <button onClick={(e) => { e.preventDefault(); setActive(false) }} className={`bg-dark/20 hover:bg-light/80 hover:dark:bg-dark/60 text-dark text-2xl grow p-3`} >OK</button>
        </div>
      </div>
    </div>
  )
}

export default OK