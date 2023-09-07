import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, ind) => {
                        const Clayout = route.layout || DefaultLayout;
                        const Page = route.element;
                        return (
                            <Route
                                key={ind}
                                path={route.path}
                                element={
                                    <Clayout page={route.page || ''}>
                                        <Page />
                                    </Clayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
