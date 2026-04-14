import AppRouter from "./app/router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollTopButton from "./components/ScrollTopButton/ScrollTopButton";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <ScrollTopButton />
      <Navbar />

      <main className="flex-grow-1">
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}

export default App;
