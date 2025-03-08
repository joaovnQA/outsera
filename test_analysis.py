import os
import openai
import asyncio

# OpenAI Configuration
openai.api_key ="$$$"

# Directory containing test files
TESTS_FOLDER = "./joavn-api/src/test/integration/cypress/e2e/back/consulta-premios"

def get_test_files(folder_path):
    """Recupera todos os arquivos de teste do diretório especificado."""
    test_files = []
    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(('.js', '.ts', '.feature')):
                test_files.append(os.path.join(root, file))
    return test_files

def read_file_content(file_path):
    """Lê o conteúdo de um arquivo de teste."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

async def analyze_test_with_gpt35(test_content):
    """Envia o conteúdo do teste para o GPT-3.5 Turbo para análise e sugestões."""
    prompt = f"Analise os seguintes cenários de teste e forneça sugestões de melhorias ou casos de borda ausentes. Responda em português:\n{test_content}"
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Erro ao analisar o arquivo: {e}"

async def generate_analysis_report():
    """Gera um relatório de análise para todos os arquivos de teste no projeto."""
    test_files = get_test_files(TESTS_FOLDER)
    report = "Relatório de Análise de Testes\n\n"
    
    for file_path in test_files:
        print(f"Analisando: {file_path}")
        test_content = read_file_content(file_path)
        analysis = await analyze_test_with_gpt35(test_content)
        
        report += f"Arquivo: {file_path}\n"
        report += f"Sugestões:\n{analysis}\n"
        report += "-" * 50 + "\n"
    
    output_path = 'analysis/relatorio_analise_testes.txt'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as report_file:
        report_file.write(report)
    
    print(f"Análise concluída! Confira o relatório em '{output_path}'.")

if __name__ == "__main__":
    asyncio.run(generate_analysis_report())
