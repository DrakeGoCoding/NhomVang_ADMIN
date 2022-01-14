import { ASYNC_START, DASHBOARD_LOADED, DASHBOARD_UNLOADED } from "../actions";

const initialState = {
    monthlyProfit: [],
    topClientList: [],
    totalInvoiced: 0,
    totalReceived: 0,
    totalClients: 0
};

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case DASHBOARD_LOADED:
                    return { ...state, inProgress: true };
                default:
                    return state;
            }
        case DASHBOARD_LOADED:
            return {
                ...state,
                ...action.payload?.[0],
                ...action.payload?.[1],
                ...action.payload?.[2],
                totalClients: action.payload?.[3]?.count || state.totalClients,
                inProgress: false
            };

        case DASHBOARD_UNLOADED:
            return initialState;

        default:
            return state;
    }
}
