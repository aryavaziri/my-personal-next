import Image from "next/image"

const Icon = ({ item }) => {
  
  return (
    <div className="relative w-8">
      <Image
        alt={item}
        src={`logo/${item}.svg`}
        fill
        sizes="20vw"
      />
    </div>
  )
}

export default Icon