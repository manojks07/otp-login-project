import { useState } from "react";
import Registration from "./components/Registration";
import Checkout from "./components/Checkout";

function App() {
  const [page, setPage] = useState("registration");

  return (
    <>
      {page === "registration" && (
        <Registration onContinue={() => setPage("checkout")} />
      )}

      {page === "checkout" && <Checkout />}
    </>
  );
}

export default App;
