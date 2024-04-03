import { useEffect, useState } from 'react';
import { isChainTestnet } from '../utils/chainUtils';
import { mainnet, avalanche, fantom, sepolia, avalancheFuji, fantomTestnet } from '../constants/chainConstants';
import { fetchAddressForChain } from '../utils/addressUtils';
// Import ChainScanner 

const useBurnTransactions = (walletChain: any, isOldToken: boolean) => {
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!walletChain) return;

    let isSubscribed = true;
    if (isSubscribed) setBurnTransactions([]);

    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects: Chain[] = [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];


    Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
      .then((results: any) => {
        if (isSubscribed) {
          let new_chain_results: any[] = [];
          results.forEach((results_a: any[], index: number) => {
            new_chain_results.push(
              results_a.map((tx: any) => ({
                ...tx,
                chain: _chainObjects[index],
              }))
            );
          });
          let res = new_chain_results.flat();
    
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);

  return burnTransactions;
};

export default useBurnTransactions;
