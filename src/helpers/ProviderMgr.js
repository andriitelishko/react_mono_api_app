import MonoProvider from "../providers/MonoProvider";

class ProviderMgr {

    static getProvider (id, params) {
        let provider = null;

        switch (id) {
            case 'mono' :
                const { token, name } = params;
                provider = new MonoProvider(token, name);
                break;
            default :
                throw Error('Unknown provider requested')
        }

        return provider;
    } 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ProviderMgr;