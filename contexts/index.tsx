import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

export interface Cycles {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CreateCycleData {
  tasks: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycles[];
  activeCycle: Cycles | undefined;
  isActiveCycle: string | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  makeIsCycleFinished: () => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);
export function CyclesContextProvide({ children }: CyclesContextProviderProps) {
  //   const [cycles, setCycles] = useState<Cycles[]>([]);

  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      isActiveCycle: null,
    },

    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
      return initialState;
    }
  );
  const { cycles, isActiveCycle } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === isActiveCycle);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function makeIsCycleFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycles = {
      id,
      task: data.tasks,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction());
  }
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        isActiveCycle,
        amountSecondsPassed,
        setSecondsPassed,
        makeIsCycleFinished,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
