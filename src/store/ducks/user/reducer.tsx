import { Reducer } from 'redux'
import { IUserState, UserActionTypes } from './types'
import User, { UserTypes } from '../../application/models/user/user'

const INITIAL_STATE: IUserState = {
    profile: {
        user: new User(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false,
    },
    createUser: {
        user: new User(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false
    },
    removeUser: {
        userIdForRemove: '',
        visibilityModal: false,
        loading: false,
        error: false,
        success: false
    },
    listAdmins: {
        users: [],
        paginator: {
            first: 0,
            rows: 10,
            page: 0,
            pageCount: 0,
            totalRecords: 0,
            search: {
                key: '',
                value: ''
            }
        },
        loading: false,
        error: false,
        success: false
    },
    listClient: {
        users: [],
        paginator: {
            first: 0,
            rows: 10,
            page: 0,
            pageCount: 0,
            totalRecords: 0,
            search: {
                key: '',
                value: ''
            }
        },
        loading: false,
        error: false,
        success: false
    },
    listPersonalTrainer: {
        users: [],
        paginator: {
            first: 0,
            rows: 10,
            page: 0,
            pageCount: 0,
            totalRecords: 0,
            search: {
                key: '',
                value: ''
            }
        },
        loading: false,
        error: false,
        success: false
    }
}

const reducer: Reducer<IUserState> = (state: IUserState = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case UserActionTypes.RESET_CREATE_USER:
            return { ...state, createUser: INITIAL_STATE.createUser }

        case UserActionTypes.CHANGE_USER:
            const { user } = action.payload
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: false,
                    error: false,
                    success: false,
                    user: new User().fromJSON(user)
                },
                profile: {
                    ...state.profile,
                    loading: false,
                    error: false,
                    success: false,
                    user: new User().fromJSON(user)
                }
            }

        case UserActionTypes.REMOVE_REQUEST:
            return { ...state, removeUser: { ...state.removeUser, loading: true, visibilityModal: false } }

        case UserActionTypes.REMOVE_SUCCESS:
            return {
                ...state,
                removeUser: {
                    ...state.removeUser,
                    loading: false,
                    visibilityModal: false,
                    sucess: true,
                    userIdForRemove: ''
                }
            }

        case UserActionTypes.REMOVE_FAILURE:
            return {
                ...state,
                removeUser: { ...state.removeUser, loading: false, error: true, success: false, visibilityModal: true }
            }

        case UserActionTypes.CHANGE_REMOVE_MODAL:
            const { visibilityModal, userIdForRemove } = action.payload
            return {
                ...state,
                removeUser: { ...state.removeUser, visibilityModal, userIdForRemove }
            }

        case UserActionTypes.FIND_REQUEST:
            return {
                ...state,
                createUser: { ...state.createUser, loading: true },
                profile: { ...state.profile, loading: true }
            }

        case UserActionTypes.FIND_SUCCESS:
            const findUser = action.payload.user
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    user: new User().fromJSON(findUser),
                    loading: false,
                },
                profile: {
                    ...state.profile,
                    user: new User().fromJSON(findUser),
                    loading: false,
                }
            }

        case UserActionTypes.FIND_FAILURE:
            const findError = action.payload.error
            return {
                ...state,
                createUser: { ...state.createUser, loading: false, error: true, success: false, data: findError },
                profile: {
                    ...state.profile,
                    user: new User(),
                    loading: false,
                }
            }

        case UserActionTypes.UPDATE_REQUEST:
            return {
                ...state,
                createUser: { ...state.createUser, loading: true }
            }

        case UserActionTypes.UPDATE_SUCCESS:

            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: false
                }
            }

        case UserActionTypes.UPDATE_FAILURE:
            const updateError = action.payload.error
            return {
                ...state,
                createUser: { ...state.createUser, loading: false, error: true, success: false, data: updateError }
            }

        case UserActionTypes.CREATE_REQUEST:
            return { ...state, createUser: { ...state.createUser, loading: true } }

        case UserActionTypes.CREATE_SUCCESS:
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    user: new User(),
                    success: true,
                    loading: false,
                }
            }

        case UserActionTypes.CREATE_FAILURE:
            const createError = action.payload.error
            return {
                ...state,
                createUser: { ...state.createUser, loading: false, error: true, success: false, data: createError }
            }

        case UserActionTypes.CHANGE_PAGINATOR:
            const { paginator } = action.payload
            switch (action.payload.userType) {
                case UserTypes.ADMIN:
                    const adminPaginator = {
                        ...paginator,
                        totalRecords: state.listAdmins.paginator.totalRecords
                    }
                    return { ...state, listAdmins: { ...state.listAdmins, loading: true, paginator: adminPaginator } }

                case UserTypes.CLIENT:
                    const operatorPaginator = {
                        ...paginator,
                        totalRecords: state.listClient.paginator.totalRecords
                    }
                    return {
                        ...state,
                        listOperators: { ...state.listClient, loading: true, paginator: operatorPaginator }
                    }

                default:
                    return state
            }

        case UserActionTypes.LOAD_USERS_REQUEST:
            const { userType } = action.payload
            switch (userType) {
                case UserTypes.ADMIN:
                    return { ...state, listAdmins: { ...state.listAdmins, loading: true } }
                case UserTypes.CLIENT:
                    return { ...state, listClient: { ...state.listClient, loading: true } }
                case UserTypes.PERSONAL_TRAINER:
                    return { ...state, listPersonalTrainer: { ...state.listPersonalTrainer, loading: true } }
                default:
                    return state
            }

        case UserActionTypes.LOAD_USERS_SUCCESS:
            const { users, headers } = action.payload
            switch (action.payload.userType) {
                case UserTypes.ADMIN:
                    return {
                        ...state,
                        listAdmins: {
                            ...state.listAdmins,
                            loading: false,
                            success: true,
                            error: false,
                            users,
                            paginator: {
                                ...state.listAdmins.paginator, totalRecords: parseInt(headers['x-total-count'], 10)
                            }
                        }
                    }

                case UserTypes.CLIENT:
                    return {
                        ...state,
                        listClient: {
                            ...state.listClient,
                            loading: false,
                            success: true,
                            error: false,
                            users,
                            paginator: {
                                ...state.listClient.paginator, totalRecords: parseInt(headers['x-total-count'], 10)
                            }
                        }
                    }
                case UserTypes.PERSONAL_TRAINER:
                    return {
                        ...state,
                        listPersonalTrainer: {
                            ...state.listPersonalTrainer,
                            loading: false,
                            success: true,
                            error: false,
                            users,
                            paginator: {
                                ...state.listPersonalTrainer.paginator, totalRecords: parseInt(headers['x-total-count'], 10)
                            }
                        }
                    }

                default:
                    return state
            }

        case UserActionTypes.LOAD_USERS_FAILURE:
            switch (action.payload.userType) {
                case UserTypes.ADMIN:
                    return { ...state, listAdmins: { ...state.listAdmins, loading: false } }
                case UserTypes.CLIENT:
                    return { ...state, listClient: { ...state.listClient, loading: false } }
                case UserTypes.PERSONAL_TRAINER:
                    return { ...state, listPersonalTrainer: { ...state.listPersonalTrainer, loading: false } }
                default:
                    return state
            }

        default:
            return state;
    }
}

export default reducer