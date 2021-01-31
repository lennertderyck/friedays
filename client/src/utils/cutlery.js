/**
 * returns a node, even if the paramter is set by a string
 * checks if the given attribute is a node, if not it will select and return the node by its selector
 * @param {(string|node)} el 
 * @param {boolean} multiple set to true if you want to return multiple nodes as an array
 */
export const returnNode = (el, multiple = false) => {
    if (typeof el == 'object') return el;
    if (typeof el == 'string') {
        const nodes = document.querySelectorAll(el);
        
        if (multiple == false) return nodes[0]
        else return nodes;
    }
}

/**
 * returns the tagname of an element
 * @param {(string|nodes)} el 
 */
export const returnTag = (el) => {
    return returnNode(el).tagName.toLowerCase();
}

/**
 * extract formdata, returns a Map object
 * @param {string} formNode css selector of the form
 */
export const getFormData = (formNode) => {
    // https://stackoverflow.com/a/14438954/9357283
    
    const names = new Set();
    const formData = new FormData(formNode);
    const returnData = new Map();
    const nameElements = formNode.querySelectorAll('input[name], select[name], textarea[name], datalist[name], output[name]');
    
    nameElements.forEach(node => {
        const tag = returnTag(node);
        const inputType = node.getAttribute('type');
        names.add({
            name: node.getAttribute('name'),
            type: inputType ? inputType : tag
        });
    });
    
    names.forEach(i => {
        const value = formData.getAll(i.name);
        if (i.type == 'number') returnData.set(i.name, parseFloat(value[0]))
        else if (i.type == 'checkbox') returnData.set(i.name, value != null ? value == 'on' ? true : value : false)
        else returnData.set(i.name, value[0])
    })
    
    return returnData;
}