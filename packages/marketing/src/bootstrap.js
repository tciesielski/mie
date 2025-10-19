import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
import { createRoot } from 'react-dom/client';

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    const root = createRoot(el);
    root.render(<App history={history} />);

    return {
        onParentNavigate: ({pathname: nextPathname}) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
                //console.log("Marketing App - Container onParentNavigate", nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_marketing-dev-root');

    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };