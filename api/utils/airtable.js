import Airtable from 'airtable';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const { AIRTABLE_KEY, AIRTABLE_BASE } = process.env;
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_KEY
});

const reformatDate = (date) => dayjs(date, 'DD-MM-YYYY').format('MM DD YYYY');

export const base = Airtable.base(AIRTABLE_BASE);

export const getUsers = async () => (await base('users').select().all()).getFields();
export const getUserByID = async (...ids) => await base('users').find(ids);

export const getOrders = async () => (await base('orders').select().all()).getFields();
export const getOrdersByID = async (...ids) => [await base('orders').find(ids)].getFields();

/**
 * 
 * @param {string} date Orderdate in European format (DD/MM/YYYY)
 */
export const getOrdersByDate = async (date = 'today', dateEnd = null) => {
    const after = date === 'today' ? 'TODAY()' : `'${ reformatDate(date) }'`;
    
    return (
        await base('orders').select({
            filterByFormula: `IS_AFTER({time}, ${ after })`
        }).all()
    ).getFields();
}

export const getOrdersFromUser = async (userID) => (await base('orders').select().all())
    .getFields()
    .filter(({ users }) => users.includes(userID))

    
// HELPERS
Array.prototype.getFields = function () {
    return this.map(({ id, fields }) => {
        const [ idFromArray ] = id;
        return { 
            id: idFromArray !== 'r' ? idFromArray : id,
            ...fields ,
        }
    })
}