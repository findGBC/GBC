import { Constants } from '../global/constant'

import useFetch from './useFetch'
const useTreasury = () => {
  console.log(`${Constants.URL.GBC_API}/pulsar/treasury`);
  const { data, loading} = useFetch(`${Constants.URL.GBC_API}/pulsar/treasury`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'fr-FR,fr;q=0.7',
        'ape-secret':
          'U2FsdGVkX18iu3uKN6Gf6tsI2F2uCG8wq8J74z6qWdkOh0KbMwlpcqlB30ja+Z/Sbf9D3fA9ckfXCy7MjSp1YlxmhAr9oAP3Pl5hKHU9iZIDOcxYYVldvhjNDgg2CGIJLRGDxYmYXd614kHEhhl7fw==',
        'cache-control': 'no-cache',
        passcode: 'A63uGa8775Ne89wwqADwKYGeyceXAxmHL',
      },
      method: 'GET',
    });

  console.log(data);
  return {
    loading,
    treasury: data
  };
}
export default useTreasury;