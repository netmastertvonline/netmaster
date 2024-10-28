export type User = {
        id: string,
        name: string,
        email: string,
        phone: string,
        plan_value: string,
        plan_type: string,
        periodicity: string,
        contracting_plan: Date,
        expiration_plan: Date,
        screens: [
            {
                system_type: string,
                screen_name: string,
                painel: string,
                user_number: string,
                app_name: string,
                mac_address: string,
                app_key: string,
            }
        ],
        notes: string
}