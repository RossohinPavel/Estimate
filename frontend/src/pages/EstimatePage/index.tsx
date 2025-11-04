import { useParams } from "react-router-dom";


export const EstimatePage = () => {
  const { estimateId } = useParams() as { estimateId: string };

  return <>`Эта страничка для работы со сметой #{estimateId}`</>;
};
