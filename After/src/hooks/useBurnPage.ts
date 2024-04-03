import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { fetchAddressForChain } from '../utils/addressUtils'; 
import { parseEther } from '../utils/parseEtherUtils'; 

// Define BurnTxProgress 
enum BurnTxProgress {
  default = 'Default', // Modify the enum values as needed
  burning = 'Burning...',
}

// Define the type for ToastSeverity
type ToastSeverity = 'info' | 'success' | 'warning' | 'error';

const useBurnPage = ({
  isWalletConnected,
  openConnectModal,
  showToast,
  ToastSeverity,
  walletChain,
  ethersSigner,
  refetchTransactions,
  fetchSupplies,
}: {
  isWalletConnected: boolean;
  openConnectModal: () => void;
  showToast: (message: string, severity: ToastSeverity) => void;
  ToastSeverity: ToastSeverity; 
  walletChain: any; 
  ethersSigner: any; 
  refetchTransactions: () => void;
  fetchSupplies: () => void;
}) => {
  const [burnAmount, setBurnAmount] = useState('');
  const [txButton, setTxButton] = useState<BurnTxProgress>(BurnTxProgress.default);
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);

  const onChangeBurnAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') setBurnAmount('');
    if (isNaN(parseFloat(e.target.value))) return;
    setBurnAmount(e.target.value);
  };

  const executeBurn = async () => {
    if (!isWalletConnected) {
      openConnectModal();
      return;
    }
    if (burnAmount === '') {
      console.log('Enter amount to migrate');
      showToast('Enter amount to migrate', ToastSeverity.warning);
      return;
    }
    const newTokenAddress = fetchAddressForChain(walletChain?.id, 'newToken');
    const oftTokenContract = new Contract(
      newTokenAddress,
      [], 
      ethersSigner
    );
    let amount = parseEther(burnAmount);
    setTxButton(BurnTxProgress.burning);
    setTxProgress(true);
    try {
      const burnTx = await oftTokenContract.burn(amount);
      setBurnTxHash(burnTx.hash);
      console.log(burnTx, burnTx.hash);
      await burnTx.wait();
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      refetchTransactions();
      fetchSupplies();
    } catch (err) {
      console.log(err);
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      showToast('Burn Failed!', ToastSeverity.error);
    }
  };

  useEffect(() => {
    // useEffect logic 
  }, []);

  return {
    burnTransactions,
    burnAmount,
    txButton,
    txProgress,
    burnTxHash,
    onChangeBurnAmount,
    executeBurn,
  };
};

export default useBurnPage;
