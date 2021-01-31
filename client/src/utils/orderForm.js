export const filterShops = (shops = [], query = null) => {
    if (!query) return [];
    query = query.toLowerCase();
    return shops.filter(({ fields: { naam, postcode }}) => naam.toLowerCase().includes(query) || postcode == query)
}

export const filterPersons = (persons = [], query = null) => {
    if (!query) return [];
    query = query.toLowerCase();
    return persons.filter(({ firstName, lastName }) => {
        return firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query)
    })
}

export const checkExtraUser = (datasets, userID, userData) => {
    datasets.forEach(set => {
        set = set.filter(({ id }) => id !== userID)
    })
}

export const unCheckExtraUser = (datasets, userID, userData) => {
    datasets.forEach(set => {
        set.push(userData)
    })
}