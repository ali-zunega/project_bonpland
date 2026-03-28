import { useLocation } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  const location = useLocation();
  const property = location.state?.property;

  return (
    <div className="container mt-4">
      <ContactForm property={property} />
    </div>
  );
};

export default Contact;
