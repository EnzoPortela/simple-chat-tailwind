import Chat from "./Chat";
import AuthProvider from "./context";

function App() {
  return (
    <AuthProvider>
      <Chat />
    </AuthProvider>
  );
}

export default App;
