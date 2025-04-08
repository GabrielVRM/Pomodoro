import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../contexts";

const formValidationSchema = z.object({
  tasks: z.string().min(1, "Informe sua tasks!"),
  minutesAmount: z
    .number()
    .min(1, "informe no minimo até 60 minutos")
    .max(60, "informe no maximo até 60 minutos"),
});

type ValidationForm = z.infer<typeof formValidationSchema>;
export function Home() {
  const { isActiveCycle, createNewCycle, interruptCycle } =
    useContext(CyclesContext);
  const newCycleTypeForm = useForm<ValidationForm>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      tasks: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleTypeForm;

  const task = watch("tasks");
  const isSubmitDisable = !task;

  function handleCreateNewCycle(data: ValidationForm) {
    createNewCycle(data);
    reset();
  }

  return (
    <>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleTypeForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

          {isActiveCycle ? (
            <StopCountdownButton type="button" onClick={interruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit" disabled={isSubmitDisable}>
              <Play size={24} />
              começar
            </StartCountdownButton>
          )}
        </form>
      </HomeContainer>
    </>
  );
}
