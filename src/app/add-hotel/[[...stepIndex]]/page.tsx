import PageAddListing1 from "./pageAddListing1";
import PageAddListing2 from "./pageAddListing2";
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
    default:
      ContentComponent = PageAddListing1;
      break;
  }


  return <ContentComponent />;
};

export default Page;