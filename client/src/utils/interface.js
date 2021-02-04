export const darkMode = () => {
    const currentState = window.localStorage.getItem('bogan');
    currentState && document.body.setAttribute('data-bogan', currentState);
    
    return {
        init: () => {
            console.log(!currentState);
            if (
                !currentState &&
                window.matchMedia && 
                window.matchMedia('(prefers-color-scheme: dark)').matches
            ) window.localStorage.setItem('bogan', true);
        },
        set: (s) => {
            window.localStorage.setItem('bogan', s)
            document.body.setAttribute('data-bogan', s);
        }
    }
}