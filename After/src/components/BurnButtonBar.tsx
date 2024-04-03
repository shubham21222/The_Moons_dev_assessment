
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
      <p className="box_subheader">Burn your App</p>
      <div className="description medium">
        &quot; The process of reducing the supply of App tokens by
        permanently removing a certain number of them from circulation,
        often through a deliberate and recorded mechanism. &quot;
      </div>
      <div className="burn_bar">
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
