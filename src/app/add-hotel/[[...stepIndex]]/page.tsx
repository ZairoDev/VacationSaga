import PageAddListing1 from "./pageAddListing1";
import PageAddListing2 from "./pageAddListing2";
import PageAddListing3 from "./pageAddListing3";
import PageAddListing4 from "./pageAddListing4";
import PageAddListing5 from "./pageAddListing5";

const Page = ({
  params,
  searchParams,
}: {
  params: { stepIndex: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let ContentComponent = PageAddListing1;
  switch (Number(params.stepIndex)) {
    case 1:
      ContentComponent = PageAddListing1;
      break;
    case 2:
      ContentComponent = PageAddListing2;
      break;
    case 3:
      ContentComponent = PageAddListing3;
      break;
    case 4:
      ContentComponent = PageAddListing4;
      break;
    case 5:
      ContentComponent = PageAddListing5;
      break;
    default:
      ContentComponent = PageAddListing1;
      break;
  }


  return <ContentComponent />;
};
export default Page;