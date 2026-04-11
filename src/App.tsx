import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, localStorageStore, Resource, StoreContextProvider, useStore } from "react-admin";
import treeqlDataProvider from "./providers/treeqlDataProvider";
import { httpClient } from "./providers/httpClient";
import { MyLayout } from "./layouts/MyLayout";
import { authProvider } from "./providers/AuthProvider";
import { presupuestoPage } from "./entitites/PresupuestoPage";
import { sistemaPage } from "./entitites/SistemaPage";
import { tipoTrabajoPage } from "./entitites/TipoTrabajos";
import { MyProfile } from "./layouts/MyProfile";
import { ThemeName, themes } from "./themes/themes";
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import { CustomLoginPage } from './views/LoginPage';


const i18nProvider = polyglotI18nProvider(
    locale => {
        return (locale === 'es')?spanishMessages:englishMessages;
    },
    'es',
    [
        { locale: 'es', name: 'Español' },
        { locale: 'en', name: 'English' }
    ]
);

const store = localStorageStore(undefined, 'PrintCRM');

const App = () => {
const [themeName] = useStore<ThemeName>('themeName', 'default');
const singleTheme = themes.find(theme => theme.name === themeName)?.single;
const lightTheme = themes.find(theme => theme.name === themeName)?.light;
const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

return (
    <Admin
        title="PRintCRM"
        store={store}
        loginPage={CustomLoginPage}
        authProvider={authProvider}
        //dataProvider={treeqlDataProvider('http://localhost:8080/api.php',httpClient)} 
		dataProvider={treeqlDataProvider('http://localhost:8080',httpClient)} 
        requireAuth
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={singleTheme}
        lightTheme={lightTheme}
        darkTheme={darkTheme}
        defaultTheme="light"
        layout={MyLayout}
    >
    <Resource name="presupuesto" list={presupuestoPage} />
    <Resource name="sistema" list={sistemaPage} />
    <Resource name="tipotrabajo" list={tipoTrabajoPage} />
    <Resource name="profile" list={MyProfile} />
    </Admin>
    );
}

const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);

export default AppWrapper;

