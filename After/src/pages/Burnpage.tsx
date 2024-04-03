// BurnPage.tsx

import React from 'react';
import useBurnPage from '../hooks/useBurnPage';
import BurnButtonBar from '../components/BurnButtonBar';
import BurnStatsContainer from '../components/BurnStatsContainer';
import TransactionTable from '../components/TransactionTable';
import ChainSelector from '../components/ChainSelector';
import AppToast from '../hooks/useAppToast';
import DashboardLayoutStyled from '../components/DashboardLayout';

/**
 * Component for rendering the burn page.
 * @returns {JSX.Element} - JSX element representing the burn page.
 */
const BurnPage = () => {
  const {
    burnTransactions,
    burnAmount,
    txButton,
    txProgress,
    burnTxHash,
    onChangeBurnAmount,
    executeBurn,
  } = useBurnPage();

  return (
    <div>
      <DashboardLayoutStyled className="burnpage">
        <div className="top_conatiner burnpage" style={{ alignItems: 'flex-start' }}>
          <div className="info_box filled">
            <h1 className="title">App TOKEN BURN</h1>
            <p className="description medium"></p>

            {/* Burn Button Bar */}
            <BurnButtonBar
              burnAmount={burnAmount}
              onChangeBurnAmount={onChangeBurnAmount}
              executeBurn={executeBurn}
              txButton={txButton}
              txProgress={txProgress}
              burnTxHash={burnTxHash}
            />
          </div>
          {/* Burn Stats Container */}
          <BurnStatsContainer
            burnTransactions={burnTransactions}
            burnTxHash={burnTxHash}
          />
        </div>
      </DashboardLayoutStyled>

      {/* Transaction Table */}
      <TransactionTable data={burnTransactions} />

      {/* Chain Selector */}
      <ChainSelector 
        title={"Switch Token Chain"}
      />

      {/* App Toast */}
      <AppToast
        position={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default BurnPage;

