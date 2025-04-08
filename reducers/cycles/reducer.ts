import { ActionTypes } from "./actions";
import { produce, Producer } from "immer";
export interface Cycles {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CyclesState {
  cycles: Cycles[];
  isActiveCycle: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.isActiveCycle = action.payload.newCycle.id;
      });
    // return {
    //   ...state,
    //   cycles: [...state.cycles, action.payload.newCycle],
    //   isActiveCycle: action.payload.newCycle.id,
    // };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.isActiveCycle;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.isActiveCycle = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.isActiveCycle) {
      //       return { ...cycle, interruptedDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   isActiveCycle: null,
      // };
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.isActiveCycle;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.isActiveCycle = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
      //     return {
      //       ...state,
      //       cycles: state.cycles.map((cycle) => {
      //         if (cycle.id === state.isActiveCycle) {
      //           return { ...cycle, finishedDate: new Date() };
      //         } else {
      //           return cycle;
      //         }
      //       }),
      //       isActiveCycle: null,
      //     };
    }
    default:
      return state;
  }
}
