import Header from './Header';
import Footer from './Footer';


function DefaultLayout({flagFoot=true,children}) {
    return ( 
        <div>
            <Header/>
            <div>{children}</div>
            {flagFoot?<Footer />:null}
        </div>
     );
}

export default DefaultLayout;