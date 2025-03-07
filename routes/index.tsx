import Form from "../islands/Form.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">Programador de citas médicas</h1>

        <Form />
      </div>
    </div>
  );
}
