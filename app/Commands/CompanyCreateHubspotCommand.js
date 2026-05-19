import axios from "axios";

export default {
    name: 'company-create',
    description: 'Create Company in Hubspot',
    arguments: {

    },

    handle: async function () {
        const hubspotToken = process.env.HUBSPOT_API_TOKEN;
        if (!hubspotToken) {
            console.error('HUBSPOT_API_TOKEN is not set in the environment variables.');
            return;
        }

        /** TF 09 */
        const url = `https://api.hubapi.com/crm/v3/objects/companies`;

        console.log(url);

        const companyData = {
            properties: {
                name: "SmartAgenda",
                address: "Avenida Tabelião Passarella, 456",
                city: "Mairiporã"
            }
        };

        try {
            // No axios.post, o segundo parâmetro é o corpo (body) e o terceiro são os headers
            const response = await axios.post(url, companyData, {
                headers: {
                    'Authorization': `Bearer ${hubspotToken}`,
                    'Content-Type': 'application/json'
                }
            });

            // O axios já converte o JSON automaticamente para response.data
            const data = response.data;

            console.log("Company criada com sucesso!");
            console.log(`ID: ${data.id} | Nome: ${data.properties.name}`);
            
        } catch (error) {
            // O axios manda os detalhes do erro para error.response.data
            console.error("Falha na requisição:", error.response ? error.response.data : error.message);
        }
    }
}