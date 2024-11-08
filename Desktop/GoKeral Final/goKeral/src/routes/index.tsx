import { createBrowserRouter } from 'react-router-dom'
import { NotFound } from '../components/notFound';
import { routePaths } from '../config';
import HomePage from '../pages/homePage';


export const router = createBrowserRouter([
    {
        path: routePaths.home,
        element: <HomePage/>,
    
    },
    {
        path: '*',
        element: <NotFound />,
    },
   
]);
if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
