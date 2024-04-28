const KV_TOKEN = "AbUMASQgNjgzMmQxNGEtZWFjYS00NWU3LWFiMDYtNzgwYzkxYjVmYjZhNzgwZjliYzIxYjg2NDE0ZmFjZjY0YjdkMjc1NzZhNTg=";
const KV_API = "https://fine-javelin-46348.upstash.io";

//LISTAR TODAS AS TIERLISTS
//['list:1', 'list:2']
export async function listTiers() {  
  try {
    const response = await fetch(`${KV_API}/keys/rank:*`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
    }); 
    const data = await response.json();
    return data.result.map(tier => tier.split(':')[1]);
  } catch (error) {
    console.log('Error attempting list tier list. ERROR: ', error);    
  }
}

//PEGAR UMA TIERLIST BASEADO NA CHAVE
export async function getTierList(tierKey) {  
  try {
    const response = await fetch(`${KV_API}/get/rank:${tierKey}`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
    });
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.log('Error attempting get tier list. ERROR: ', error);    
  }
}

//VERIFICA SE EXISTE UMA TIER LIST BASEADO NA CHAVE
export async function existsTierListByKey(tierKey) {  
  try {
    const response = await fetch(`${KV_API}/exists/rank:${tierKey}`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
    });
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.log('Error attempting check tier list. ERROR: ', error);    
  }
}

//CRIAR UMA NOVA TIER LIST 
export async function createTierList(tierKey, tierList) {  
  try {
    if (existsTierListByKey(tierKey)) {
      throw new Error(`Already exits a tier list with the key: ${tierKey}`)
    }
    const response = await fetch(`${KV_API}/set/rank:${tierKey}`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
      body: JSON.stringify(tierList),
      method: 'POST',
    });
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.log('Error attempting create a tier list. ERROR: ', error);    
  }
}

//ATUALIZAR UMA TIER LIST 
export async function updateTierList(tierKey, tierList) {  
  try {
    const response = await fetch(`${KV_API}/set/rank:${tierKey}`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
      body: JSON.stringify(tierList),
      method: 'POST',
    });
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.log('Error attempting update a tier list. ERROR: ', error);    
  }
}