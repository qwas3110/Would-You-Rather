

const logger = (store) => (next) => (action) => {
    console.group(action.type);
        console.log('Action: ', action.type);
        const result = next(action);
        console.log('New State: ', store.getState());
    console.groupEnd()
    return result;
};



export default logger;