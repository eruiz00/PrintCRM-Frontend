import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, CustomRoutes, localStorageStore, Resource, StoreContextProvider, useStore } from "react-admin";
import { Route } from "react-router-dom";
import treeqlDataProvider from "./providers/treeqlDataProvider";
import { httpClient } from "./providers/httpClient";
import { MyLayout } from "./layouts/MyLayout";
import { authProvider } from "./providers/AuthProvider";
import { presupuestoPage } from "./entitites/PresupuestoPage";
import { sistemaPage as SistemaPage } from "./entitites/SistemaPage";
import { tipoTrabajoPage as TipoTrabajoPage } from "./entitites/TipoTrabajos";
import { MyProfile } from "./layouts/MyProfile";
import { ThemeName, themes } from "./themes/themes";
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import { CustomLoginPage } from './views/LoginPage';
import { ConfigLayout, ConfigIndex } from "./views/ConfigLayout";
import esApp from "./i18n/es";
import enApp from "./i18n/en";


const i18nProvider = polyglotI18nProvider(
    locale => {
        return (locale === 'es')
            ? { ...spanishMessages, ...esApp }
            : { ...englishMessages, ...enApp };
    },
    'es',
    [
        { locale: 'es', name: 'Español' },
        { locale: 'en', name: 'English' }
    ]
);

const store = localStorageStore(undefined, 'PrintCRM');

const App = () => {
const [themeName] = useStore<ThemeName>('themeName', 'solprint');
const singleTheme = themes.find(theme => theme.name === themeName)?.single;
const lightTheme = themes.find(theme => theme.name === themeName)?.light;
const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

return (
    <Admin
        title="PrintCRM"
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
    <Resource name="profile" list={MyProfile} />

    {/* Recursos "headless" usados solo como referencias
        desde ReferenceField / ReferenceInput.
        Sistema y tipotrabajo se registran aquí para que funcionen
        ReferenceField/Input; sus páginas viven en /configuracion/* */}
    <Resource name="sistema" recordRepresentation="empresa" />
    <Resource name="tipotrabajo" recordRepresentation="tipotrabajo" />
    <Resource name="tipotrabajoimagen" />
    <Resource name="tipotrabajopartetrabajo" />
    <Resource name="cliente" recordRepresentation="empresa" />
    <Resource name="comercial" recordRepresentation="nombre" />
    <Resource name="contactocliente" recordRepresentation="nombre" />
    <Resource name="empleado" recordRepresentation="nombre" />
    <Resource name="papel" recordRepresentation="papel" />
    <Resource name="grupopapel" recordRepresentation="nombregrupo" />
    <Resource name="gruposelecciontinta" recordRepresentation="grupo" />

    {/* Rutas personalizadas: /configuracion con sub-navegación */}
    <CustomRoutes>
        <Route path="/configuracion" element={<ConfigLayout />}>
            <Route index element={<ConfigIndex />} />
            <Route path="sistema" element={<SistemaPage />} />
            <Route path="tipotrabajo" element={<TipoTrabajoPage />} />
        </Route>
    </CustomRoutes>
    </Admin>
    );
}

const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);

export default AppWrapper;
