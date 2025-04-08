import { useContext, useEffect } from "react";
import { CountdownContainer } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../../contexts";

export function CountDown() {
  const {
    activeCycle,
    isActiveCycle,
    amountSecondsPassed,
    setSecondsPassed,
    makeIsCycleFinished,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");
  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (differenceSeconds > totalSeconds) {
          makeIsCycleFinished();
          // setAmountSecondsPassed(totalSeconds)
          clearInterval(interval);
        } else {
          setSecondsPassed(differenceSeconds);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, isActiveCycle, totalSeconds]);
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);
  return (
    <>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <span>:</span>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
    </>
  );
}
