import {drizzleReactHooks} from '@drizzle/react-plugin';

const { useDrizzleState } = drizzleReactHooks;

const Loading = ({children}) => {

    const initialized = useDrizzleState(state => state.drizzleStatus.initialized);

    // Comprobar que el navegador soporta Ethereum
    if (typeof window.ethereum === "undefined") {
        return (<main><h1>⚠️ Instale MetaMask.</h1></main>);
    }

    if (!initialized) {
        return (<main><h1>⚙️ Cargando dapp...</h1></main>);
    }

    // Comprobar que MetaMask está conectado a la red que quiero:
    //Polygon Decimal ChainId: 80001
    //      Hexadecimal 0x13881

    //Sepolia  DEcimal 11155111
    //            Hexa 0xaa36a7

    //Arbitrum DEcimal 421613
    //          Hex: 0x66eed
    if (window.ethereum.chainId && window.ethereum.chainId !== "0xaa36a7") {
        return (<main><h1>⚠️ Use Ganache {window.ethereum.chainId}</h1></main>);
    }

    return <>
        {children}
    </>
};

export default Loading;
