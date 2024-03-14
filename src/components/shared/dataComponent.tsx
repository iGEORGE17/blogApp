import { dataProps } from "@/data/data"




const DataComponent = ({name, job, location}:dataProps) => {
  return (
    <div>
        <h1 className="">{name}</h1>
        <h4 className="">{job}</h4>
        <h4 className="">{location}</h4>
    </div>
  )
}

export default DataComponent