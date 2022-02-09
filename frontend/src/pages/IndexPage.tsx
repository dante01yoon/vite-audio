import { FC } from "react";
import { TextBox } from "@components/index"

interface IndexPageProps {
  
}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <div className="container mx-auto px-14 flex flex-row">
      <TextBox flexBasis="basis-1/2"/>
      <TextBox flexBasis="basis-1/2" readOnly />
    </div>
  )
}

export default IndexPage;