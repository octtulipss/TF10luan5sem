import axios from "axios";

export default {
    name: 'company-list',
    description: 'List Companies in Hubspot',
    arguments: {

    },

    handle: async function () {
        const hubspotToken = process.env.HUBSPOT_API_TOKEN;
        if (!hubspotToken) {
            console.error('HUBSPOT_API_TOKEN is not set in the environment variables.');
            return;
        }

        const query = {
            "properties": "name,address,city",
            "limit": 100
        }

        const queryString = new URLSearchParams(query).toString();

        // Corrigido o erro de digitação: conpanies -> companies
        const url = `https://api.hubapi.com/crm/v3/objects/companies?${queryString}`;

        console.log(url);

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${hubspotToken}`,
                    'Content-Type': 'application/json'
                }
            });

            // Capturando os dados convertidos do axios
            const data = response.data;

            console.log("Lista de Companies:");
            
            data.results.forEach(company => {
                console.log(`- Nome: ${company.properties.name} | Endereço: ${company.properties.address} | Cidade: ${company.properties.city}`);
            });

        } catch (error) {
            console.error("Falha na requisição:", error.response ? error.response.data : error.message);
        }
    }
}