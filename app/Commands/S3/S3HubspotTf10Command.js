import {
    S3Client,
    CreateBucketCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";



export default {
    name: "integracao-s3-hubspot",
    description: "Consome a API do HubSpot e salva os JSONs das companies no AWS S3",

    arguments: {

    },

    handle: async function () {
        try {
            if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
                throw new Error("Credenciais AWS não encontradas nas variáveis de ambiente.");
            }

            const region = process.env.AWS_REGION || "sa-east-1";

            const s3Client = new S3Client({
                region: region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });


            /** TF 10 */
            const RA = "6324089";
            const bucketName = "unifaat-teste";

            console.log("Buscando companies na API do HubSpot...");

            // Fazer o GET na API do HubSpot
            const response = await axios.get("https://api.hubapi.com/companies/v2/companies/paged", {
                headers: {
                    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`
                }
            });

            const companies = response.data.companies;

            if (!companies || companies.length === 0) {
                console.log("Nenhuma company encontrada no HubSpot para exportar.");
                return;
            }

            console.log(`${companies.length} companies encontradas. Iniciando envio para o S3...`);

            // Iterar sobre os resultados e enviar para o S3
            for (const company of companies) {
                const companyId = company.companyId;
                const companyJson = JSON.stringify(company, null, 2);

                const params = {
                    Bucket: bucketName,
                    Key: `${RA}/${companyId}.json`, // Cria a pasta do RA automaticamente
                    Body: companyJson,
                    ContentType: "application/json"
                };

                const command = new PutObjectCommand(params);
                await s3Client.send(command);

                console.log(`Sucesso: Arquivo salvo em ${RA}/${companyId}.json`);
            }

            console.log("Integração concluída! Todos os arquivos foram enviados.");
        } catch (error) {
            console.error("Erro ao criar bucket ou inserir arquivo:", error);
        }
    },
};