import {
    TextField,
    ReferenceField,
    TextInput,
    ReferenceInput,
    AutocompleteInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";

/////////////////////////////////////////////////////////////
// COLUMNS (lista)
// El `id` es autoincrement y no aporta valor al usuario,
// así que no se muestra en la grid ni se edita en el form.
const zonaTransporteColumns = [
    <TextField source="nombre" label="zonatransporte.fields.nombre" />,
    <ReferenceField
        source="pordefectoid"
        reference="serviciotransporte"
        label="zonatransporte.fields.pordefectoid"
        link={false}
    >
        <TextField source="nombre" />
    </ReferenceField>,
    <ReferenceField
        source="ignorarid"
        reference="serviciotransporte"
        label="zonatransporte.fields.ignorarid"
        link={false}
    >
        <TextField source="nombre" />
    </ReferenceField>,
];

/////////////////////////////////////////////////////////////
// FILTERS
const zonaTransporteFilters = [
    <TextInput label="zonatransporte.fields.busqueda" source="q" alwaysOn resettable />,
    <TextInput label="zonatransporte.fields.nombre" source="nombre" alwaysOn resettable />,
];

/////////////////////////////////////////////////////////////
// TRANSFORM
// Actualiza `fechamodificacion` en cada guardado; asigna
// `fechaalta` en creación.
const transform = (
    values: any,
    { isEdit }: { isEdit?: boolean } = {}
) => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    return {
        ...values,
        fechamodificacion: now,
        ...(isEdit ? {} : { fechaalta: values.fechaalta ?? now }),
    };
};

/////////////////////////////////////////////////////////////
// PAGE
export const zonaTransportePage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="zonatransporte"
            title={translate("zonatransporte.page_title")}
            columns={zonaTransporteColumns}
            filters={zonaTransporteFilters}
            transform={transform}
            formTabs={[
                {
                    label: translate("zonatransporte.tabs.general"),
                    fields: [
                        <TextInput
                            source="nombre"
                            label="zonatransporte.fields.nombre"
                            fullWidth
                            data-colspan="12"
                        />,
                        <ReferenceInput source="pordefectoid" reference="serviciotransporte">
                            <AutocompleteInput
                                label="zonatransporte.fields.pordefectoid"
                                optionText="nombre"
                                filterToQuery={(q: string) => ({ nombre: q })}
                                fullWidth
                                data-colspan="6"
                            />
                        </ReferenceInput>,
                        <ReferenceInput source="ignorarid" reference="serviciotransporte">
                            <AutocompleteInput
                                label="zonatransporte.fields.ignorarid"
                                optionText="nombre"
                                filterToQuery={(q: string) => ({ nombre: q })}
                                fullWidth
                                data-colspan="6"
                            />
                        </ReferenceInput>,
                    ],
                },
            ]}
        />
    );
};

export default zonaTransportePage;
