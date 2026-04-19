// Diccionario COMPLETO del namespace `ra:` en español para react-admin 5.x.
// El paquete oficial `ra-language-spanish` v1.0.0 es muy antiguo y le faltan
// muchas claves (clear_input_value, page.empty, page.invite, …). Este fichero
// sirve de fallback/override para cubrir todas las claves que usa RA 5.x.
//
// Se fusiona con `ra-language-spanish` en App.tsx mediante un merge profundo
// del namespace `ra`, de modo que las claves existentes en el paquete oficial
// no se pisan si ya están traducidas; las que faltan las añade este fichero.

const raEs = {
    ra: {
        action: {
            add_filter: "Añadir filtro",
            add: "Añadir",
            back: "Volver",
            bulk_actions:
                "1 elemento seleccionado |||| %{smart_count} elementos seleccionados",
            cancel: "Cancelar",
            clear_array_input: "Vaciar la lista",
            clear_input_value: "Limpiar valor",
            clone: "Duplicar",
            confirm: "Confirmar",
            create: "Crear",
            create_item: "Crear %{item}",
            delete: "Borrar",
            edit: "Editar",
            export: "Exportar",
            list: "Listado",
            refresh: "Actualizar",
            remove_filter: "Quitar filtro",
            remove_all_filters: "Quitar todos los filtros",
            remove: "Quitar",
            reset: "Restablecer",
            save: "Guardar",
            search: "Buscar",
            search_columns: "Buscar columnas",
            select_all: "Seleccionar todo",
            select_all_button: "Seleccionar todo",
            select_row: "Seleccionar esta fila",
            show: "Mostrar",
            sort: "Ordenar",
            undo: "Deshacer",
            unselect: "Deseleccionar",
            expand: "Expandir",
            close: "Cerrar",
            open_menu: "Abrir menú",
            close_menu: "Cerrar menú",
            update: "Actualizar",
            move_up: "Subir",
            move_down: "Bajar",
            open: "Abrir",
            toggle_theme: "Alternar modo claro/oscuro",
            select_columns: "Columnas",
            update_application: "Recargar aplicación",
        },
        boolean: {
            true: "Sí",
            false: "No",
            null: " ",
        },
        page: {
            create: "Crear %{name}",
            dashboard: "Inicio",
            edit: "%{name} %{recordRepresentation}",
            error: "Algo ha ido mal",
            list: "%{name}",
            loading: "Cargando",
            not_found: "No encontrado",
            show: "%{name} %{recordRepresentation}",
            empty: "Aún no hay %{name}.",
            invite: "¿Quieres añadir uno?",
            access_denied: "Acceso denegado",
            authentication_error: "Error de autenticación",
        },
        input: {
            file: {
                upload_several:
                    "Arrastra varios ficheros para subirlos, o haz clic para seleccionar uno.",
                upload_single:
                    "Arrastra un fichero para subirlo, o haz clic para seleccionarlo.",
            },
            image: {
                upload_several:
                    "Arrastra varias imágenes para subirlas, o haz clic para seleccionar una.",
                upload_single:
                    "Arrastra una imagen para subirla, o haz clic para seleccionarla.",
            },
            references: {
                all_missing: "No se han encontrado las referencias asociadas.",
                many_missing:
                    "Al menos una de las referencias asociadas ya no está disponible.",
                single_missing:
                    "La referencia asociada ya no está disponible.",
            },
            password: {
                toggle_visible: "Ocultar contraseña",
                toggle_hidden: "Mostrar contraseña",
            },
        },
        message: {
            about: "Acerca de",
            access_denied:
                "No tienes permisos suficientes para acceder a esta página",
            are_you_sure: "¿Estás seguro?",
            authentication_error:
                "El servidor de autenticación ha devuelto un error y tus credenciales no se han podido verificar.",
            auth_error: "Se ha producido un error al validar el token de autenticación.",
            bulk_delete_content:
                "¿Seguro que quieres borrar este %{name}? |||| ¿Seguro que quieres borrar estos %{smart_count} elementos?",
            bulk_delete_title:
                "Borrar %{name} |||| Borrar %{smart_count} %{name}",
            bulk_update_content:
                "¿Seguro que quieres actualizar %{name} %{recordRepresentation}? |||| ¿Seguro que quieres actualizar estos %{smart_count} elementos?",
            bulk_update_title:
                "Actualizar %{name} %{recordRepresentation} |||| Actualizar %{smart_count} %{name}",
            clear_array_input: "¿Seguro que quieres vaciar toda la lista?",
            delete_content: "¿Seguro que quieres borrar este %{name}?",
            delete_title: "Borrar %{name} %{recordRepresentation}",
            details: "Detalles",
            error:
                "Se ha producido un error de cliente y la petición no se ha podido completar.",
            invalid_form:
                "El formulario contiene errores. Revísalo antes de continuar.",
            loading: "Por favor, espera",
            no: "No",
            not_found:
                "La URL es incorrecta o el enlace seguido no es válido.",
            select_all_limit_reached:
                "Hay demasiados elementos para seleccionarlos todos. Sólo se han seleccionado los %{max} primeros.",
            unsaved_changes:
                "Algunos cambios no se han guardado. ¿Quieres descartarlos?",
            yes: "Sí",
            placeholder_data_warning:
                "Problema de red: no se han podido refrescar los datos.",
        },
        navigation: {
            clear_filters: "Limpiar filtros",
            no_filtered_results:
                "No se han encontrado %{name} con los filtros actuales.",
            no_results: "No se han encontrado %{name}",
            no_more_results:
                "La página %{page} está fuera de rango. Vuelve a la página anterior.",
            page_out_of_boundaries: "Página %{page} fuera de rango",
            page_out_from_end: "No se puede avanzar más allá de la última página",
            page_out_from_begin: "No se puede retroceder antes de la página 1",
            page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
            partial_page_range_info:
                "%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}",
            current_page: "Página %{page}",
            page: "Ir a la página %{page}",
            first: "Ir a la primera página",
            last: "Ir a la última página",
            next: "Ir a la página siguiente",
            previous: "Ir a la página anterior",
            page_rows_per_page: "Filas por página:",
            skip_nav: "Ir al contenido",
        },
        sort: {
            sort_by: "Ordenar por %{field_lower_first} %{order}",
            ASC: "ascendente",
            DESC: "descendente",
        },
        auth: {
            auth_check_error: "Por favor, inicia sesión para continuar",
            user_menu: "Perfil",
            username: "Usuario",
            password: "Contraseña",
            email: "Correo electrónico",
            sign_in: "Iniciar sesión",
            sign_in_error: "Autenticación fallida, inténtalo de nuevo",
            logout: "Cerrar sesión",
        },
        notification: {
            updated:
                "Elemento actualizado |||| %{smart_count} elementos actualizados",
            created: "Elemento creado",
            deleted: "Elemento borrado |||| %{smart_count} elementos borrados",
            bad_item: "Elemento incorrecto",
            item_doesnt_exist: "El elemento no existe",
            http_error: "Error de comunicación con el servidor",
            data_provider_error:
                "Error del dataProvider. Consulta la consola para más detalles.",
            i18n_error:
                "No se han podido cargar las traducciones del idioma seleccionado",
            canceled: "Acción cancelada",
            logged_out: "Tu sesión ha caducado, vuelve a iniciar sesión.",
            not_authorized: "No tienes permisos para acceder a este recurso.",
            application_update_available: "Hay una nueva versión disponible.",
            offline: "Sin conexión. No se han podido obtener los datos.",
        },
        validation: {
            required: "Requerido",
            minLength: "Debe tener al menos %{min} caracteres",
            maxLength: "No puede tener más de %{max} caracteres",
            minValue: "Debe ser como mínimo %{min}",
            maxValue: "No puede ser mayor que %{max}",
            number: "Debe ser un número",
            email: "Debe ser un correo válido",
            oneOf: "Debe ser uno de: %{options}",
            regex: "Debe seguir un formato específico (regex): %{pattern}",
            unique: "Debe ser único",
        },
        saved_queries: {
            label: "Consultas guardadas",
            query_name: "Nombre de la consulta",
            new_label: "Guardar la consulta actual...",
            new_dialog_title: "Guardar consulta actual como",
            remove_label: "Eliminar consulta guardada",
            remove_label_with_name: 'Eliminar consulta "%{name}"',
            remove_dialog_title: "¿Eliminar la consulta guardada?",
            remove_message:
                "¿Seguro que quieres eliminar este elemento de tus consultas guardadas?",
            help: "Filtra la lista y guárdala para usarla más tarde",
        },
        guesser: {
            empty: {
                title: "No hay datos que mostrar",
                message: "Revisa tu dataProvider",
            },
        },
        configurable: {
            customize: "Personalizar",
            configureMode: "Configurar esta página",
            inspector: {
                title: "Inspector",
                content: "Pasa el ratón por los elementos para configurarlos",
                reset: "Restablecer ajustes",
                hideAll: "Ocultar todo",
                showAll: "Mostrar todo",
            },
            Datagrid: {
                title: "Tabla",
                unlabeled: "Columna sin etiqueta #%{column}",
            },
            SimpleForm: {
                title: "Formulario",
                unlabeled: "Campo sin etiqueta #%{input}",
            },
            SimpleList: {
                title: "Lista",
                primaryText: "Texto primario",
                secondaryText: "Texto secundario",
                tertiaryText: "Texto terciario",
            },
        },
    },
};

export default raEs;
