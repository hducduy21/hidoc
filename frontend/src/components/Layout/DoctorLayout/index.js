import Footer from '~/components/Layout/DefaultLayout/Footer';
import Header from './Header';


function DoctorLayout({children}) {
    return ( 
        <div>
            <Header/>
            <div>{children}</div>
            <Footer />
        </div>
        
     );
}

export default DoctorLayout;