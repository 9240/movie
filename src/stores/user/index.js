const state = {
    name:""
};

const actions = {

};

const mutations = {
    USER_NAME(state,payload){
        state.name = payload.name
    }
};

export default {
    nameSpaced:true,
    state,
    actions,
    mutations
}