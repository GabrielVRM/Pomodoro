import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";

import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../../contexts";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();
  return (
    <>
      <FormContainer>
        <label htmlFor="task">Vou Trabalhar Amanhã</label>
        <TaskInput
          id="task"
          placeholder="De um nome para seu projeto"
          list="tasks-suggestions"
          disabled={!!activeCycle} // pesquisar a respeito
          {...register("tasks")}
        />
        {/* Não customizado esntão vou partir para outras soluçoes */}
        {/* <datalist style={{ color: "red" }} id="tasks-suggestions" /> */}
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          disabled={!!activeCycle}
          max={60}
          min={1}
          step={5}
          {...register("minutesAmount", { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </FormContainer>
    </>
  );
}
