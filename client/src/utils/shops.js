export const filterShops = (shops = [], query = null) => {
    if (!query) return [];
    query = query.toLowerCase();
    return shops.filter(({ fields: { naam, postcode }}) => naam.toLowerCase().includes(query) || postcode == query)
}