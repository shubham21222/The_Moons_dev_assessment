import { numberWithCommas } from '../utils/numberUtils';
import { IconFilter } from '../constants/IconFilter';
import { AppIcon, AppChip, AppExtLink } from './AppComponents';
import { chainTokenSymbols } from '../utils/chainUtils';

/**
 * BurnStatsContainer component displays statistics related to token burning.
 * @param {Object} props - Component props.
 * @param {Object} props.statsSupplies - Statistics related to token supplies.
 * @param {Object} props.walletChain - Information about the selected wallet chain.
 * @param {Object} props.suppliesChain - Information about the supplies chain.
 * @param {string} props.tokenAddress - Address of the token.
 * @param {Object[]} props.allSupplies - Array of all token supplies.
 * @returns {JSX.Element} - JSX element representing the BurnStatsContainer component.
 */
const BurnStatsContainer = ({
  statsSupplies,
  walletChain,
  suppliesChain,
  tokenAddress,
  allSupplies
}: any) => {
  return (
    <div>
      {/* Top bar displaying App supply information */}
      <div className="top_bar">
        {/* App icon */}
        <AppIcon
          url="/images/token/App_new.svg"
          size={2}
          margin={0}
          fill={IconFilter.unset}
        />
        {/* Label */}
        <p className="label">App SUPPLY</p>
        {/* Chip to display wallet chain name */}
        <AppChip
          onClick={openChainModal} // Assuming openChainModal function is defined
          title={walletChain?.name || '---'}
          endIcon="/icons/expand_more.svg"
          startIcon={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
        />
        {/* Link to view contract on block explorer */}
        <AppExtLink
          className="supply_label"
          url={`${suppliesChain?.blockExplorers?.default?.url}/address/${tokenAddress}`}
        >
          View Contract
        </AppExtLink>
      </div>
      {/* Supply bar displaying burnt and circulating tokens */}
      <div className="supply_bar">
        {/* Burnt and circulating icons */}
        <AppIcon
          url="/icons/fire.svg"
          size={1.15}
          margin={0}
          fill={IconFilter.primary}
        />
        <AppIcon
          url="/icons/double_arrow.svg"
          size={1.15}
          style={{
            margin: '0 0 0 -0.8rem',
          }}
          fill={IconFilter.primary}
        />
        {/* Bar representing burnt and circulating tokens */}
        <span
          className="line orange"
          style={{ width: `${100 - statsSupplies.circulatingPercent}%` }}
        />
        <span
          className="line green"
          style={{ width: `${statsSupplies.circulatingPercent}%` }}
        />
      </div>
      {/* Supply label list */}
      <div className="supply_label_list">
        {/* Burnt tokens section */}
        <div>
          <p className="supply_label">
            <span className="hyphen orange" />
            <span className="text">Burnt App Tokens</span>
            <span className="percent orange">
              {(100 - statsSupplies.circulatingPercent).toFixed(2)}%
            </span>
          </p>
          {/* Burnt tokens value */}
          <p className="supply_value">
            <AppIcon
              size={1.25}
              url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
              fill={IconFilter.unset}
              margin={0}
            />
            {numberWithCommas(
              statsSupplies.totalSupply - statsSupplies.circulatingSupply
            )}
          </p>
          {/* Full supply information */}
          <div className="full_supply">
            Original App Token Initial Supply:
            {numberWithCommas(statsSupplies.totalSupply)}
          </div>
        </div>
        {/* Circulating tokens section */}
        <div>
          <p className="supply_label">
            <span className="hyphen green" />
            <span className="text">Circulating App Tokens</span>
            <span className="percent green">
              {statsSupplies.circulatingPercent.toFixed(2)}%
            </span>
          </p>
          {/* Circulating tokens value */}
          <p className="supply_value">
            <AppIcon
              size={1.25}
              url={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
              fill={IconFilter.unset}
              margin={0}
            />
            {numberWithCommas(statsSupplies.circulatingSupply)}
          </p>
          {/* Other circulating supplies */}
          {allSupplies
            .filter((s: any) => s.chainId !== walletChain?.id)
            .map((s: any) => (
              <p key={s.chainId} className="supply_value mini">
                <AppIcon
                  size={1.25}
                  url={`/images/token/${chainTokenSymbols.get(s.chainId) ?? 'ETH'}.svg`}
                  fill={IconFilter.unset}
                  margin={0}
                />
                {numberWithCommas(s.circulatingSupply)}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BurnStatsContainer;
