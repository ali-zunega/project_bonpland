
import AppRouter from './app/router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {


    return (
        <>
            <ScrollToTop />
            <Navbar />
            <AppRouter />
            <Footer />
        </>
    )
}

export default App
