import { useEffect } from 'react';

const useEthersSigner = ({ chainId }: { chainId: number }) => {

  useEffect(() => {
    //logic for ethersSigner
  }, [chainId]);
  return ethersSigner;
};

export default useEthersSigner;