import { variables } from '../../site.config';

export const getNerds = async () => {
    const resp = await fetch(variables.apiBase + '/nerds');
    const data = await resp.json();
    return data;
}

export const showLatestOrders = async userID => {
    const resp = await fetch(variables.apiBase + '/orders/nerds/' + userID);
    const data = await resp.json();
    return await Promise.all(data.map(async ({ shop, ...otherFields }) => ({
        shop: await getShopByID(shop),
        ...otherFields
    })));
}

export const getShops = async () => {
    const resp = await fetch(variables.apiBase + '/shops')
    const data = await resp.json();
    return data;
}

export const getShopByID = async shopID => {
    const resp = await fetch(variables.apiBase + '/shops/' + shopID)
    const { records: [record] } = await resp.json();
    return record;
}