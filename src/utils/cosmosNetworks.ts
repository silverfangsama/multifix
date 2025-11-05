interface NetworkConfig {
    chainName: string;
    chainId: string;
    prefix: string;      // Add chainId as a property
    coinType: string;
    rpcUrl: string;
    denom: string;
    gasPrice: string;
    granteeAddress: string;
  }
  
  const networkConfigs: NetworkConfig[] = [
    {
      chainName: 'Cosmos Hub',
      chainId: 'cosmoshub-4',
      prefix: 'cosmos',
      coinType: '118',
      rpcUrl: 'https://cosmos-rpc.publicnode.com',
      denom: 'uatom',
      gasPrice: '0.05',
      granteeAddress: 'cosmos10rpj30m9kkc6a778fm7adpkyvx09vsj5cgasrp',

    },
    {
      chainName: 'Injective',
      chainId: 'injective-1',
      prefix: 'inj',
      coinType: '60',
      rpcUrl: 'https://tm.injective.network',
      denom: 'uinj',
      gasPrice: '0.05',
      granteeAddress: 'inj1p7ef3qku3zl85c0shte5j9razlpnxdcjtskyu2',
    },
    {
      chainName: 'Celestia',
      chainId: 'celestia',
      prefix: 'celestia',
      coinType: '118',
      rpcUrl: 'https://celestia-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'utia',
      gasPrice: '0.05',
      granteeAddress: 'celestia1cwrdk82ykxew90lqt40j4hyyjgj6p09c6sd27u',
    },
    {
      chainName: 'Osmosis',
      chainId: 'osmosis-1',
      prefix: 'osmo',
      coinType: '118',
      rpcUrl: 'https://osmosis-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'uosmo',
      gasPrice: '0.05',
      granteeAddress: 'osmo10rpj30m9kkc6a778fm7adpkyvx09vsj5snwq4n',
    },
    {
      chainName: 'Stargaze',
      chainId: 'stargaze-1',
      prefix: 'stars',
      coinType: '118',
      rpcUrl: 'https://stargaze-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'ustars',
      gasPrice: '10',
      granteeAddress: 'stars1cwrdk82ykxew90lqt40j4hyyjgj6p09clxt80q',
    },
    {
      chainName: 'Nibiru',
      chainId: 'cataclysm-1',
      prefix: 'nibi',
      coinType: '118',
      rpcUrl: 'https://rpc.nibiru.fi',
      denom: 'unibi',
      gasPrice: '0.05',
      granteeAddress: 'nibi1cwrdk82ykxew90lqt40j4hyyjgj6p09culcrdz',
    },
    {
      chainName: 'DYDX',
      chainId: 'dydx-mainnet-1',
      prefix: 'dydx',
      coinType: '118',
      rpcUrl: 'https://dydx-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'adydx',
      gasPrice: '13000000000',
      granteeAddress: 'dydx1cwrdk82ykxew90lqt40j4hyyjgj6p09czrj7yx'
    },
    {
      chainName: 'Agoric',
      chainId: 'agoric-3',
      prefix: 'agoric',
      coinType: '564',
      rpcUrl: 'https://leap-node-proxy.numia.xyz/agoric-rpc',
      denom: 'ubld',
      gasPrice: '0.05ubld',
      granteeAddress: 'agoric1r0wfqk9j578trypt9ykcgncq2t33d0jqfvwpmv'
    },
    {
      chainName: 'Juno',
      chainId: 'juno-1',
      prefix: 'juno',
      coinType: '118',
      rpcUrl: 'https://juno-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'ujuno',
      gasPrice: '0.5ujuno',
      granteeAddress: 'juno1cwrdk82ykxew90lqt40j4hyyjgj6p09caglprd'
    },
    {
      chainName: 'Akash',
      chainId: 'akashnet-2',
      prefix: 'akash',
      coinType: '118',
      rpcUrl: 'https://akash-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'uakt',
      gasPrice: '0.05uakt',
      granteeAddress: 'akash1cwrdk82ykxew90lqt40j4hyyjgj6p09cxp3aat'
    },
    {
      chainName: 'Kava',
      chainId: 'kava_2222-10',
      prefix: 'kava',
      coinType: '459',
      rpcUrl: 'https://kava-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'ukava',
      gasPrice: '0.127ukava',
      granteeAddress: 'kava1p60rr6m47dl96dugf78pjm4js4qvmjz48n0hs4'
    },
    {
      chainName: 'Kujira',
      chainId: 'kaiyo-1',
      prefix: 'kujira',
      coinType: '118',
      rpcUrl: 'https://kujira-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'ukuji',
      gasPrice: '0.5ukuji',
      granteeAddress: 'kujira1cwrdk82ykxew90lqt40j4hyyjgj6p09c6j7zfm'
    },
    {
      chainName: 'Terra 2.0',
      chainId: 'phoenix-1',
      prefix: 'terra',
      coinType: '330',
      rpcUrl: 'https://terra-rpc.publicnode.com:443/9a353f27b9e92ea909491d7ae2102facbd105fb06ff969932dd19cb31d93d0a6',
      denom: 'uluna',
      gasPrice: '0.34uluna',
      granteeAddress: 'terra16wnfjvlfeywlet52qfpykc4pt3v46zdepktpcj'
    },
    // Add more networks here
  ];
  
  export default networkConfigs;