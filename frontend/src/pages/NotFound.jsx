import { Button } from "../components/ui/button"


const NotFound = () => {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
      <img className="w-full h-full object-contain" src="/404.png" alt="notfound"/>
      <Button onClick={() => window.history.back()}>Go Back</Button>
    </div>
  )
}

export default NotFound