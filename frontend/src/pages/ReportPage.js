import "../styles/components/ReportPage.css"; // Añade tus estilos
import Invoices from "../components/Invoices";
import ProductManager from '../components/ProductManager';

function ReportPage() {
  return(
    <>
      <Invoices/>
      <ProductManager/>
    </>
    
  );
}
export default ReportPage;
