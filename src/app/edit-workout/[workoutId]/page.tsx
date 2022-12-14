import { appRouter } from "@/server/router";
import getServerSession from "@/utils/getServerSession";
import { notFound } from "next/navigation";
import EditMenu from "./EditMenu";

export default async function EditWorkoutPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params;

  const session = await getServerSession({ required: true });

  const caller = appRouter.createCaller(session);

  const workout = await caller.workouts.get({ workoutId });

  if (!workout) {
    notFound();
  }

  const trainingSets = await caller.trainingSets.list({ workoutId });

  return (
    <>
      <EditMenu workout={workout} trainingSets={trainingSets} />
      {/* <main className="grid grid-rows-[1fr_1fr_auto]">
        <section className={commonStyles.section}>
          <h2 className={commonStyles.sectionTitle}>Exercises:</h2>
          <div className={styles.exercisesContainer}>
            {exercises.map((exercise) => (
              <ExerciseEditor
                exercise={exercise}
                key={exercise.id}
                dispatch={dispatch}
                exerciseKinds={exerciseKinds}
              />
            ))}
            <Button
              primary
              additionalClassName={styles.addGroupButton}
              onClick={() => setIsGroupCreationModalOpen(true)}
            >
              Add exercise
            </Button>
          </div>
        </section>
      </main>
      <Modal
        isOpen={isGroupCreationModalOpen}
        onClose={() => setIsGroupCreationModalOpen(false)}
      >
        <ExerciseCreationModalContent
          exerciseKinds={exerciseKinds}
          onCreate={(exerciseKind) => {
            createExercise(exerciseKind);
            setIsGroupCreationModalOpen(false);
          }}
          onCancel={() => setIsGroupCreationModalOpen(false)}
        />
      </Modal> */}
    </>
  );
}
