import React from 'react';

/**
 * Component for rendering the burn button bar.
 * @param {Object} props - The props object.
 * @param {string} props.burnAmount - The amount of tokens to burn.
 * @param {Function} props.onChangeBurnAmount - Function to handle input change for burn amount.
 * @param {Function} props.executeBurn - Function to execute the burn process.
 * @param {string} props.txButton - The text to display on the burn button.
 * @param {boolean} props.txProgress - Flag indicating whether a transaction is in progress.
 * @param {string} props.burnTxHash - The hash of the burn transaction.
 * @param {string} props.walletChain - The chain of the wallet.
 * @returns {JSX.Element} - JSX element representing the burn button bar.
 */
const BurnButtonBar = ({
  burnAmount,
  onChangeBurnAmount,
  executeBurn,
  txButton,
  txProgress,
  burnTxHash,
  walletChain
}) => {
  return (
    <div className="info_box filled">
      {/* Box Subheader */}
      <p className="box_subheader">Burn your App</p>
      {/* Description */}
      <div className="description medium">
        &quot; The process of reducing the supply of App tokens by
        permanently removing a certain number of them from circulation,
        often through a deliberate and recorded mechanism. &quot;
      </div>
      {/* Burn Bar */}
      <div className="burn_bar">
        {/* Input Value Box */}
        <div className="input_value_box">
          <p className="input_muted">Enter amount to Burn</p>
          <input
            className="input_value"
            type="text"
            value={burnAmount}
            placeholder="0.00"
            onChange={onChangeBurnAmount}
          />
        </div>
        <button
          onClick={executeBurn}
          disabled={txProgress} 
        >
          {txButton}
        </button>
      </div>
      {burnTxHash && (
        <div className="tx_links">
        </div>
      )}
    </div>
  );
};

export default BurnButtonBar;
